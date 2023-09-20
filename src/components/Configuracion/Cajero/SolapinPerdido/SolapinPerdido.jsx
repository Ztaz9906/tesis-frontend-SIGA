import React from "react";
import { IndeterminateRadio, SGTable } from "../../../auxiliar/table";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { useState } from "react";
import { List } from "lucide-react";

export default function SolapinPerdido() {
  const [radio, setRadio] = useState({});
  const data = {
    columns: [
      {
        id: "property",
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateRadio
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      {
        id: "foto",
        accessorFn: (row) => <Avatar />,
        cell: (info) => info.getValue(),
        header: "foto",
        footer: (props) => props.column.id,
      },
      {
        id: "nombre",
        accessorFn: (row) => row.nombre,
        cell: (info) => info.getValue(),
        header: "nombre",
        footer: (props) => props.column.id,
      },
      {
        id: "solapin",
        accessorFn: (row) => row.solapin,
        cell: (info) => info.getValue(),
        header: "solapin",
        footer: (props) => props.column.id,
      },
      {
        id: "expediente",
        accessorFn: (row) => row.expediente,
        cell: (info) => info.getValue(),
        header: "No Expediente",
        footer: (props) => props.column.id,
      },
      {
        id: "cargo",
        accessorFn: (row) => row.cargo,
        cell: (info) => info.getValue(),
        header: "cargo",
        footer: (props) => props.column.id,
      },
      {
        id: "area",
        accessorFn: (row) => row.area,
        cell: (info) => info.getValue(),
        header: "area",
        footer: (props) => props.column.id,
      },
    ],
    rows: [
      {
        nombre: "tanner",
        solapin: "ef123",
        expediente: "T!234",
        area: "uci",
        cargo: "jefe",
      },
      {
        nombre: "tanner",
        solapin: "ef123",
        expediente: "T!234",
        area: "uci",
        cargo: "jefe",
      },
    ],
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex border-b border-gray-300 justify-between">
        <h2 className="text-gray-700 font-semibold text-lg justify-center al">
          Registrar Solapin Perdidos
        </h2>
        <Link to={"/configuracion/cajero/6"} className={`mx-5 `}>
          <List size={15} />
        </Link>
      </div>
      <SGTable data={data} selectOption={radio} setRowSelection={setRadio} />
    </div>
  );
}
