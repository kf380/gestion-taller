import React , { useEffect, useState }   from 'react';
import { useSelector, useDispatch} from 'react-redux';
import Link from '@mui/material/Link';
import {getBudget} from "../Redux/actions/actions";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


function preventDefault(event) {
  event.preventDefault();
}

export default function Budget() {
  const dispatch =useDispatch()
  const [select, setSelect] = useState('');
  const [budget,setBudget] = useState([])

  useEffect(()=>{
  dispatch(getBudget())
},[dispatch])


  const getAll = useSelector((state)=> state.allBudgets);

  console.log(getAll,"pruebaaaa")
  return (
    <React.Fragment>
     
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nº de Presupuesto</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Vehiculo</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {getAll.map((budget)=>(
             <TableRow key={budget.id}>
             <TableCell>{budget._id}</TableCell>
             <TableCell>{budget.date}</TableCell>
             <TableCell>{budget.client}</TableCell>
             <TableCell>{budget.vehicle}</TableCell>
             <TableCell>{budget.total}</TableCell>

           </TableRow>
          ))}
        </TableBody>
      </Table>
     
    </React.Fragment>
  );
}