import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';

const initialForm = {
    name:"",
    constelation:"",
    id:null,
}

const CrudForm = ({createData, updateData, dataToEdit, setDataToEdit}) => {
     const [form, setForm] = useState (initialForm);
     let history = useHistory();

     useEffect(()=>{
        if(dataToEdit){
          setForm(dataToEdit);
        } else {
          setForm(initialForm);
        }
     },[dataToEdit])

 const handleChange = (e)=>{
   setForm({
       ...form,
       [e.target.name]:e.target.value,
   });
 };
 const handleSubmit = (e) =>{
     e.preventDefault();
 
     if(!form.name || !form.constelation){
         alert("Datos incompletos")
         return;
     }

     if(form.id === null){
       createData(form);
     } else {
       updateData(form);  
     }
      handleReset();
     }
 
 const handleReset = (e) =>{
     setForm(initialForm);
     setDataToEdit(null);
     history.push("/");
 } 
   return (
        <div>
            <h3>{dataToEdit ? "Editar" : "Agregar"}</h3>
            <form onSubmit={handleSubmit}> 
                <input type="text" name="name" placeholder="Titulo" onChange={handleChange} value={form.name}/>
                <input type="text" name="constelation" placeholder="Año" onChange={handleChange} value={form.constelation}/>
                <input className= "enviar" type="submit" value="Enviar"/>
                <input className= "limpiar" type="reset" value="Limpiar" onClick={handleReset}/>
            </form>
        </div>
    )
}

export default CrudForm;