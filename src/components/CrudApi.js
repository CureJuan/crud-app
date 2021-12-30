import React, { useEffect, useReducer, useState } from 'react'
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';
import { crudReducer, crudInitialState} from '../reducers/crudReducer';
import { helpHttp } from '../helpers/helpHttp'
import Loader from './Loader';
import Message from './Message';
import { HashRouter, NavLink, Route, Switch } from 'react-router-dom';
import Error404 from '../pages/Error404';
import { TYPES } from '../actions/crudActions';

 const CrudApi = () => {
    //const [db, setDb] = useState(null);
    const [state, dispatch] = useReducer(crudReducer, crudInitialState);
    const { db } = state;
    const [dataToEdit, setDataToEdit] = useState(null);
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    let api = helpHttp();
    let url = "http://localhost:5000/santos";
 
    useEffect(() => {
        setLoading (true);
        helpHttp()
        .get(url).then((res) => {
    //   console.log(res);
    if (!res.err){
     //setDb(res);
     dispatch({ type: TYPES.READ_ALL_DATA, payload: res });
        setError(null);
    }else {
     //  setDb(null); 
     dispatch ({ type:TYPES.NO_DATA})
       setError(res);
    }
    setLoading (false);
  });
},[url]);

    const createData = (data) => {
        data.id = Date.now();

        let options =
         {body:
             data, headers: {"content-type": "application/json"}
         };    
        api.post(url, options).then((res) => {
        if(!res.err) {
       //setDb([...db, res]);
       dispatch({ type: TYPES.CREATE_DATA, payload: res})
        } else {
           setError(res);
        }       
        });
    };

    const updateData = (data) => {
        let endpoint = `${url}/${data.id}`
       
        let options =
        {body:
            data, headers: {"content-type": "application/json"}
        };    

       api.put(endpoint, options).then((res) => {
       if(!res.err) {
        // let newData = db.map((el) => (el.id === data.id ? data: el));
        // setDb(newData);
        dispatch ({ type: TYPES.UPDATE_DATA,payload:data})
       } else {
          setError(res);
       }       
       });
    }

    const deleteData = (id) => {
        let isDelete = window.confirm (
        `¿Estas seguro de elimina el registro con el id '${id}' ?`);
        
        if (isDelete){
            let endpoint = `${url}/${id}`;
            let options = {
                headers: {"content-type": "application/json"}
            };    
            api.del(endpoint, options).then(res =>{
                if(!res.err) {
                // let newData = db.filter(el => el.id !== id);
                //setDb(newData);
                dispatch ({ type: TYPES.DELETE_DATA, payload:id})
                 } else {
                    setError(res);
                 }       
            });
            return;
        }
    };

    return (
        <div>
            <HashRouter basename="santos">
            <header>
              <h2>The Cure</h2>
              <nav>
                <NavLink to="/" activeClassName="active">
                  Discografia  
                </NavLink>
                <br/>
                <NavLink to="/agregar" activeClassName="active">
                  Agregar 
                </NavLink>
              </nav>
              </header>
                <Switch>
                  <Route exact path="/">
                  <article className="grid-1-2">        
                   {loading && <Loader/> }
                   {error && <Message msg={`Error ${error.status}: ${error.statusText}`} bgColor="#dc3545"/>}
                   {db && <CrudTable
                    data={db} 
                    setDataToEdit={setDataToEdit}
                    deleteData={deleteData}
                    />}  
                  </article>
                 
                  </Route>
                  <Route exact path="/agregar">
                  <CrudForm
                   createData={createData}
                   updateData={updateData}
                   dataToEdit={dataToEdit} 
                   setDataToEdit={setDataToEdit}
                  />
                  </Route>
                  <Route exact path="/editar/:id">
                  <CrudForm
                   createData={createData}
                   updateData={updateData}
                   dataToEdit={dataToEdit} 
                   setDataToEdit={setDataToEdit}
                  />
                  </Route>
                  <Route path="*" children={<Error404/>}></Route>
                </Switch>
             </HashRouter>
        </div>
    );
};
export default CrudApi 