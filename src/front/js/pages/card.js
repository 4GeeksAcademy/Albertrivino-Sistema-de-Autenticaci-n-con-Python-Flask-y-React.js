import React from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../store/appContext'
import { useContext } from 'react'

const Card = ({ name, uid, type }) => {
  const { store, actions } = useContext(Context);
  const baseURL = `https://starwars-visualguide.com/assets/img/${type}/${uid}.jpg`

  return (
    <div className='col-12 mb-4 card-container'>
      <div className="card bg-black text-warning text-center" style={{ width: "18rem", margin: "0 auto" }}>
           <h4 style={{ textAlign: 'center', margin: '10px 0', fontSize: '18px' }}>
          ESTAS EN UN SITIO PRIVADO, SAL DE AQUI O ESTARAS EN EL LADO OSCURO!!!
        </h4>
        <img 
          src={baseURL} 
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "https://starwars-visualguide.com/assets/img/characters/4.jpg";
          }} 
          className="card-img-top" 
          alt="Imagen Star Wars" 
          style={{ display: 'block', margin: '0 auto' }} 
        />
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
        
          <button type="button" className='btn-danger'>
            <i className="fa-solid fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
