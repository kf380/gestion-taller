import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
export default function MenuPopupState() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <ListItemText variant="contained" color="primary" {...bindTrigger(popupState)}>
           Inventario
          </ListItemText>
          <Menu {...bindMenu(popupState)}>
            <MenuItem>
            <Button href="/Inventario/Repuestos">Repuestos</Button>
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}