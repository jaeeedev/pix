import { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import useProducts from "../../hooks/useProducts";
import "../../aggrid.css";
import dayjs from "dayjs";

const AdminProductList = () => {
  const { items = [] } = useProducts();
  const [columnDefs, setColumnDefs] = useState([
    { field: "productId", flex: 1 },
    { field: "title", filter: true, flex: 1 },
    { field: "price", flex: 1 },
    {
      field: "createdAt",
      flex: 1,
      valueFormatter: (param: any) => {
        return dayjs(param.value).format("YYYY/MM/DD");
      },
    },
    { field: "soldOut", flex: 1 },
  ]);

  const defaultColDef = useMemo(
    () => ({
      suppressMovable: true,
      resizable: true,
    }),
    []
  );

  return (
    <div className="ag-theme-alpine" style={{ width: "100%", height: 500 }}>
      <AgGridReact
        rowData={items}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        animateRows={true}
        rowSelection="multiple"
      />
    </div>
  );
};

export default AdminProductList;
