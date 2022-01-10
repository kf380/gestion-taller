
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {Modal, Button, TextField} from '@material-ui/core';
import MaterialTable from "@material-table/core";
import useStyles  from './useStyles';
import XLSX from 'xlsx';
import Box from '@mui/material/Box';
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';
const generateClassName = createGenerateClassName({
  productionPrefix: 'mt',
  seed: 'mt'
});

  const columns= [
    { title: 'Nombre', field: 'name' },
    { title: 'Email', field: 'email' },
    { title: 'DNI/CUIT', field: 'NIDentificador'},
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
        name:"",
        email:"",
        NIDentificador:"",
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
                proveedor.NIDentificador=proveedorSeleccioando.NIDentificador;
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
            <TextField className={styles.inputMaterial} label="Nombre" name="name" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Email" name="email" onChange={handleChange}/> 
            <TextField className={styles.inputMaterial} label="DNI/CUIT" name="NIDentificador" onChange={handleChange}/>
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
            <TextField className={styles.inputMaterial} label="Nombre" name="name" onChange={handleChange} value={proveedorSeleccioando && proveedorSeleccioando.name}  />
            <TextField className={styles.inputMaterial} label="Email" name="email" onChange={handleChange} value={proveedorSeleccioando && proveedorSeleccioando.email}/> 
            <TextField className={styles.inputMaterial} label="DNI/CUIT" name="NIDentificador" onChange={handleChange} value={proveedorSeleccioando&&proveedorSeleccioando.NIDentificador}/>
            <TextField className={styles.inputMaterial} label="Telefono" name="telephone" onChange={handleChange} value={proveedorSeleccioando && proveedorSeleccioando.telephone}/>
        <div align="center">
            <Button color="primary" onClick={()=>peticionesPut()}>Editar</Button>
            <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
        </div>

        </div>
        
    )

    const bodyEliminar=(
        <div className={styles.modal}>
            <p>Estas seguro que deseas eliminar el proveedor <b>{proveedorSeleccioando&&proveedorSeleccioando.name}</b> ? </p>
            <div align="right">
                <Button color="secondary" onClick={()=>peticionesDelete()}>SI</Button>
                <Button onClick={()=>abrirCerrarModalEliminar()}>NO</Button>

            </div>

        </div>
    )

    const dowloandExcel=()=>{
        const workSheet=XLSX.utils.json_to_sheet(data)
        const workBook=XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, workSheet,"cheque")
        
      
        
        XLSX.write(workBook,{bookType:"xlsx",type:"binary"})

        XLSX.writeFile(workBook, "ChequeData.xlsx")
      }
    return (
        <div>
                <StylesProvider generateClassName={generateClassName}>
                <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="20vh"
      backgroundColor="#000	"
    >
     
            <div align="center">
                <Button onClick={()=>abrirCerrarModalInsertar()} color="secondary" variant="contained">Agregar Proveedor</Button>
                </div>
  
    </Box>
            <MaterialTable
          columns={columns}
          data={data}
          title="Listado de Proveedores"  
          actions={[
            {
                icon:()=><Button color="primary" variant="contained">Exportar</Button>,
                tooltip:"Exportar a Excel",
                onClick:()=>dowloandExcel(),
                isFreeAction:true
              },
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
            rowStyle:(data,index)=>index%2===0?{background:"#f5f5f5"}:null,
            headerStyle:{background:"#708090"}
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