import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import AppBar from './AppBar';
import Select from './Select'
import Search from './Search'
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Presupuesto1 from './Presupuesto1';
import Title from './Title';
const mdTheme = createTheme();

function DashboardContent() {

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
                    <Title>Presupuesto</Title>
                </Grid>
                <Divider />
                <Grid container justifyContent="space-evenly" spacing={2}>
                  {/* Chart */}
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                    <Button variant="contained" color="success" href="/Taller/Presupuesto/CrearPresupuesto">Nuevo</Button>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                    <Search />
                  </Grid>
                  <Grid item xs={12} md={4} lg={3}>

                  </Grid>

                  <Grid item xs={12}>
                    <Presupuesto1 />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            </Grid>
            
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}