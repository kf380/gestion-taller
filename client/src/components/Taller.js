import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { Link } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ListItemText from '@mui/material/ListItemText';
import Ordenes from './Ordenes'
export default function MenuPopupState() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <ListItemText variant="contained" color="primary" {...bindTrigger(popupState)}>
            Taller
          </ListItemText>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}> <Button  href="/Taller/Ordenes">Ordenes</Button></MenuItem>
            <MenuItem onClick={popupState.close}> <Button href='/Taller/Presupuesto'>Presupuesto</Button></MenuItem>
            <MenuItem onClick={popupState.close}> <Button href='/Taller/Factura'>Factura</Button></MenuItem>
            <MenuItem onClick={popupState.close}> <Button href='/Taller/Vehiculo'>Vehiculos</Button></MenuItem>
            <MenuItem onClick={popupState.close}> <Button href='/Taller/Calendario'>Calendario</Button></MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}