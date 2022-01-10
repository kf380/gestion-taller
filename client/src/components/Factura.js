import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import AppBar from './AppBar';
import Paper from '@mui/material/Paper';
import Factura1 from './Factura1';

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
          <Grid container   direction="row"
                    justifyContent="space-between"
                    alignItems="center">

              
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
         
    
            
              <Paper sx={{ p: 2, justifyContent: 'flex-end', display: 'flex', backgroundColor:'#FFFF',color:'white', flexDirection: 'row'}}>
                  <Factura1/>
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