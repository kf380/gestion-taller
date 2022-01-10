import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Vehiculos</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Pago</TableCell>
            <TableCell>Caja</TableCell>
            <TableCell>Comprobante</TableCell>
            <TableCell>Proveedor</TableCell>
            <TableCell>Neto</TableCell>
            <TableCell>IVA</TableCell>
            <TableCell>Bruto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
        </TableBody>
      </Table>
     
    </React.Fragment>
  );
}