import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import Deposits from './Deposits';
import AppBar from './AppBar';


const drawerWidth = 240;


const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);


  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar/>
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
            <Grid container spacing={3}>
      
          <Grid item xs={12}>
            <Paper sx={{p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 280}}>
              {/* <Orders /> */}
              <img height="240" src="https://media.istockphoto.com/vectors/engine-oil-advertisement-banner-vector-id1019877440?k=20&m=1019877440&s=170667a&w=0&h=eOeZbZ_Nrvhs6ytWTvUFJQxNyhbo7jj-3B43VCy-_UQ="></img>
            </Paper>
          </Grid>
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
  
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              <Grid item xs={12}>
            <Paper sx={{p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 280}}>
              {/* <Orders /> */}
              <img height="240" src="https://image.freepik.com/vector-gratis/bote-plastico-realista-banner-aceite-motor-aceite-motor_1284-58774.jpg"></img>
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