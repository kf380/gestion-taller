import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {Modal, Button, TextField} from '@material-ui/core';
import XLSX from 'xlsx';
import MaterialTable, { Column } from "@material-table/core";
import {makeStyles} from '@material-ui/core/styles'
import { DataGrid } from '@mui/x-data-grid';
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';
const generateClassName = createGenerateClassName({
  productionPrefix: 'mt',
  seed: 'mt'
});

  const columns= [
    { title: 'Cliente', field: 'client' },
    { title: 'Fecha', field: 'dateinitial' },
    { title: 'Fecha de Pago', field: 'datepayment' },
    { title: 'Monto', field: 'amount', type:"currency", currencySetting:{minimumFractionDigits:0}},
    { title: 'Banco', field: 'bank'},
    { title: 'Telefono de contacto', field: 'telephone'}
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
      const dowloandExcel=()=>{
        const workSheet=XLSX.utils.json_to_sheet(data)
        const workBook=XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, workSheet,"cheque")
        
        let buf=XLSX.write(workBook,{bookType:"xlsx", type:"buffer"})
        
        XLSX.write(workBook,{bookType:"xlsx",type:"binary"})

        XLSX.writeFile(workBook, "ChequeData.xlsx")
      }
    return (
        <div>
                <StylesProvider generateClassName={generateClassName}>
            <div align="center">
                <Button onClick={()=>abrirCerrarModalInsertar()} color="secondary" variant="contained">Insertar Cheque</Button>
                </div>
            <MaterialTable
          columns={columns}
          data={data}
          title="Listado de Cheques"  
          actions={[
            {
              icon:()=><Button color="secondary" variant="success">Export</Button>,
              tooltip:"Export to Excel",
              onClick:()=>dowloandExcel(),
              isFreeAction:true
            },
            {
              icon: 'edit',
              tooltip: 'Editar Cheque',
              onClick: (event, rowData) => seleccionarCheque(rowData, "Editar")
            },
            {
              icon: 'delete',
              tooltip: 'Eliminar Artista',
              onClick: (event, rowData) => seleccionarCheque(rowData, "Eliminar")
            }
          ]}
          options={{
            actionsColumnIndex: -1,
            rowStyle:(data,index)=>index%2==0?{background:"#f5f5f5"}:null,
            headerStyle:{background:"#1976d2"}
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