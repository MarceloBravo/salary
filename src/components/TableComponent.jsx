import React from "react";
import { formatCurrencyNumber } from "../helpers/format";
import { deleteItem } from "../actions/nomina";
import { useDispatch } from "react-redux";

const TableComponent = ({ data }) => {
  const dispatch = useDispatch()

    const handlerEliminar = (e) => {
      dispatch(deleteItem(e))
    }
    

  return (
    <table  className="striped highlight responsive-table">
      <thead>
        <tr>
          <th>Uid</th>
          <th>Fecha</th>
          <th>Valor hora</th>
          <th>horas</th>
          <th>Total</th>
          <th>Acción</th>
        </tr>
      </thead>

      <tbody>
        {data && data.map((elem, key) => 
        <tr key={key}>
          <td>{elem.id}</td>
          <td>{elem.fecha}</td>
          <td>{formatCurrencyNumber(elem.valor_hora)}</td>
          <td>{elem.horas}</td>
          <td>{formatCurrencyNumber(elem.valor_hora * elem.horas)}</td>
          <td>
            <button className="btn red" onClick={() => handlerEliminar(elem.id)}>Borrar</button>
          </td>
        </tr>
        )}
      </tbody>
    </table>
  );
};

export default TableComponent;
