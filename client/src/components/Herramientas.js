import React from 'react';
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
           Herramientas
          </ListItemText>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>Importar</MenuItem>
            <MenuItem onClick={popupState.close}>Exportar</MenuItem>
           
        
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}