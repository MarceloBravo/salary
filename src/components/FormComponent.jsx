import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { crear } from "../actions/nomina";

const FormComponent = ({setNuevo, isNuevo}) => {
  const { uid } = useSelector((store) => store.loginSlice);
  const [data, setData] = useState({valor: 0, horas: 0});
  const [isDisabled, setIsDisabled ] = useState(true);
  const dispatch = useDispatch();

  const handlerChange = (e) => {    
    setData({...data, [e.target.name]: e.target.value});
    const otherKey = Object.keys(data).filter(elem => elem !== e.target.name)
    const disabled =  e.target.value.trim() === '' || data[otherKey[0]] === '' || isNaN(e.target.value) || isNaN(data[otherKey[0]]) 
    setIsDisabled(disabled)
  };

  const handlerGrabar = (e) => {
    const fecha = new Date();    
    dispatch(crear(uid, { fecha, valor_hora: parseInt(data.valor), horas: parseFloat(data.horas) }));
    setNuevo(!isNuevo)
  };

  return (
    <div>
      <div className="row">
        <div className="input-field col s6">
          <input
            placeholder="Placeholder"
            id="first_name"
            type="text"
            className="validate"
            value={data.valor}
            onChange={handlerChange}
            name="valor"
          />
          <label htmlFor="first_name">Valor Hora $</label>
        </div>
        <div className="input-field col s6">
          <input
            id="last_name"
            type="text"
            className="validate"
            value={data.horas}
            onChange={handlerChange}
            name="horas"
          />
          <label htmlFor="last_name">Horas</label>
        </div>
      </div>
      <button onClick={handlerGrabar} className="btn btn-primary" type="button" disabled={isDisabled}>
        Guardar
      </button>
    </div>
  );
};

export default FormComponent;
