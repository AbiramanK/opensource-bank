import React, { useEffect, useState } from "react";
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
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    setPageSize(props?.pageSize);
  }, [props?.pageSize]);

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
          pageSize={pageSize}
          rowsPerPageOptions={props?.rowsPerPageOptions}
          disableSelectionOnClick={props?.disableSelectionOnClick}
          experimentalFeatures={{ newEditingApi: props?.newEditingApi }}
          paginationMode={"client"}
          loading={props?.loading}
          onRowClick={handleRowClickEvent}
          sx={{ p: 2 }}
          pagination
          onPageSizeChange={(size) => setPageSize(size)}
        />
      </Box>
    </React.Fragment>
  );
}
