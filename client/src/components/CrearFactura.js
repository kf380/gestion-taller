import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import AppBar from './AppBar';
// import Select from './Select'
import Search from './Search'
import Paper from '@mui/material/Paper';
import Date from './Date'
import Button from '@mui/material/Button';
import Title from './Title';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Table from './Table';
import Divider from '@mui/material/Divider';
import Box1 from './Box1';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const mdTheme = createTheme();

function DashboardContent() {
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center">

              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Grid xs={12}>
                    <Title> Presupuesto</Title>
                  </Grid>
                  <Divider />
                  <Grid container justifyContent="space-evenly" spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                      <Button variant="contained" color="secondary">Cancelar</Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                      <Button variant="contained" color="secondary">Confirmar</Button>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid container spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                      FECHA DE INGRESO
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                      <Date />
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid container spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                      BUSCAR CLIENTE
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                      <Search />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                      BUSCAR VEHICULO
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                      <TextField   sx={{ width: 120 }} id="outlined-basic" variant="outlined" />
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid container spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                      CONCEPTO
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                      <FormControl  sx={{ width: 120 }} >
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Age"
                          onChange={handleChange}

                        >
                          <MenuItem >Todos</MenuItem>
                          <MenuItem >Pendientes</MenuItem>
                          <MenuItem >Con Turnos</MenuItem>
                          <MenuItem >Entregados</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>




                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Table />
                  </Grid>
                  <Divider />
                  <Grid container justifyContent="space-evenly" spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={4} >
                      <List component="nav" aria-label="mailbox folders">
                        <ListItem button>
                          <ListItemText primary="Resumen" />
                        </ListItem>
                        <Divider />
                        <ListItem button divider>
                          <ListItemText secondary="Descuentos" />
                        </ListItem>
                        <ListItem button>
                          <ListItemText secondary="Repuestos" />
                        </ListItem>
                        <Divider light />
                        <ListItem button>
                          <ListItemText secondary="Mano de Obra" />
                        </ListItem>
                        <Divider light />
                        <ListItem button>
                          <ListItemText secondary="Neto" />
                        </ListItem>
                        <Divider light />
                        <ListItem button>
                          <ListItemText secondary="IVA" />
                        </ListItem>
                        <Divider light />
                        <ListItem button>
                          <ListItemText secondary="Total" />
                        </ListItem>
                      </List>
                    </Grid>
                    <Divider orientation="vertical" variant="middle" flexItem />
                   
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            {/* <Copyright sx={{ pt: 4 }} /> */}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}