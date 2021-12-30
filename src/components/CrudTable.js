import React from 'react'
import  CrudTableRow  from './CrudTableRow';

 const CrudTable = ({data, setDataToEdit, deleteData}) => {
    return (
        <div>
           <h3>Discografia</h3> 
           <table>
               <thead>
                   <tr>
                       <th>Titulo</th>
                       <th>Año</th>
                       <th>Acciones</th>
                   </tr>
               </thead>
               <tbody>
                 {data.length > 0 ? (
                  data.map((el)=> (
                  <CrudTableRow
                    key={el.id}
                    el={el}
                    setDataToEdit={setDataToEdit}
                    deleteData={deleteData}
                  /> 
                  ))  
                ) : ( 
                  <tr>
                    <td colSpan="3">Sin datos</td>
                  </tr> 
                )}
               </tbody>
           </table>
        </div>
    );
};

export default CrudTable;