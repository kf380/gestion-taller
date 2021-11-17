import React , { useEffect, useState }   from 'react';
import { useSelector, useDispatch} from 'react-redux';
import Link from '@mui/material/Link';
import {getCashMovement} from "../Redux/actions/actions";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Movimientos() {
  const dispatch =useDispatch()


  useEffect(()=>{
  dispatch(getCashMovement())
},[dispatch])


  const getAll = useSelector((state)=> state.allCashMovements);
  console.log(getAll,"pruebaaaa")
  return (
    <React.Fragment>
      <Title>Movimientos</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Monto</TableCell>
            <TableCell>Descripcion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {getAll.map((cash)=>(
             <TableRow key={cash.id}>
             <TableCell>{cash._id}</TableCell>
             <TableCell>{cash.type}</TableCell>
             <TableCell>{cash.amount}</TableCell>
             <TableCell>{cash.comments}</TableCell>
           </TableRow>
          ))} 
        </TableBody>
      </Table>
     
    </React.Fragment>
  );
}