import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Modal, Button, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import MaterialTable from "@material-table/core";
import XLSX from 'xlsx';
import Box from '@mui/material/Box';
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';

const generateClassName = createGenerateClassName({
    productionPrefix: 'mt',
    seed: 'mt'
  });
  
    const columns= [
      { title: 'Codigo', field: 'identifier' },
      { title: 'Nombre', field: 'name' },
      { title: 'Categoria', field: 'category' },
      { title: 'Precio', field: 'price' , type:"currency", currencySetting:{minimumFractionDigits:0}},
      { title: 'Descripcion', field: 'description'},
      { title: 'Stock', field: 'stock'},
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

const baseUrl = "http://localhost:5001/product"
function Table1() {
    const styles=useStyles();
    const [data, setData] = useState([]);
    const[modalInsertar,setModalInsertar]=useState(false);
    const[modalEditar,setModalEditar]=useState(false);
    const[modalEliminar,setModalEliminar]=useState(false);
    const [respuestoSeleccionado,setRepuestoSeleccionado]=useState({
        name:"",
        category:"",
        price:"",
        description:"",
        stock:"",
        identifier:"",
    })
    const handleChange=e=>{
        const{name,value}=e.target;
        setRepuestoSeleccionado(prevState=>({
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
        await axios.post(baseUrl, respuestoSeleccionado)
        .then(response =>{
            setData(data.concat(response.data));
            abrirCerrarModalInsertar();
        }).catch(error=>{
            console.log(error)
        })
    }

    const peticionesPut= async () =>{
        await axios.put(baseUrl+"/"+respuestoSeleccionado._id, respuestoSeleccionado)
        .then(response =>{
            var dataNueva=data;
            dataNueva.map((producto) =>{
                if(producto.id===respuestoSeleccionado._id)
                producto.name=respuestoSeleccionado.name;
                producto.category=respuestoSeleccionado.category;
                producto.price=respuestoSeleccionado.price;
                producto.description=respuestoSeleccionado.description;
                producto.stock=respuestoSeleccionado.stock;
                producto.identifier=respuestoSeleccionado.identifier;
            })
            setData(dataNueva);
            abrirCerrarModalEditar();
        }).catch(error=>{
            console.log(error)
        })
    }
    const peticionesDelete= async () =>{
        await axios.delete(baseUrl+"/"+respuestoSeleccionado._id)
        .then(response =>{
            setData(data.filter(producto=>producto.id!==respuestoSeleccionado._id));
            abrirCerrarModalEliminar();
        }).catch(error=>{
            console.log(error);
        })
    }

    const seleccionarproducto=(producto, caso)=>{
        setRepuestoSeleccionado(producto);
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
            <h3>Agregar Nuevo producto</h3>
            <TextField className={styles.inputMaterial} label="Nombre" name="name" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Categoria" name="category" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Precio" name="price" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Descripcion" name="description" onChange={handleChange}/>
            <TextField className={styles.inputMaterial} label="Stocks" name="stock" onChange={handleChange}/>
        <div align="center">
            <Button color="primary" onClick={()=>peticionesPost()}>Insertar</Button>
            <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
        </div>

        </div>
    )
    const bodyEditar=(
   
       
        <div className={styles.modal}>
            <h3>Editar producto</h3>
            <TextField className={styles.inputMaterial} label="Nombre" name="name" onChange={handleChange} value={respuestoSeleccionado && respuestoSeleccionado.name}  />
            <TextField className={styles.inputMaterial} label="Categoria" name="category"  onChange={handleChange} value={respuestoSeleccionado&&respuestoSeleccionado.category}/>
            <TextField className={styles.inputMaterial} label="Precio" name="price" onChange={handleChange} value={respuestoSeleccionado && respuestoSeleccionado.price}/>
            <TextField className={styles.inputMaterial} label="Descripcion" name="description"  onChange={handleChange} value={respuestoSeleccionado && respuestoSeleccionado.description}/>
            <TextField className={styles.inputMaterial}  label="Stocks" name="stock"  onChange={handleChange} value={respuestoSeleccionado && respuestoSeleccionado.stock}/>
    
        <div align="center">
            <Button color="primary" onClick={()=>peticionesPut()}>Editar</Button>
            <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
        </div>

        </div>
        
    )

    const bodyEliminar=(
        <div className={styles.modal}>
            <p>Estas seguro que deseas eliminar el producto <b>{respuestoSeleccionado&&respuestoSeleccionado.name}</b> ? </p>
            <div align="right">
                <Button color="secondary" onClick={()=>peticionesDelete()}>SI</Button>
                <Button onClick={()=>abrirCerrarModalEliminar()}>NO</Button>

            </div>

        </div>
    )

    const dowloandExcel=()=>{
        const workSheet=XLSX.utils.json_to_sheet(data)
        const workBook=XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, workSheet,"Productos")
        
      
        
        XLSX.write(workBook,{bookType:"xlsx",type:"binary"})

        XLSX.writeFile(workBook, "ProductosData.xlsx")
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
                <Button onClick={()=>abrirCerrarModalInsertar()} color="secondary" variant="contained">Agregar Producto</Button>
                </div>
    </Box>
          <MaterialTable
          columns={columns}
          data={data}
          title="Listado de Productos"  
          actions={[
            {
                icon:()=><Button color="primary" variant="contained">Exportar</Button>,
                tooltip:"Exportar a Excel",
                onClick:()=>dowloandExcel(),
                isFreeAction:true
              },
            {
              icon: 'edit',
              tooltip: 'Editar producto',
              onClick: (event, rowData) => seleccionarproducto(rowData, "Editar")
            },
            {
              icon: 'delete',
              tooltip: 'Eliminar producto',
              onClick: (event, rowData) => seleccionarproducto(rowData, "Eliminar")
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