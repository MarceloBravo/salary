import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterScreen from '../pages/RegisterScreen'
import LoginScreen from '../pages/LoginScreen'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/config-firebase'
import { useDispatch } from 'react-redux'
import { setLogin } from '../redux/slices/loginSlice'
import PublicRouter from './PublicRouter'
import CalcSalaryScreen from '../pages/CalcSalaryScreen'
import PrivateRouter from './PrivateRouter'
import HomeScreen from '../pages/HomeScreen'

const AppRouter = () => {
  const [ isLogued , setIsLogued ] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) dispatch(setLogin({uid: user.uid, name: user.displayName, token: user.accessToken}))
        setIsLogued((user && user.uid) !== null)
      }
    )
  },[dispatch])

  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/register" element={<PublicRouter auth={(isLogued)} element={<RegisterScreen/>}/>}/>
            <Route exact path="/login" element={<PublicRouter auth={(isLogued)} element={<LoginScreen/>}/>}/>
            <Route exact path="/calcsalary" element={<PrivateRouter auth={(isLogued)} element={<CalcSalaryScreen/>}/>}/>
            <Route exact path="/home" element={<PrivateRouter auth={(isLogued)} element={<HomeScreen/>}/>}/>
            <Route exact path="*" element={<PublicRouter auth={(isLogued)} element={<LoginScreen/>}/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter