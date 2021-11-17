
import * as React from 'react';
import { DataGrid, GridToolbarExport,
GridToolbarContainer } from '@mui/x-data-grid';


export default function MyExportButton() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}