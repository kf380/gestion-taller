import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ListItemText from '@mui/material/ListItemText';
export default function MenuPopupState() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <ListItemText variant="contained" color="primary" {...bindTrigger(popupState)}>
           Administracion
          </ListItemText>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}><Button  href="/Administracion/Compras">Compras</Button></MenuItem>
            <MenuItem onClick={popupState.close}><Button  href="/Administracion/Ventas">Ventas</Button></MenuItem>
            <MenuItem onClick={popupState.close}><Button  href="/Administracion/Clientes">Clientes</Button></MenuItem>
            <MenuItem onClick={popupState.close}><Button  href="/Administracion/Proveedores">Proveedores</Button></MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}