import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";

interface IDataGridTableProps {
  rows: Array<any>;
  columns: GridColDef[];
  pageSize: number;
  rowsPerPageOptions: Array<number>;
  disableSelectionOnClick: boolean;
  newEditingApi: boolean;
  tableHeight: number | string;
  loading: boolean;
  onRowClick: Function;
}

export default function DataGridTable(props: IDataGridTableProps) {
  const handleRowClickEvent: GridEventListener<"rowClick"> = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details // GridCallbackDetails
  ) => {
    props?.onRowClick(params?.row);
  };

  return (
    <React.Fragment>
      <Box sx={{ height: props?.tableHeight, width: "100%" }}>
        <DataGrid
          rows={props?.rows}
          columns={props?.columns}
          pageSize={props?.pageSize}
          rowsPerPageOptions={props?.rowsPerPageOptions}
          disableSelectionOnClick={props?.disableSelectionOnClick}
          experimentalFeatures={{ newEditingApi: props?.newEditingApi }}
          paginationMode={"client"}
          loading={props?.loading}
          onRowClick={handleRowClickEvent}
          sx={{ p: 2 }}
        />
      </Box>
    </React.Fragment>
  );
}
