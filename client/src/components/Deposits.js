import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Ingresos del dia de hoy</Title>
      <Typography align="center" component="p" variant="h4">
        $45,024.00
      </Typography>
    </React.Fragment>
  );
}