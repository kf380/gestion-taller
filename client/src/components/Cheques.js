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
import Cheques1 from './Cheques1';
import Table1 from './Table1';

const mdTheme = createTheme();

export default function Cheques() {

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
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  {/* <Cheques1/> */}
                  <Table1/>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
            </Box>
        </ThemeProvider>
    );
}

