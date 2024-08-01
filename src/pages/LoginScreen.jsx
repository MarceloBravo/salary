import React, { useState } from 'react'
import GoogleButton from 'react-google-button'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { validarEmail } from '../helpers/validaciones'

import { login, loginGoogle } from '../actions/loginAction'

import '../styles/loginScreen.scss'


const LoginScreen = () => {
    const [ data, setData ] = useState({email: '', password: ''})
    const [ dataError, setDataError ] = useState({email: true, password: true})
    const dispatch = useDispatch()

    const handlerGoogle = () => {
        dispatch(loginGoogle())
    }

    const handlerChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
        setErrors(e.target.name, e.target.value)
    }

    const handlerBlur = (e) => {
        setErrors(e.target.name, e.target.value)
    }

    const handlerLogin = () => {
        try{
        
            const err = Object.entries(data).map(e => {
                return {[e[0]] : validaDatos(e[0], e[1])}
            } ).filter(e => e.value === true)
            if(err.length === 0){
                dispatch(login(data.email, data.password))
            }else{
                updateErrors(err)
            }
        }catch(err){
            console.log(err)
        }
    }


    const updateErrors = (arrErrors) => {
        arrErrors.map(e => 
            setErrors(e.name, e.value)
        )
    }

    const setErrors = (target, value) => {
        setDataError({...dataError, [target]: validaDatos(target, value)})
    }

    const validaDatos = (target, value) => {
        switch(target){
            case 'email':
                return !validarEmail(value)
            case 'password':
                return value.trim().length < 6
            default:
                return false
        }
    }


  return (
    <div className="container">
        <h2>Login</h2>
        <hr/>

        <div className="row container">
            <form className="col s12">                
                <div className="row">
                    <div className="input-field col s12">
                        <i className="material-icons prefix">email</i>
                        <input 
                            id="email" 
                            type="email" 
                            name="email" 
                            className="validate" 
                            onChange={handlerChange}
                            value={data.email}
                            onBlur={handlerBlur}
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <i className="material-icons prefix">vpn_key</i>
                        <input 
                            id="password" 
                            type="password" 
                            name="password" 
                            className="validate" 
                            onChange={handlerChange}
                            value={data.password}
                            onBlur={handlerBlur}
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                </div>
                <div className="row">
                    <button type="button" className='btn waves-effect waves-light'  onClick={handlerLogin}>Enviar</button>
                </div>
                <hr/>
            </form>
            
            <div className="row google-button-container">
                <GoogleButton onClick={handlerGoogle}/>
                <Link to="/register">Registrarme</Link>
            </div>
        </div>

    </div>
  )
}

export default LoginScreen