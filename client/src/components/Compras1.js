
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Modal, Button, TextField} from '@material-ui/core';
import XLSX from 'xlsx';
import Box from '@mui/material/Box';
import {makeStyles} from '@material-ui/core/styles'
import MaterialTable from "@material-table/core";
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';

const generateClassName = createGenerateClassName({
    productionPrefix: 'mt',
    seed: 'mt'
  });
  
    const columns= [
      { title: 'ID', field: '_id' },
      { title: 'Fecha', field: 'date' },
      { title: 'Estado', field: 'status' },
      { title: 'Descripcion', field: 'description'},
      { title: 'Forma de Pago', field: 'formaPago'},
      { title: 'Proveedor', field: 'supplier'},
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

const baseUrl = "http://localhost:5001/shopping"
function Table1() {
    const styles=useStyles();
    const [data, setData] = useState([]);
    const[modalInsertar,setModalInsertar]=useState(false);
    const[modalEditar,setModalEditar]=useState(false);
    const[modalEliminar,setModalEliminar]=useState(false);
    const [compraSeleccionada,setCompraSeleccionada]=useState({
      date: "",
      status: "",
      description: "",
      formaPago: "",
      supplier: "",
      total: "",
      IVA: "21",
      bruto: "",
    })
    const handleChange=e=>{
        const{name,value}=e.target;
        setCompraSeleccionada(prevState=>({
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
        await axios.post(baseUrl, compraSeleccionada)
        .then(response =>{
            setData(data.concat(response.data));
            abrirCerrarModalInsertar();
        }).catch(error=>{
            console.log(error)
        })
    }

    const peticionesPut= async () =>{
        await axios.put(baseUrl+"/"+compraSeleccionada._id, compraSeleccionada)
        .then(response =>{
            var dataNueva=data;
            dataNueva.map(compra=>{
                if(compra.id===compraSeleccionada._id)
                compra.date=compraSeleccionada.date;
                compra.status=compraSeleccionada.status;
                compra.description=compraSeleccionada.description;
                compra.formaPago=compraSeleccionada.formaPago;
                compra.supplier=compraSeleccionada.supplier;
                compra.total=compraSeleccionada.total;
                compra.IVA=compraSeleccionada.IVA;
                compra.bruto=compraSeleccionada.bruto;
            })
            setData(dataNueva);
            abrirCerrarModalEditar();
        }).catch(error=>{
            console.log(error)
        })
    }
    const peticionesDelete= async () =>{
        await axios.delete(baseUrl+"/"+compraSeleccionada._id)
        .then(response =>{
            setData(data.filter(compra=>compra.id!==compraSeleccionada._id));
            abrirCerrarModalEliminar();
        }).catch(error=>{
            console.log(error);
        })
    }

    const seleccionarCompra=(compra, caso)=>{
        setCompraSeleccionada(compra);
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
            <h3>Agregar Nuevo compra</h3>
            <TextField className={styles.inputMaterial} label="Fecha" name="date" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Estado" name="status" onChange={handleChange}/> 
            <TextField className={styles.inputMaterial} label="Descripcion" name="description" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Forma de Pago" name="formaPago" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Proveedor" name="supplier" onChange={handleChange}/>
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
            <h3>Editar compra</h3>
            <TextField className={styles.inputMaterial} label="Fecha" name="date"  onChange={handleChange} value={compraSeleccionada && compraSeleccionada.date}  />
            <TextField className={styles.inputMaterial}  label="Estado" name="status"  onChange={handleChange} value={compraSeleccionada && compraSeleccionada.status}/> 
            <TextField className={styles.inputMaterial}label="Descripcion" name="description" onChange={handleChange} value={compraSeleccionada&&compraSeleccionada.description}/>
            <TextField className={styles.inputMaterial} label="Forma de Pago" name="formaPago" onChange={handleChange} value={compraSeleccionada && compraSeleccionada.formaPago}/>
            <TextField className={styles.inputMaterial}  label="Proveedor" name="supplier" onChange={handleChange} value={compraSeleccionada && compraSeleccionada.supplier}/>
            <TextField className={styles.inputMaterial}  label="Bruto" name="bruto" onChange={handleChange} value={compraSeleccionada && compraSeleccionada.bruto}/>
            <TextField className={styles.inputMaterial}  label="IVA" name="IVA" onChange={handleChange} value={compraSeleccionada && compraSeleccionada.IVA}/>
            <TextField className={styles.inputMaterial}  label="Total" name="total" onChange={handleChange} value={compraSeleccionada && compraSeleccionada.total}/>
        <div align="center">
            <Button color="primary" onClick={()=>peticionesPut()}>Editar</Button>
            <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
        </div>

        </div>
        
    )

    const bodyEliminar=(
        <div className={styles.modal}>
            <p>Estas seguro que deseas eliminar el compra <b>{compraSeleccionada&&compraSeleccionada.bank}</b> ? </p>
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
                <Button onClick={()=>abrirCerrarModalInsertar()} color="secondary" variant="contained">Agregar compra</Button>
                </div>
  
    </Box>
              
          <MaterialTable
          
          columns={columns}
          data={data}
          title="Listado de Compras"  
          actions={[
            {
                icon:()=><Button color="primary" variant="contained">Exportar</Button>,
                tooltip:"Exportar a Excel",
                onClick:()=>dowloandExcel(),
                isFreeAction:true
              },
            {
              icon: 'edit',
              tooltip: 'Editar Compra',
              onClick: (event, rowData) => seleccionarCompra(rowData, "Editar")
            },
            {
              icon: 'delete',
              tooltip: 'Eliminar Compra',
              onClick: (event, rowData) => seleccionarCompra(rowData, "Eliminar")
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