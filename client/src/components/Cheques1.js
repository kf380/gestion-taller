import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles'


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

const baseUrl = "http://localhost:5001/cheque"
function Table1() {
    const styles=useStyles();
    const [data, setData] = useState([]);
    const[modalInsertar,setModalInsertar]=useState(false);
    const[modalEditar,setModalEditar]=useState(false);
    const[modalEliminar,setModalEliminar]=useState(false);
    const [chequeSeleccionado,setChequeSeleccionado]=useState({
        client:"",
        dateinitial:"",
        datepayment:"",
        amount:"",
        bank:"",
        telephone:""
    })
    const handleChange=e=>{
        const{name,value}=e.target;
        setChequeSeleccionado(prevState=>({
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
        await axios.post(baseUrl, chequeSeleccionado)
        .then(response =>{
            setData(data.concat(response.data));
            abrirCerrarModalInsertar();
        }).catch(error=>{
            console.log(error)
        })
    }

    const peticionesPut= async () =>{
        await axios.put(baseUrl+"/"+chequeSeleccionado._id, chequeSeleccionado)
        .then(response =>{
            var dataNueva=data;
            dataNueva.map(cheque=>{
                if(cheque.id===chequeSeleccionado._id)
                cheque.cliente=chequeSeleccionado.cliente;
                cheque.dateinitial=chequeSeleccionado.dateinitial;
                cheque.datepayment=chequeSeleccionado.datepayment;
                cheque.amount=chequeSeleccionado.amount;
                cheque.bank=chequeSeleccionado.bank;
                cheque.telephone=chequeSeleccionado.telephone;
            })
            setData(dataNueva);
            abrirCerrarModalEditar();
        }).catch(error=>{
            console.log(error)
        })
    }
    const peticionesDelete= async () =>{
        await axios.delete(baseUrl+"/"+chequeSeleccionado._id)
        .then(response =>{
            setData(data.filter(cheque=>cheque.id!==chequeSeleccionado._id));
            abrirCerrarModalEliminar();
        }).catch(error=>{
            console.log(error);
        })
    }

    const seleccionarCheque=(cheque, caso)=>{
        setChequeSeleccionado(cheque);
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
            <h3>Agregar Nuevo Cheque</h3>
            <TextField className={styles.inputMaterial} label="Cliente" name="client" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Fecha" name="dateinitial" onChange={handleChange}/> 
            <TextField className={styles.inputMaterial} label="Fecha de Cobro" name="datepayment" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Monto" name="amount" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Banco" name="bank" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Telefono de Contacto" name="telephone" onChange={handleChange}/>
        <div align="center">
            <Button color="primary" onClick={()=>peticionesPost()}>Insertar</Button>
            <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
        </div>

        </div>
    )
    const bodyEditar=(
   
       
        <div className={styles.modal}>
            <h3>Editar Cheque</h3>
            <TextField className={styles.inputMaterial} label="Cliente" name="client" onChange={handleChange} value={chequeSeleccionado && chequeSeleccionado.client}  />
            <TextField className={styles.inputMaterial} label="Fecha" name="dateinitial" onChange={handleChange} value={chequeSeleccionado && chequeSeleccionado.dateinitial}/> 
            <TextField className={styles.inputMaterial} label="Fecha de Cobro" name="datepayment" onChange={handleChange} value={chequeSeleccionado&&chequeSeleccionado.datepayment}/>
            <TextField className={styles.inputMaterial} label="Monto" name="amount" onChange={handleChange} value={chequeSeleccionado && chequeSeleccionado.amount}/>
            <TextField className={styles.inputMaterial} label="Banco" name="bank" onChange={handleChange} value={chequeSeleccionado && chequeSeleccionado.bank}/>
            <TextField className={styles.inputMaterial} label="Telefono de Contacto" name="telephone" onChange={handleChange} value={chequeSeleccionado && chequeSeleccionado.telephone}/>
        <div align="center">
            <Button color="primary" onClick={()=>peticionesPut()}>Editar</Button>
            <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
        </div>

        </div>
        
    )

    const bodyEliminar=(
        <div className={styles.modal}>
            <p>Estas seguro que deseas eliminar el cheque <b>{chequeSeleccionado&&chequeSeleccionado.bank}</b> ? </p>
            <div align="right">
                <Button color="secondary" onClick={()=>peticionesDelete()}>SI</Button>
                <Button onClick={()=>abrirCerrarModalEliminar()}>NO</Button>

            </div>

        </div>
    )

    return (
        <div>
         
            <div align="center">
            <button onClick={()=>abrirCerrarModalInsertar()} color="secondary">Insertar Cheque</button>
            </div>
            <TableContainer>
       <Table >
         <TableHead>
           <TableRow>
             <TableCell>Cliente</TableCell>
             <TableCell>Fecha</TableCell>
             <TableCell>Fecha de Pago</TableCell>
             <TableCell>Monto</TableCell>
             <TableCell>Banco</TableCell>
             <TableCell>Telefono de contacto</TableCell>
             <TableCell>Acciones</TableCell>
           </TableRow>
         </TableHead>

         <TableBody>
           {data.map(cheque=>(
             <TableRow key={cheque.id}>
               <TableCell>{cheque.client}</TableCell>
               <TableCell>{cheque.dateinitial}</TableCell>
               <TableCell>{cheque.datepayment}</TableCell>
               <TableCell>{cheque.amount}</TableCell>
               <TableCell>{cheque.bank}</TableCell>
               <TableCell>{cheque.telephone}</TableCell>
               <TableCell>
                 <Edit className={styles.iconos} onClick={()=>seleccionarCheque(cheque, 'Editar')}/>
                 &nbsp;&nbsp;&nbsp;
                 <Delete  className={styles.iconos} onClick={()=>seleccionarCheque(cheque, 'Eliminar')}/>
                 </TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
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