import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../actions/loginAction'

const RegisterScreen = () => {
  const [ data, setData ] = useState({email: '', userName: '', password: '', confirm_password: '' })
  const [ dataErrors, setDataErrors ] = useState({email: false, userName: false, password: false, confirm_password: false, password_distinct: false})
  const dispatch = useDispatch()


  const handlerChange = (e)=> {
    setData({...data, [e.target.name]: e.target.value})
    validaDatos( e.target.name, e.target.value)  //Valida los errores a medida que se teclea
  }

  const handlerSubmit = (e) => {
    e.preventDefault()
    
    const errors = Object.entries(data).map((item) => validaDatos(item[0], item[1]))  //Valida los errores al enviar los datos
    if(errors.filter(err => err === true).length > 0){
      console.log('datos inválidos', dataErrors, data)
    }else{
      console.log('datos OK', dataErrors, data)
      dispatch(register(data.email, data.password, data.userName))
    }
  }


  const validaDatos = (target, value) => {
    switch(target){
      case 'email':
        setDataErrors({...dataErrors, [target]: !validarEmail(value)})
        return !validarEmail(value)

      case 'userName':
        setDataErrors({...dataErrors, [target]: value.trim().length < 2})
        return value.trim().length < 2

      case 'password':
      case 'confirm_password':
        setDataErrors({...dataErrors, [target]: value.trim().length < 6})
        setDataErrors({...dataErrors, password_distinct: data.password !== data.confirm_password})
        return (value.trim().length < 6 || data.password !== data.confirm_password)

      default:
        setDataErrors({...dataErrors, [target]: false})
        return false
    }
  }

  const validarEmail = (email) => {
    var patron = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return patron.test(email);
  }
  

  return (
    <div className="container">
        <h2>Login</h2>
        <hr/>

        <div className="row container">
            <form className="col s12" onSubmit={handlerSubmit}>                
                <div className="row">
                    <div className="input-field col s12">
                        <i className="material-icons prefix">email</i>
                        <input 
                          id="email" 
                          name="email" 
                          type="email" 
                          autoComplete="off"
                          className="validate" 
                          value={data.email}
                          onChange={handlerChange}
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <label >Email no válido</label>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <i className="material-icons prefix">person</i>
                        <input 
                          id="nombre" 
                          name="userName" 
                          type="text" 
                          autoComplete="off"
                          className="validate" 
                          value={data.userName}
                          onChange={handlerChange}
                        />
                        <label htmlFor="userName">Nombre</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <i className="material-icons prefix">vpn_key</i>
                        <input 
                          id="password" 
                          name="password" 
                          type="password" 
                          autoComplete="off"
                          className="validate" 
                          value={data.password}
                          onChange={handlerChange}
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <i className="material-icons prefix">vpn_key</i>
                        <input 
                          id="confirm_password" 
                          name="confirm_password" 
                          type="password" 
                          autoComplete="off"
                          className="validate" 
                          value={data.confirm_password}
                          onChange={handlerChange}
                        />
                        <label htmlFor="confirm_password">Confirmar Password</label>
                    </div>
                </div>

                <div className="row">
                    <button className='btn waves-effect waves-light'>Enviar</button>
                </div>
                <hr/>
            </form>
            
            <div className="row google-button-container">
                <Link to="/login">Iniciar sessión</Link>
            </div>
        </div>

    </div>
  )
}

export default RegisterScreen