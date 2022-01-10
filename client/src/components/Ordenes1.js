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
    { title: 'Cliente', field: 'client._id' },
    { title: 'Estados', field: 'status' },
    { title: 'Pago', field: 'state'},
    { title: 'Vehiculo', field: 'vehicle'},
    { title: 'Fecha', field: 'date'},
    { title: 'Total', field: 'total'},
    { title: 'Kilometros', field: 'kilometres'},
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

const baseUrl = "http://localhost:5001/order"
function Table1() {
    const styles=useStyles();
    const [data, setData] = useState([]);
    const[modalInsertar,setModalInsertar]=useState(false);
    const[modalEditar,setModalEditar]=useState(false);
    const[modalEliminar,setModalEliminar]=useState(false);
    const [orderSeleccionada,setOrdenSeleccionada]=useState({
        status:"",
        date:"",
        vehicle:"",
        state:"",
        kilometres:"",
        client:"",
        total:"",
    })
    const handleChange=e=>{
        const{name,value}=e.target;
        setOrdenSeleccionada(prevState=>({
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
        await axios.post(baseUrl, orderSeleccionada)
        .then(response =>{
            setData(data.concat(response.data));
            abrirCerrarModalInsertar();
        }).catch(error=>{
            console.log(error)
        })
    }

    const peticionesPut= async () =>{
        await axios.put(baseUrl+"/"+orderSeleccionada._id, orderSeleccionada)
        .then(response =>{
            var dataNueva=data;
            dataNueva.map(orden=>{
                if(orden.id===orderSeleccionada._id)
                orden.status=orderSeleccionada.status;
                orden.date=orderSeleccionada.date;
                orden.vehicle=orderSeleccionada.vehicle;
                orden.state=orderSeleccionada.state;
                orden.kilometres=orderSeleccionada.kilometres;
                orden.client=orderSeleccionada.client;
                orden.total=orderSeleccionada.total;
            })
            setData(dataNueva);
            abrirCerrarModalEditar();
        }).catch(error=>{
            console.log(error)
        })
    }
    const peticionesDelete= async () =>{
        await axios.delete(baseUrl+"/"+orderSeleccionada._id)
        .then(response =>{
            setData(data.filter(orden=>orden.id!==orderSeleccionada._id));
            abrirCerrarModalEliminar();
        }).catch(error=>{
            console.log(error);
        })
    }

    const seleccionarorden=(orden, caso)=>{
        setOrdenSeleccionada(orden);
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
            <TextField className={styles.inputMaterial} label="Estado" name="status" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Fecha" name="date" onChange={handleChange}/> 
            <TextField className={styles.inputMaterial} label="Vehiculo" name="vehicle" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Pago" name="state" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Kilometros" name="kilometres" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Cliente" name="client" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Total" name="total" onChange={handleChange}/>
        <div align="center">
            <Button color="primary" onClick={()=>peticionesPost()}>Insertar</Button>
            <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
        </div>

        </div>
    )
    const bodyEditar=(
   
       
        <div className={styles.modal}>
            <h3>Editar orden</h3>
            <TextField className={styles.inputMaterial}  label="Estado" name="status" onChange={handleChange} value={orderSeleccionada && orderSeleccionada.status}  />
            <TextField className={styles.inputMaterial} label="Fecha" name="date" onChange={handleChange} value={orderSeleccionada && orderSeleccionada.date}/> 
            <TextField className={styles.inputMaterial} label="Vehiculo" name="vehicle" onChange={handleChange} value={orderSeleccionada&&orderSeleccionada.vehicle}/>
            <TextField className={styles.inputMaterial}label="Pago" name="state" onChange={handleChange} value={orderSeleccionada&&orderSeleccionada.state}/>
            <TextField className={styles.inputMaterial} label="Kilometros" name="kilometres" onChange={handleChange}value={orderSeleccionada && orderSeleccionada.kilometres}/>
            <TextField className={styles.inputMaterial} label="Cliente" name="client" onChange={handleChange} value={orderSeleccionada && orderSeleccionada.client}/>
            <TextField className={styles.inputMaterial}  label="Total" name="total" onChange={handleChange} value={orderSeleccionada && orderSeleccionada.total}/>
        <div align="center">
            <Button color="primary" onClick={()=>peticionesPut()}>Editar</Button>
            <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
        </div>

        </div>
        
    )

    const bodyEliminar=(
        <div className={styles.modal}>
            <p>Estas seguro que deseas eliminar la orden <b>{orderSeleccionada&&orderSeleccionada.bank}</b> ? </p>
            <div align="right">
                <Button color="secondary" onClick={()=>peticionesDelete()}>SI</Button>
                <Button onClick={()=>abrirCerrarModalEliminar()}>NO</Button>

            </div>

        </div>
    )
    const dowloandExcel=()=>{
        const workSheet=XLSX.utils.json_to_sheet(data)
        const workBook=XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, workSheet,"ordenes")
        
      
        
        XLSX.write(workBook,{bookType:"xlsx",type:"binary"})

        XLSX.writeFile(workBook, "OrdenData.xlsx")
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
                <Button onClick={()=>abrirCerrarModalInsertar()} color="secondary" variant="contained">Agregar Orden</Button>
                </div>
  
    </Box>
            <MaterialTable
          columns={columns}
          data={data}
          title="Listado de ordenes"  
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