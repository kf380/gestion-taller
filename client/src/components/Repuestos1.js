import React , { useEffect, useState }   from 'react';
import { useSelector, useDispatch} from 'react-redux';
import Link from '@mui/material/Link';
import {getProduct} from "../Redux/actions/actions";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';


function preventDefault(event) {
  event.preventDefault();
}

export default function Productos() {
  const dispatch =useDispatch()
  const [select, setSelect] = useState('');
  const [products,setProducts] = useState([])

  useEffect(()=>{
  dispatch(getProduct())
},[dispatch])


  const getAll = useSelector((state)=> state.allProducts);

  console.log(getAll,"pruebaaaa")
  return (
    <React.Fragment>
      <Title>Productos</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Codigo</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Descripcion</TableCell>
            <TableCell>Stocks</TableCell>
            <TableCell>Disponibilidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {getAll.map((orders)=>(
             <TableRow key={orders.id}>
             <TableCell>{orders.identifier}</TableCell>
             <TableCell>{orders.name}</TableCell>
             <TableCell>{orders.image}</TableCell>
             <TableCell>{orders.category}</TableCell>
             <TableCell>{orders.price}</TableCell>
             <TableCell>{orders.description}</TableCell>
             <TableCell>{orders.stock}</TableCell>
             <TableCell>{orders.available}</TableCell>

           </TableRow>
          ))}
        </TableBody>
      </Table>
     
    </React.Fragment>
  );
}