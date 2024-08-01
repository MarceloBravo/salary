import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FormComponent from '../components/FormComponent';
import { getDataByUid } from '../actions/nomina';
import TableComponent from '../components/TableComponent';

const HomeScreen = () => {
  const [ nuevo, setNuevo ] = useState(false)
  const { uid, name } = useSelector((store) => store.loginSlice);
  const { list } = useSelector((store) => store.nominaSlices);
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getDataByUid(uid))
  },[uid, dispatch])

  const handlerAgregar = (e) => {
    setNuevo(!nuevo)
  }
  
  return (
    <>
      <div className="container">
        <h1>Hola {name}</h1>
        <hr/>
        <button className="btn btn-button" type="button" onClick={handlerAgregar}>{nuevo ? 'Cerrar' : 'Agregar'}</button>
        {nuevo && <FormComponent setNuevo={setNuevo} isNuevo={nuevo}/>}
        <TableComponent data={list}/>
      </div>
    </>
  )
}

export default HomeScreen