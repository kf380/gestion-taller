import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {Modal, Button, TextField} from '@material-ui/core';
import XLSX from 'xlsx';
import Box from '@mui/material/Box';
import MaterialTable from "@material-table/core";
import {makeStyles} from '@material-ui/core/styles'

import { StylesProvider, createGenerateClassName } from '@material-ui/styles';
const generateClassName = createGenerateClassName({
  productionPrefix: 'mt',
  seed: 'mt'
});

  const columns= [
    { title: 'Nº de Presupuesto', field: '_id' },
    { title: 'Fecha', field: 'date' },
    { title: 'Cliente', field: 'client' },
    { title: 'Vehiculo', field: 'vehicle' },
    { title: 'Total', field: 'total', type:"currency", currencySetting:{minimumFractionDigits:0}},
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

const baseUrl = "http://localhost:5001/budget"
function Table1() {
    const styles=useStyles();
    const [data, setData] = useState([]);
    const[modalInsertar,setModalInsertar]=useState(false);
    const[modalEditar,setModalEditar]=useState(false);
    const[modalEliminar,setModalEliminar]=useState(false);
    const [presupuestoSeleccionado,setPresupuestoSeleccionado]=useState({
        date:"",
        client:"",
        vehicle:"",
        total:"",
    })
    const handleChange=e=>{
        const{name,value}=e.target;
        setPresupuestoSeleccionado(prevState=>({
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
        await axios.post(baseUrl, presupuestoSeleccionado)
        .then(response =>{
            setData(data.concat(response.data));
            abrirCerrarModalInsertar();
        }).catch(error=>{
            console.log(error)
        })
    }

    const peticionesPut= async () =>{
        await axios.put(baseUrl+"/"+presupuestoSeleccionado._id, presupuestoSeleccionado)
        .then(response =>{
            var dataNueva=data;
            dataNueva.map(presupuesto=>{
                if(presupuesto.id===presupuestoSeleccionado._id)
                presupuesto.cliente=presupuestoSeleccionado.cliente;
                presupuesto.date=presupuestoSeleccionado.date;
                presupuesto.vehicle=presupuestoSeleccionado.vehicle;
                presupuesto.total=presupuestoSeleccionado.total;
            })
            setData(dataNueva);
            abrirCerrarModalEditar();
        }).catch(error=>{
            console.log(error)
        })
    }
    const peticionesDelete= async () =>{
        await axios.delete(baseUrl+"/"+presupuestoSeleccionado._id)
        .then(response =>{
            setData(data.filter(presupuesto=>presupuesto.id!==presupuestoSeleccionado._id));
            abrirCerrarModalEliminar();
        }).catch(error=>{
            console.log(error);
        })
    }

    const seleccionarPresupuesto=(presupuesto, caso)=>{
        setPresupuestoSeleccionado(presupuesto);
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
            <h3>Agregar Nuevo presupuesto</h3>
            <TextField className={styles.inputMaterial} label="Cliente" name="client" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Fecha" name="date" onChange={handleChange}/> 
            <TextField className={styles.inputMaterial} label="Vehiculo" name="vehicle" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Total" name="total" onChange={handleChange}/>
        <div align="center">
            <Button color="primary" onClick={()=>peticionesPost()}>Insertar</Button>
            <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
        </div>

        </div>
    )
    const bodyEditar=(
   
       
        <div className={styles.modal}>
            <h3>Editar presupuesto</h3>
            <TextField className={styles.inputMaterial} label="Cliente" name="client" onChange={handleChange} value={presupuestoSeleccionado && presupuestoSeleccionado.client}  />
            <TextField className={styles.inputMaterial} label="Fecha" name="date" onChange={handleChange} value={presupuestoSeleccionado && presupuestoSeleccionado.dateinitial}/> 
            <TextField className={styles.inputMaterial} label="Vehiculo" name="vehicle"onChange={handleChange} value={presupuestoSeleccionado&&presupuestoSeleccionado.datepayment}/>
            <TextField className={styles.inputMaterial} label="Total" name="total" onChange={handleChange} value={presupuestoSeleccionado && presupuestoSeleccionado.amount}/>
        <div align="center">
            <Button color="primary" onClick={()=>peticionesPut()}>Editar</Button>
            <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
        </div>

        </div>
        
    )

    const bodyEliminar=(
        <div className={styles.modal}>
            <p>Estas seguro que deseas eliminar el presupuesto <b>{presupuestoSeleccionado&&presupuestoSeleccionado.bank}</b> ? </p>
            <div align="right">
                <Button color="secondary" onClick={()=>peticionesDelete()}>SI</Button>
                <Button onClick={()=>abrirCerrarModalEliminar()}>NO</Button>

            </div>

        </div>
    )
      const dowloandExcel=()=>{
        const workSheet=XLSX.utils.json_to_sheet(data)
        const workBook=XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, workSheet,"presupuesto")
        
      
        
        XLSX.write(workBook,{bookType:"xlsx",type:"binary"})

        XLSX.writeFile(workBook, "presupuestoData.xlsx")
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
                <Button onClick={()=>abrirCerrarModalInsertar()} color="secondary" variant="contained">Agregar presupuesto</Button>
                </div>
  
    </Box>
    
     
            <MaterialTable
          columns={columns}
          data={data}
          title="Listado de presupuestos"  
          actions={[
            {
              icon:()=><Button color="primary" variant="contained">Exportar</Button>,
              tooltip:"Exportar a Excel",
              onClick:()=>dowloandExcel(),
              isFreeAction:true
            },
            {
              icon: 'edit',
              tooltip: 'Editar presupuesto',
              onClick: (event, rowData) => seleccionarPresupuesto(rowData, "Editar")
            },
            {
              icon: 'delete',
              tooltip: 'Eliminar presupuesto',
              onClick: (event, rowData) => seleccionarPresupuesto(rowData, "Eliminar")
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