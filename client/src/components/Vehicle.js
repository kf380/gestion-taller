import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Modal, Button, TextField} from '@material-ui/core';
import MaterialTable from "@material-table/core";
import {makeStyles} from '@material-ui/core/styles'
import XLSX from 'xlsx';
import Box from '@mui/material/Box';
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';
const generateClassName = createGenerateClassName({
  productionPrefix: 'mt',
  seed: 'mt'
});

  const columns= [
    { title: 'Dominio', field: 'domain' },
    { title: 'Marca', field: 'brand'},
    { title: 'Modelo', field: 'model'},
    { title: 'Tipo', field: 'type'},
    { title: 'Año', field: 'age'},
    { title: 'Kilometros', field: 'kilometers'},
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

const baseUrl = "http://localhost:5001/vehicle"
function Table1() {
    const styles=useStyles();
    const [data, setData] = useState([]);
    const[modalInsertar,setModalInsertar]=useState(false);
    const[modalEditar,setModalEditar]=useState(false);
    const[modalEliminar,setModalEliminar]=useState(false);
    const [vehiculoSeleccionado,setVehiculoSeleccionado]=useState({
        domain:"",
        brand:"",
        model:"",
        type:"",
        age:"",
        kilometers:"",
        
    })
    const handleChange=e=>{
        const{name,value}=e.target;
        setVehiculoSeleccionado(prevState=>({
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
        await axios.post(baseUrl, vehiculoSeleccionado)
        .then(response =>{
            setData(data.concat(response.data));
            abrirCerrarModalInsertar();
        }).catch(error=>{
            console.log(error)
        })
    }

    const peticionesPut= async () =>{
        await axios.put(baseUrl+"/"+vehiculoSeleccionado._id, vehiculoSeleccionado)
        .then(response =>{
            var dataNueva=data;
            dataNueva.map(orden=>{
                if(orden.id===vehiculoSeleccionado._id)
                orden.domain=vehiculoSeleccionado.domain;
                orden.brand=vehiculoSeleccionado.brand;
                orden.model=vehiculoSeleccionado.model;
                orden.age=vehiculoSeleccionado.age;
                orden.kilometers=vehiculoSeleccionado.kilometers;
                orden.type=vehiculoSeleccionado.type;
            })
            setData(dataNueva);
            abrirCerrarModalEditar();
        }).catch(error=>{
            console.log(error)
        })
    }
    const peticionesDelete= async () =>{
        await axios.delete(baseUrl+"/"+vehiculoSeleccionado._id)
        .then(response =>{
            setData(data.filter(orden=>orden.id!==vehiculoSeleccionado._id));
            abrirCerrarModalEliminar();
        }).catch(error=>{
            console.log(error);
        })
    }

    const seleccionarorden=(orden, caso)=>{
        setVehiculoSeleccionado(orden);
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
            <h3>Agregar Nuevo orden</h3>
            <TextField className={styles.inputMaterial} label="Dominio" name="domain" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Marca" name="brand" onChange={handleChange}/> 
            <TextField className={styles.inputMaterial} label="Modelo" name="model" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Año" name="age" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Kilometros" name="kilometers" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Tipo" name="type" onChange={handleChange}/>
        <div align="center">
            <Button color="primary" onClick={()=>peticionesPost()}>Insertar</Button>
            <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
        </div>

        </div>
    )
    const bodyEditar=(
   
       
        <div className={styles.modal}>
            <h3>Editar orden</h3>
            <TextField className={styles.inputMaterial}  label="Dominio" name="domain" onChange={handleChange} value={vehiculoSeleccionado && vehiculoSeleccionado.domain}  />
            <TextField className={styles.inputMaterial} label=" Marca" name="brand" onChange={handleChange} value={vehiculoSeleccionado && vehiculoSeleccionado.brand}/> 
            <TextField className={styles.inputMaterial} label="Modelo" name="model" onChange={handleChange} value={vehiculoSeleccionado&&vehiculoSeleccionado.model}/>
            <TextField className={styles.inputMaterial}label="Año" name="age" onChange={handleChange} value={vehiculoSeleccionado&&vehiculoSeleccionado.age}/>
            <TextField className={styles.inputMaterial} label="Kilometros" name="kilometers" onChange={handleChange}value={vehiculoSeleccionado && vehiculoSeleccionado.kilometers}/>
            <TextField className={styles.inputMaterial} label="Tipo" name="type" onChange={handleChange} value={vehiculoSeleccionado && vehiculoSeleccionado.type}/>
        <div align="center">
            <Button color="primary" onClick={()=>peticionesPut()}>Editar</Button>
            <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
        </div>

        </div>
        
    )

    const bodyEliminar=(
        <div className={styles.modal}>
            <p>Estas seguro que deseas eliminar el vehiculo con dominio <b>{vehiculoSeleccionado&&vehiculoSeleccionado.domain}</b> ? </p>
            <div align="right">
                <Button color="secondary" onClick={()=>peticionesDelete()}>SI</Button>
                <Button onClick={()=>abrirCerrarModalEliminar()}>NO</Button>

            </div>

        </div>
    )
    const dowloandExcel=()=>{
        const workSheet=XLSX.utils.json_to_sheet(data)
        const workBook=XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, workSheet,"Vehiculos")
        
      
        
        XLSX.write(workBook,{bookType:"xlsx",type:"binary"})

        XLSX.writeFile(workBook, "vehiculoData.xlsx")
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
                <Button onClick={()=>abrirCerrarModalInsertar()} color="secondary" variant="contained">Agregar vehiculo</Button>
                </div>
  
    </Box>
            <MaterialTable
          columns={columns}
          data={data}
          title="Listado de vehiculos"  
          actions={[
            {
                icon:()=><Button color="primary" variant="contained">Exportar</Button>,
                tooltip:"Exportar a Excel",
                onClick:()=>dowloandExcel(),
                isFreeAction:true
              },
            {
              icon: 'edit',
              tooltip: 'Editar orden',
              onClick: (event, rowData) => seleccionarorden(rowData, "Editar")
            },
            {
              icon: 'delete',
              tooltip: 'Eliminar orden',
              onClick: (event, rowData) => seleccionarorden(rowData, "Eliminar")
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