import React from "react";
import { SGTable } from "../../../auxiliar/table";
import { Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";

export default function IndexSolapinPerdido() {
  const data = {
    columns: [
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
        id: "usuario",
        accessorFn: (row) => row.usuario,
        cell: (info) => info.getValue(),
        header: "usuario",
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
        id: "codigo",
        accessorFn: (row) => row.codigo,
        cell: (info) => info.getValue(),
        header: "Codigo de Barra",
        footer: (props) => props.column.id,
      },
      {
        id: "fecha",
        accessorFn: (row) => row.fecha,
        cell: (info) => info.getValue(),
        header: "fecha",
        footer: (props) => props.column.id,
      },
      {
        id: "area",
        accessorFn: (row) => row.area,
        cell: (info) => info.getValue(),
        header: "area",
        footer: (props) => props.column.id,
      },
      {
        id: "Opciones",
        accessorFn: (row) => <Trash size={15} />,
        cell: (info) => info.getValue(),
        header: "Editar",
        footer: (props) => props.column.id,
      },
    ],
    rows: [
      {
        nombre: "tanner",
        usuario: 123123123,
        solapin: "ef123",
        codigo: "T!234",
        area: "uci",
        fecha: "29-06-15",
      },
    ],
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex border-b border-gray-300 justify-between">
        <h2 className="text-gray-700 font-semibold text-lg justify-center al">
          Personas con solapin perdidos
        </h2>
        <Link
          to={"/configuracion/cajero/solapin-perdido/asociar"}
          className={`mx-5 `}
        >
          <i className="fa-solid fa-circle-plus"></i>
        </Link>
      </div>
      <SGTable data={data} />
    </div>
  );
}
