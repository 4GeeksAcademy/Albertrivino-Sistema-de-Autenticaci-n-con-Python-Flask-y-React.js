import React, { useContext, useEffect, useState } from 'react'
import imgLogin from "../../img/Logo2.png"
import { Context } from '../store/appContext'
import { Link, useNavigate } from 'react-router-dom'
import Private from './private'
const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navegate = useNavigate()
  const { store, actions } = useContext(Context)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (email != "" && password != "") {
      actions.login(email, password)
    }
    else { alert("El campo de Email y Password son necesarios") }
  }

  return (
    <div className="container text-warning" >
      <div className='col-md-6 col-lg-4 mx-auto d-block'>
        <div className="card pt-5 bg-transparent mx-auto" style={{ width: "18rem" }}>
          <img src={imgLogin} className="card-img-top" alt="..." />
          <div className="card-body">
            <h2 className="card-title pt-5">Login</h2>
            {store.auth == true ? (navegate("/private")) :

              (<form onSubmit={handleSubmit}>
                <div className="mb-3 pt-5">
                  <label for="exampleInputEmail1" className="form-label">Email address</label>
                  <input type="email" onChange={(e) => {
                    setEmail(e.target.value)
                  }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" onChange={(e) => {
                    setPassword(e.target.value)
                  }} className="form-control" id="exampleInputPassword1" />
                </div>
                <div className='d-grid gap-2 col-6 mx-auto'>
                  <button type="submit" className="btn btn-light">Log in</button>
                </div>
            
                <div className='d-grid gap-2 col-6 mx-auto pt-5'>
                  <h6>create a new account here</h6>
                  <Link to="/register">
                    <button type="button" className="btn btn-light">Register User</button>
                  </Link>
                </div>
              </form>
              )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

