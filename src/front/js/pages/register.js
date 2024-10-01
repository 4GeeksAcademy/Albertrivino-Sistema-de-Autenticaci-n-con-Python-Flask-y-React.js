import React, {useContext, useEffect, useState} from 'react'
import imgLogin from "../../img/Logo2.png"
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom'


const Register = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    const handleSubmit_register =(e)=>{
      e.preventDefault() 
      if (email != "" && password != "") {
        actions.register(email,password)
       navigate("/") 
       }
      else{alert("El campo de Email y Password son necesarios")}
      }





    return (

        <div className="container text-warning" >
            <div className='col-md-6 col-lg-4 mx-auto d-block'>
                <div className="card pt-5 bg-transparent mx-auto" style={{ width: "18rem" }}>
                    <img src={imgLogin} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h2 className="card-title pt-5">Create a new user</h2>
                        <form onSubmit={handleSubmit_register}>
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
                                <button type="submit" className="btn btn-light">Create user</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Register