import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Button, TextField} from '@material-ui/core';
import useStyles from './useStyles';

const baseUrl = "http://localhost:5001/cheque/"
const BodyEditar=()=>{
    const styles=useStyles();
    const [data, setData] = useState([]);
    const[modalEditar,setModalEditar]=useState(false);
    const [chequeSeleccionado, setChequeSeleccionado]=useState({
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
        }))
    }
    const peticionesPut= async (object) =>{
        await axios.put(baseUrl+chequeSeleccionado._id, chequeSeleccionado)
        .then(response =>{
            var dataNueva=data;
            dataNueva.map(cheque=>{
                if(cheque.id===chequeSeleccionado._id)
                cheque.cliente=chequeSeleccionado.cliente
                cheque.dateinitial=chequeSeleccionado.dateinitial
                cheque.datepayment=chequeSeleccionado.datepayment
                cheque.amount=chequeSeleccionado.amount
                cheque.bank=chequeSeleccionado.bank
                cheque.telephone=chequeSeleccionado.telephone
            })
            setData(dataNueva);
            abrirCerrarModalEditar();
        }).catch(error=>{
            console.log(error)
        })
    }
    const abrirCerrarModalEditar=()=>{
        setModalEditar(!modalEditar);
    }

    return(
    <div className={styles.modal}>
        <h3>Editar Cheque</h3>
        <TextField className={styles.inputMaterial} label="Cliente" name="client" onChange={handleChange} value={chequeSeleccionado&&chequeSeleccionado.client}  />
        <TextField className={styles.inputMaterial} label="Fecha" name="dateinitial" onChange={handleChange} value={chequeSeleccionado&&chequeSeleccionado.dateinitial}/> 
        <TextField className={styles.inputMaterial} label="Fecha de Cobro" name="datepayment" onChange={handleChange} value={chequeSeleccionado&&chequeSeleccionado.datepayment}/>
        <TextField className={styles.inputMaterial} label="Monto" name="amount" onChange={handleChange} value={chequeSeleccionado&&chequeSeleccionado.amount}/>
        <TextField className={styles.inputMaterial} label="Banco" name="bank" onChange={handleChange} value={chequeSeleccionado&&chequeSeleccionado.bank}/>
        <TextField className={styles.inputMaterial} label="Telefono de Contacto" name="telephone" onChange={handleChange} value={chequeSeleccionado&&chequeSeleccionado.telephone}/>
    <div align="center">
        <Button color="primary" onClick={()=>peticionesPut(data)}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
    </div>

    </div>
    )
}

export default BodyEditar;