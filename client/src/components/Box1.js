import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const style = {
  bgcolor: 'background.paper',
};

export default function ListDividers() {
  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem button>
        <ListItemText primary="Resumen" />
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText secondary="Drafts" />
      </ListItem>
      <ListItem button>
        <ListItemText secondary="Trash" />
      </ListItem>
      <Divider light />
      <ListItem button>
        <ListItemText secondary="Spam" />
      </ListItem>
    </List>
  );
}
