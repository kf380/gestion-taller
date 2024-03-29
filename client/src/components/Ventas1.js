

import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {Modal, Button, TextField} from '@material-ui/core';
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
    { title: 'Fecha', field: 'date' },
    { title: 'Descripcion', field: 'description' },
    { title: 'Pago', field: 'status'},
    { title: 'Forma de Pago', field: 'formaPago'},
    { title: 'Bruto', field: 'bruto', type:"currency", currencySetting:{minimumFractionDigits:0}},
    { title: 'IVA', field: 'IVA'},
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

const baseUrl = "http://localhost:5001/sale"
function Table1() {
    const styles=useStyles();
    const [data, setData] = useState([]);
    const[modalInsertar,setModalInsertar]=useState(false);
    const[modalEditar,setModalEditar]=useState(false);
    const[modalEliminar,setModalEliminar]=useState(false);
    const [ventaSeleccionada,setVentaSeleccionada]=useState({
        date:"",
        status:"",
        description:"",
        formaPago:"",
        client:"",
        bruto:"",
        IVA:"",
        total:"",
    })
    const handleChange=e=>{
        const{name,value}=e.target;
        setVentaSeleccionada(prevState=>({
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
        await axios.post(baseUrl, ventaSeleccionada)
        .then(response =>{
            setData(data.concat(response.data));
            abrirCerrarModalInsertar();
        }).catch(error=>{
            console.log(error)
        })
    }

    const peticionesPut= async () =>{
        await axios.put(baseUrl+"/"+ventaSeleccionada._id, ventaSeleccionada)
        .then(response =>{
            var dataNueva=data;
            dataNueva.map(venta=>{
                if(venta.id===ventaSeleccionada._id)
                venta.date=ventaSeleccionada.date;
                venta.status=ventaSeleccionada.status;
                venta.description=ventaSeleccionada.description;
                venta.formaPago=ventaSeleccionada.formaPago;
                venta.client=ventaSeleccionada.client;
                venta.bruto=ventaSeleccionada.bruto;
                venta.IVA=ventaSeleccionada.IVA;
                venta.total=ventaSeleccionada.total;
            })
            setData(dataNueva);
            abrirCerrarModalEditar();
        }).catch(error=>{
            console.log(error)
        })
    }
    const peticionesDelete= async () =>{
        await axios.delete(baseUrl+"/"+ventaSeleccionada._id)
        .then(response =>{
            setData(data.filter(venta=>venta.id!==ventaSeleccionada._id));
            abrirCerrarModalEliminar();
        }).catch(error=>{
            console.log(error);
        })
    }

    const seleccionarventa=(venta, caso)=>{
        setVentaSeleccionada(venta);
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
            <h3>Agregar Nuevo venta</h3>
            <TextField className={styles.inputMaterial} label="Estado" name="status" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Fecha" name="date" onChange={handleChange}/> 
            <TextField className={styles.inputMaterial} label="Descripcion" name="desciption" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Forma de Pago" name="formaPago" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Cliente" name="client" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Bruto" name="bruto" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="IVA" name="IVA" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Total" name="total" onChange={handleChange}/>
        <div align="center">
            <Button color="primary" onClick={()=>peticionesPost()}>Insertar</Button>
            <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
        </div>

        </div>
    )
    const bodyEditar=(
   
       
        <div className={styles.modal}>
            <h3>Editar venta</h3>
            <TextField className={styles.inputMaterial}  label="Estado" name="status" onChange={handleChange} value={ventaSeleccionada && ventaSeleccionada.status}  />
            <TextField className={styles.inputMaterial} label="Fecha" name="date" onChange={handleChange} value={ventaSeleccionada && ventaSeleccionada.date}/> 
            <TextField className={styles.inputMaterial} label="Descricpion" name="vehicle" onChange={handleChange} value={ventaSeleccionada&&ventaSeleccionada.vehicle}/>
            <TextField className={styles.inputMaterial}label="Forma de Pago" name="formaPago" onChange={handleChange} value={ventaSeleccionada&&ventaSeleccionada.formaPago}/>
            <TextField className={styles.inputMaterial} label="Cliente" name="client" onChange={handleChange} value={ventaSeleccionada && ventaSeleccionada.client}/>
            <TextField className={styles.inputMaterial} label="bruto" name="bruto" onChange={handleChange}value={ventaSeleccionada && ventaSeleccionada.bruto}/>
            <TextField className={styles.inputMaterial}  label="IVA" name="IVA" onChange={handleChange} value={ventaSeleccionada && ventaSeleccionada.IVA}/>
            <TextField className={styles.inputMaterial}  label="Total" name="total" onChange={handleChange} value={ventaSeleccionada && ventaSeleccionada.total}/>
        <div align="center">
            <Button color="primary" onClick={()=>peticionesPut()}>Editar</Button>
            <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
        </div>

        </div>
        
    )

    const bodyEliminar=(
        <div className={styles.modal}>
            <p>Estas seguro que deseas eliminar la venta <b>{ventaSeleccionada&&ventaSeleccionada.bank}</b> ? </p>
            <div align="right">
                <Button color="secondary" onClick={()=>peticionesDelete()}>SI</Button>
                <Button onClick={()=>abrirCerrarModalEliminar()}>NO</Button>

            </div>

        </div>
    )
    const dowloandExcel=()=>{
        const workSheet=XLSX.utils.json_to_sheet(data)
        const workBook=XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, workSheet,"ventaes")
        
     
        XLSX.write(workBook,{bookType:"xlsx",type:"binary"})

        XLSX.writeFile(workBook, "ventaData.xlsx")
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
                <Button onClick={()=>abrirCerrarModalInsertar()} color="secondary" variant="contained">Agregar venta</Button>
                </div>
  
    </Box>
            <MaterialTable
          columns={columns}
          data={data}
          title="Listado de ventas"  
          actions={[
            {
                icon:()=><Button color="primary" variant="contained">Exportar</Button>,
                tooltip:"Exportar a Excel",
                onClick:()=>dowloandExcel(),
                isFreeAction:true
              },
            {
              icon: 'edit',
              tooltip: 'Editar venta',
              onClick: (event, rowData) => seleccionarventa(rowData, "Editar")
            },
            {
              icon: 'delete',
              tooltip: 'Eliminar venta',
              onClick: (event, rowData) => seleccionarventa(rowData, "Eliminar")
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