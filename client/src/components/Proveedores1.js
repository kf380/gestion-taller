
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
import MaterialTable, { Column } from "@material-table/core";
import {makeStyles} from '@material-ui/core/styles'
import useStyles  from './useStyles';
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';
const generateClassName = createGenerateClassName({
  productionPrefix: 'mt',
  seed: 'mt'
});

  const columns= [
    { title: 'ID', field: '_id' },
    { title: 'Nombre', field: 'name' },
    { title: 'Email', field: 'email' },
    { title: 'DNI', field: 'DNI'},
    { title: 'CUIT', field: 'CUIT'},
    { title: 'Telefono', field: 'telephone'}
  ];


const baseUrl = "http://localhost:5001/supplier"
function Table1() {
    const styles=useStyles();
    const [data, setData] = useState([]);
    const[modalInsertar,setModalInsertar]=useState(false);
    const[modalEditar,setModalEditar]=useState(false);
    const[modalEliminar,setModalEliminar]=useState(false);
    const [proveedorSeleccioando,setProveedorSeleccionado]=useState({
        ID:"",
        name:"",
        email:"",
        DNI:"",
        CUIT:"",
        telephone:""
    })
    const handleChange=e=>{
        const{name,value}=e.target;
        setProveedorSeleccionado(prevState=>({
            ...prevState,
            [name]:value
        }));
    }



    const peticionesGet = async () =>{
        await axios.get(baseUrl)
        .then(response =>{
            setData(response.data)
         }).catch(error=>{
            console.log(error)
        })
    }

    const peticionesPost= async () =>{
        await axios.post(baseUrl, proveedorSeleccioando)
        .then(response =>{
            setData(data.concat(response.data));
            abrirCerrarModalInsertar();
        }).catch(error=>{
            console.log(error)
        })
    }

    const peticionesPut= async () =>{
        await axios.put(baseUrl+"/"+proveedorSeleccioando._id, proveedorSeleccioando)
        .then(response =>{
            var dataNueva=data;
            dataNueva.map(proveedor=>{
                if(proveedor.id===proveedorSeleccioando._id)
                proveedor.name=proveedorSeleccioando.name;
                proveedor.email=proveedorSeleccioando.email;
                proveedor.DNI=proveedorSeleccioando.DNI;
                proveedor.CUIT=proveedorSeleccioando.CUIT;
                proveedor.telephone=proveedorSeleccioando.telephone;
            })
            setData(dataNueva);
            abrirCerrarModalEditar();
        }).catch(error=>{
            console.log(error)
        })
    }
    const peticionesDelete= async () =>{
        await axios.delete(baseUrl+"/"+proveedorSeleccioando._id)
        .then(response =>{
            setData(data.filter(proveedor=>proveedor.id!==proveedorSeleccioando._id));
            abrirCerrarModalEliminar();
        }).catch(error=>{
            console.log(error);
        })
    }

    const seleccionarProveedor=(proveedor, caso)=>{
        setProveedorSeleccionado(proveedor);
        (caso==="Editar")?abrirCerrarModalEditar()
        :
        abrirCerrarModalEliminar()
    }

    const abrirCerrarModalInsertar=()=>{
        setModalInsertar(!modalInsertar);
    }
    const abrirCerrarModalEditar=()=>{
        setModalEditar(!modalEditar);
    }
    const abrirCerrarModalEliminar=()=>{
        setModalEliminar(!modalEliminar);
    }

    

    useEffect(()=>{
        peticionesGet();
    },)


    const bodyInsertar=(
        <div className={styles.modal}>
            <h3>Agregar Nuevo proveedor</h3>
            <TextField className={styles.inputMaterial} label="Name" name="name" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Email" name="email" onChange={handleChange}/> 
            <TextField className={styles.inputMaterial} label="DNI" name="DNI" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="CUIT" name="CUIT" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Telefono" name="telephone" onChange={handleChange}/>
        <div align="center">
            <Button color="primary" onClick={()=>peticionesPost()}>Insertar</Button>
            <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
        </div>

        </div>
    )
    const bodyEditar=(
   
       
        <div className={styles.modal}>
            <h3>Editar proveedor</h3>
            <TextField className={styles.inputMaterial} label="Name" name="name" onChange={handleChange} value={proveedorSeleccioando && proveedorSeleccioando.name}  />
            <TextField className={styles.inputMaterial} label="Email" name="email" onChange={handleChange} value={proveedorSeleccioando && proveedorSeleccioando.email}/> 
            <TextField className={styles.inputMaterial} label="DNI" name="DNI" onChange={handleChange} value={proveedorSeleccioando&&proveedorSeleccioando.DNI}/>
            <TextField className={styles.inputMaterial} label="CUIT" name="CUIT" onChange={handleChange} value={proveedorSeleccioando && proveedorSeleccioando.CUIT}/>
            <TextField className={styles.inputMaterial} label="Telefono" name="telephone" onChange={handleChange} value={proveedorSeleccioando && proveedorSeleccioando.telephone}/>
        <div align="center">
            <Button color="primary" onClick={()=>peticionesPut()}>Editar</Button>
            <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
        </div>

        </div>
        
    )

    const bodyEliminar=(
        <div className={styles.modal}>
            <p>Estas seguro que deseas eliminar el cheque <b>{proveedorSeleccioando&&proveedorSeleccioando.bank}</b> ? </p>
            <div align="right">
                <Button color="secondary" onClick={()=>peticionesDelete()}>SI</Button>
                <Button onClick={()=>abrirCerrarModalEliminar()}>NO</Button>

            </div>

        </div>
    )

    return (
        <div>
                <StylesProvider generateClassName={generateClassName}>
            <div align="center">
                <Button onClick={()=>abrirCerrarModalInsertar()} color="secondary" variant="contained">Insertar Proveedor</Button>
                </div>
            <MaterialTable
          columns={columns}
          data={data}
          title="Listado de Proveedores"  
          actions={[
            {
              icon: 'edit',
              tooltip: 'Editar Proveedor',
              onClick: (event, rowData) => seleccionarProveedor(rowData, "Editar")
            },
            {
              icon: 'delete',
              tooltip: 'Eliminar Proveedor',
              onClick: (event, rowData) => seleccionarProveedor(rowData, "Eliminar")
            }
          ]}
          options={{
            actionsColumnIndex: -1,
          }}
          localization={{
            header:{
              actions: "Acciones"
            }
          }}
        />
         </StylesProvider>
    

            <Modal
            open={modalInsertar}
            onClose={abrirCerrarModalInsertar}>
                {bodyInsertar}

            </Modal>

            <Modal
            open={modalEditar}
            onClose={abrirCerrarModalEditar}>
                {bodyEditar}
            </Modal>
            <Modal
            open={modalEliminar}
            onClose={abrirCerrarModalEliminar}>
                {bodyEliminar}

            </Modal>
        </div>
    )
}
export default Table1;