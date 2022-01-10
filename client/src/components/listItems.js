import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BuildIcon from '@mui/icons-material/Build';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import InventoryIcon from '@mui/icons-material/Inventory';
import Administracion from './Administracion'
import Caja from './Caja'
import Taller from './Taller'
import Inventario from './Inventario'
import Metricas from './Metricas'
import Herramientas from './Herramientas'
export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon >
        <DashboardIcon />
      </ListItemIcon>
    <Metricas/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
      <BuildCircleIcon />
      </ListItemIcon>
      <Taller />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Administracion/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <Caja />
    </ListItem>

  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <InventoryIcon />
      </ListItemIcon>
 <Inventario/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BuildIcon />
      </ListItemIcon>
    <Herramientas />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Informes" />
    </ListItem>
  </div>
);