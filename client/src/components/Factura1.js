// import React , { useEffect, useState }   from 'react';
// import { useSelector, useDispatch} from 'react-redux';
// import Link from '@mui/material/Link';
// import {getBill} from "../Redux/actions/actions";
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Title from './Title';

// // Generate Order Data


// function preventDefault(event) {
//   event.preventDefault();
// }

// export default function Factura() {
//   const dispatch =useDispatch()
//   const [select, setSelect] = useState('');
//   const [bills,setBills] = useState([])

//   useEffect(()=>{
//   dispatch(getBill())
// },[dispatch])

//   useEffect(()=>{
//     if(select === '...'){
//       return setBills([])
//     }
//     const billFilter = getAll.filter(bil => bil.status === select);
//     setBills(billFilter)
//   },[select])

//   const getAll = useSelector((state)=> state.allBills);

//   console.log(getAll,"pruebaaaa")

//   return (
//     <React.Fragment>
//       <Table size="small">
//         <TableHead>
//           <TableRow>
//             <TableCell>Cliente</TableCell>
//             <TableCell>Fecha</TableCell>
//             <TableCell>Descripcion</TableCell>
//             <TableCell>Estado</TableCell>
//             <TableCell>Forma de Pago</TableCell>
//             <TableCell>Bruto</TableCell>
//             <TableCell>IVA</TableCell>
//             <TableCell>Total</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//         {getAll.map((bills)=>(
//              <TableRow key={bills.id}>
//              <TableCell>{bills.client}</TableCell>
//              <TableCell>{bills.date}</TableCell>
//              <TableCell>{bills.description}</TableCell>
//              <TableCell>{bills.status}</TableCell>
//              <TableCell>{bills.formaPago}</TableCell>
//              <TableCell>{bills.bruto}</TableCell>
//              <TableCell>{bills.IVA}</TableCell>
//              <TableCell>{bills.total}</TableCell>

//            </TableRow>
//           ))}
//         </TableBody>
//       </Table>
     
//     </React.Fragment>
//   );
// }

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
      { title: 'Cliente', field: 'client' },
      { title: 'Fecha', field: 'date' },
      { title: 'Descripcion', field: 'description' },
      { title: 'Estado', field: 'status'},
      { title: 'Forma de Pago', field: 'formaPago'},
      { title: 'Bruto', field: 'bruto'},
      { title: 'IVA', field: 'IVA'},
      { title: 'Total', field: 'total'},
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

const baseUrl = "http://localhost:5001/bill"
function Table1() {
    const styles=useStyles();
    const [data, setData] = useState([]);
    const[modalInsertar,setModalInsertar]=useState(false);
    const[modalEditar,setModalEditar]=useState(false);
    const[modalEliminar,setModalEliminar]=useState(false);
    const [facturaSeleccionada,setFacturaSeleccionada]=useState({
      client:"",
      date:"",
      description:"",
      status:"",
      formaPago:"",
      bruto:"",
      IVA:"",
      total:"",
    })
    const handleChange=e=>{
        const{name,value}=e.target;
        setFacturaSeleccionada(prevState=>({
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
        await axios.post(baseUrl, facturaSeleccionada)
        .then(response =>{
            setData(data.concat(response.data));
            abrirCerrarModalInsertar();
        }).catch(error=>{
            console.log(error)
        })
    }

    const peticionesPut= async () =>{
        await axios.put(baseUrl+"/"+facturaSeleccionada._id, facturaSeleccionada)
        .then(response =>{
            var dataNueva=data;
            dataNueva.map(factura=>{
                if(factura.id===facturaSeleccionada._id)
                factura.client=facturaSeleccionada.client;
                factura.date=facturaSeleccionada.date;
                factura.description=facturaSeleccionada.description;
                factura.status=facturaSeleccionada.status;
                factura.formaPago=facturaSeleccionada.formaPago;
                factura.bruto=facturaSeleccionada.bruto;
                factura.IVA=facturaSeleccionada.IVA;
                factura.total=facturaSeleccionada.total;
          
            })
            setData(dataNueva);
            abrirCerrarModalEditar();
        }).catch(error=>{
            console.log(error)
        })
    }
    const peticionesDelete= async () =>{
        await axios.delete(baseUrl+"/"+facturaSeleccionada._id)
        .then(response =>{
            setData(data.filter(factura=>factura.id!==facturaSeleccionada._id));
            abrirCerrarModalEliminar();
        }).catch(error=>{
            console.log(error);
        })
    }

    const seleccionarfactura=(factura, caso)=>{
        setFacturaSeleccionada(factura);
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
            <h3>Agregar Nuevo factura</h3>
            <TextField className={styles.inputMaterial} label="factura" name="client" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Fecha" name="date" onChange={handleChange}/> 
            <TextField className={styles.inputMaterial} label="Descripcion" name="description" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Estado" name="status" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Forma de Pago" name="formaPago" onChange={handleChange}/>
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
            <h3>Editar factura</h3>
            <TextField className={styles.inputMaterial}  label="Cliente" name="client" onChange={handleChange} value={facturaSeleccionada && facturaSeleccionada.client}  />
            <TextField className={styles.inputMaterial} label="Fecha" name="date" onChange={handleChange} value={facturaSeleccionada && facturaSeleccionada.date}/> 
            <TextField className={styles.inputMaterial} label="Descripcion" name="description" onChange={handleChange} value={facturaSeleccionada&&facturaSeleccionada.description}/>
            <TextField className={styles.inputMaterial}  label="Estado" name="status" onChange={handleChange} value={facturaSeleccionada && facturaSeleccionada.status}/>
            <TextField className={styles.inputMaterial} label="Forma de Pago" name="formaPago" onChange={handleChange} value={facturaSeleccionada && facturaSeleccionada.formaPago}/>
            <TextField className={styles.inputMaterial} label="Bruto" name="bruto" onChange={handleChange} value={facturaSeleccionada && facturaSeleccionada.bruto}/>
            <TextField className={styles.inputMaterial} label="IVA" name="IVA" onChange={handleChange} value={facturaSeleccionada && facturaSeleccionada.IVA}/>
            <TextField className={styles.inputMaterial} label="Total" name="total" onChange={handleChange} value={facturaSeleccionada && facturaSeleccionada.total}/>
        <div align="center">
            <Button color="primary" onClick={()=>peticionesPut()}>Editar</Button>
            <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
        </div>

        </div>
        
    )

    const bodyEliminar=(
        <div className={styles.modal}>
            <p>Estas seguro que deseas eliminar el factura <b>{facturaSeleccionada&&facturaSeleccionada.bank}</b> ? </p>
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
              <Button onClick={()=>abrirCerrarModalInsertar()} color="secondary" variant="contained">Insertar factura</Button>
              </div>
          <MaterialTable
          columns={columns}
          data={data}
          title="Listado de Facturas"  
          actions={[
            {
              icon: 'edit',
              tooltip: 'Editar Factura',
              onClick: (event, rowData) => seleccionarfactura(rowData, "Editar")
            },
            {
              icon: 'delete',
              tooltip: 'Eliminar Factura',
              onClick: (event, rowData) => seleccionarfactura(rowData, "Eliminar")
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