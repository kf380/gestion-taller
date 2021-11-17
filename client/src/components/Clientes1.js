import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Modal, Button, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import MaterialTable, { Column } from "@material-table/core";
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';

const generateClassName = createGenerateClassName({
    productionPrefix: 'mt',
    seed: 'mt'
  });
  
    const columns= [
      { title: 'Nombre', field: 'name' },
      { title: 'Email', field: 'email' },
      { title: 'DNI', field: 'DNI' },
      { title: 'CUIT', field: 'CUIT'},
      { title: 'Telefono', field: 'telephone'}
    ];

const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'relative',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    iconos:{
      cursor: 'pointer'
    },
    inputMaterial:{
        width: '100%'
      }
  }));

const baseUrl = "http://localhost:5001/client"
function Table1() {
    const styles=useStyles();
    const [data, setData] = useState([]);
    const[modalInsertar,setModalInsertar]=useState(false);
    const[modalEditar,setModalEditar]=useState(false);
    const[modalEliminar,setModalEliminar]=useState(false);
    const [clienteSeleccionado,setClienteSeleccionado]=useState({
        name:"",
        email:"",
        DNI:"",
        CUIT:"",
        telephone:""
    })
    const handleChange=e=>{
        const{name,value}=e.target;
        setClienteSeleccionado(prevState=>({
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
        await axios.post(baseUrl, clienteSeleccionado)
        .then(response =>{
            setData(data.concat(response.data));
            abrirCerrarModalInsertar();
        }).catch(error=>{
            console.log(error)
        })
    }

    const peticionesPut= async () =>{
        await axios.put(baseUrl+"/"+clienteSeleccionado._id, clienteSeleccionado)
        .then(response =>{
            var dataNueva=data;
            dataNueva.map(cliente=>{
                if(cliente.id===clienteSeleccionado._id)
                cliente.name=clienteSeleccionado.name;
                cliente.email=clienteSeleccionado.email;
                cliente.DNI=clienteSeleccionado.DNI;
                cliente.CUIT=clienteSeleccionado.CUIT;
                cliente.telephone=clienteSeleccionado.telephone;
            })
            setData(dataNueva);
            abrirCerrarModalEditar();
        }).catch(error=>{
            console.log(error)
        })
    }
    const peticionesDelete= async () =>{
        await axios.delete(baseUrl+"/"+clienteSeleccionado._id)
        .then(response =>{
            setData(data.filter(cliente=>cliente.id!==clienteSeleccionado._id));
            abrirCerrarModalEliminar();
        }).catch(error=>{
            console.log(error);
        })
    }

    const seleccionarcliente=(cliente, caso)=>{
        setClienteSeleccionado(cliente);
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
            <h3>Agregar Nuevo cliente</h3>
            <TextField className={styles.inputMaterial} label="Nombre" name="name" onChange={handleChange}/>
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
            <h3>Editar cliente</h3>
            <TextField className={styles.inputMaterial} label="Nombre" name="name" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.name}  />
            <TextField className={styles.inputMaterial} label="Email" name="email" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.email}/> 
            <TextField className={styles.inputMaterial} label="DNI" name="DNI" onChange={handleChange} value={clienteSeleccionado&&clienteSeleccionado.DNI}/>
            <TextField className={styles.inputMaterial} label="CUIT" name="CUIT" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.CUIT}/>
            <TextField className={styles.inputMaterial} label="Telefono" name="telephone" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.telephone}/>
        <div align="center">
            <Button color="primary" onClick={()=>peticionesPut()}>Editar</Button>
            <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
        </div>

        </div>
        
    )

    const bodyEliminar=(
        <div className={styles.modal}>
            <p>Estas seguro que deseas eliminar el cliente <b>{clienteSeleccionado&&clienteSeleccionado.bank}</b> ? </p>
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
              <Button onClick={()=>abrirCerrarModalInsertar()} color="secondary" variant="contained">Insertar cliente</Button>
              </div>
          <MaterialTable
          columns={columns}
          data={data}
          title="Listado de Clientes"  
          actions={[
            {
              icon: 'edit',
              tooltip: 'Editar Cliente',
              onClick: (event, rowData) => seleccionarcliente(rowData, "Editar")
            },
            {
              icon: 'delete',
              tooltip: 'Eliminar Cliente',
              onClick: (event, rowData) => seleccionarcliente(rowData, "Eliminar")
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