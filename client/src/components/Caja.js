import React from 'react';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ListItemText from '@mui/material/ListItemText';
export default function MenuPopupState() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <ListItemText variant="contained" color="primary" {...bindTrigger(popupState)}>
           Caja
          </ListItemText>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}> <Button  href="/Caja/EstadoCaja">Estado de caja</Button></MenuItem>
            <MenuItem onClick={popupState.close}> <Button  href="/Caja/Ordenes">Cierres</Button></MenuItem>
            <MenuItem onClick={popupState.close}> <Button  href="/Caja/Movimientos">Movimientos</Button></MenuItem>
            <MenuItem onClick={popupState.close}> <Button  href="/Caja/CuentaCorrientes">Cuentas corrientes</Button></MenuItem>
            <MenuItem onClick={popupState.close}> <Button  href="/Caja/Cheques">Cheques</Button></MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}