import React from 'react'
import { useHistory } from 'react-router';

const CrudTableRow = ({el, setDataToEdit, deleteData}) => {
    let { name, constelation, id } = el;
    let history = useHistory();

    const handleEdit = () =>{
        setDataToEdit(el);
        history.push(`/editar/${id}`)
    }
    return (
        <tr>
            <td>{name}</td>
            <td>{constelation}</td>
            <td>
              <button className="editar" onClick={handleEdit}>Editar</button>
              <button className="eliminar" onClick={() => deleteData(id)}>Elimina</button>
            </td>
        </tr>
    );
};

export default CrudTableRow;