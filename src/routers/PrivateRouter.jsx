import React from 'react'
import { Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const PrivateRouter = ({element: Component, auth}) => {
  return (
    <>
      <Navbar/>
      {auth ? Component: <Navigate to="/login"/>}
    </>
  )
}

export default PrivateRouter