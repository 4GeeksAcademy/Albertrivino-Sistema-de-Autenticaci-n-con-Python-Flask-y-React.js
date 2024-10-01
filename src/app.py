"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
CORS(app)
app.url_map.strict_slashes = False

#setup de JWT
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_KEY")
JWTManager (app)

#setup Bcrypt
bcrypt = Bcrypt(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


@app.route('/api/register', methods=['POST'])
def register():
    body = request.get_json(silent=True)
    #revisar sin el usuario envio body y los campos email y password
    if body is None:
        return jsonify({'msg': 'Debes enviar informacion en el body'}),400
    if 'email' not in body:
        return jsonify({'msg': 'El campo Email es requerido'}),400
    if 'password' not in body:
        return jsonify({'msg': 'El campo password es requerido'}),400
    #obtenemos el registro del usuario segun el email que envio el usuario
    user = User.query.filter_by(email=body['email']).first()
    pw_hash = bcrypt.generate_password_hash(body['password']).decode('utf-8')
    new_user = User()
    new_user.email = body ['email']
    new_user.password = pw_hash
    new_user.is_active = True
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'msg': 'Nuevo usuario creado'})



@app.route('/api/login', methods=['POST'])
def login():
    body = request.get_json(silent=True)
    #revisar sin el usuario envio body y los campos email y password
    if body is None:
        return jsonify({'msg': 'Debes enviar informacion en el body'}),400
    if 'email' not in body:
        return jsonify({'msg': 'El campo Email es requerido'}),400
    if 'password' not in body:
        return jsonify({'msg': 'El campo password es requerido'}),400
    #obtenemos el registro del usuario segun el email que envio el usuario
    user = User.query.filter_by(email=body['email']).first()
    #msg de error si existe el usuario
    if user is None:
        return jsonify({'msg':'Usuario o contraseña invalido'}),400
    #si existe el usuario comparar contraseña de la DB
    #con la contraseña que envio el usuario
    #si no coninciden se devuelve error
    password_in_db = user.password
    password_is_true = bcrypt.check_password_hash(password_in_db, body['password'])
    if password_is_true is False:
        return jsonify({'msg':'Usuario o contraseña invalido'}),400
      #si todo paso bien msg ok
    access_token = create_access_token(identity=user.email)
    return jsonify({'msg': 'ok',
                    'jwt-token':access_token})

@app.route('/private', methods=['GET'])
@jwt_required()
def get_private_info():
    current_user = get_jwt_identity()
    user = User.query.get(current_user)
    return jsonify({'msg': 'Informacion para usuario que inicio sesion'})
    






# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
