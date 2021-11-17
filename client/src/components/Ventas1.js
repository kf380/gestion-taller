import React , { useEffect, useState }   from 'react';
import { useSelector, useDispatch} from 'react-redux';
import Link from '@mui/material/Link';
import {getSale} from "../Redux/actions/actions";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Ventas() {
  const dispatch =useDispatch()
  const [select, setSelect] = useState('');
  const [sales,setSales] = useState([])

  useEffect(()=>{
  dispatch(getSale())
},[dispatch])

  useEffect(()=>{
    if(select === '...'){
      return setSales([])
    }
    const salesFilter = getAll.filter(sal => sal.status === select);
    setSales(salesFilter)
  },[select])

  const getAll = useSelector((state)=> state.allSales);
  return (
    <React.Fragment>
      <Title>Ventas</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
          <TableCell>ID</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Pago</TableCell>
            <TableCell>Descripcion</TableCell>
            <TableCell>Forma de Pago</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Bruto</TableCell>
            <TableCell>IVA</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {getAll.map((sales)=>(
             <TableRow key={sales.id}>
             <TableCell>{sales._id}</TableCell>
             <TableCell>{sales.date}</TableCell>
             <TableCell>{sales.status}</TableCell>
             <TableCell>{sales.description}</TableCell>
             <TableCell>{sales.formaPago}</TableCell>
             <TableCell>{sales.client}</TableCell>
             <TableCell>{sales.bruto}</TableCell>
             <TableCell>{sales.IVA}</TableCell>
             <TableCell>{sales.total}</TableCell>

           </TableRow>
          ))}
        </TableBody>
      </Table>
     
    </React.Fragment>
  );
}