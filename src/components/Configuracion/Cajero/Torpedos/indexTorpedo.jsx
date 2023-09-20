import React from "react";
import { SGTable } from "../../../auxiliar/table";
import { Trash } from "lucide-react";
import { Link } from "react-router-dom";

export default function IndexTorpedo() {
  const data = {
    columns: [
      {
        id: "nombre",
        accessorFn: (row) => row.nombre,
        cell: (info) => info.getValue(),
        header: "nombre",
        footer: (props) => props.column.id,
      },
      {
        id: "ci",
        accessorFn: (row) => row.ci,
        cell: (info) => info.getValue(),
        header: "ci",
        footer: (props) => props.column.id,
      },
      {
        id: "pais",
        accessorFn: (row) => row.pais,
        cell: (info) => info.getValue(),
        header: "pais",
        footer: (props) => props.column.id,
      },
      {
        id: "provincia",
        accessorFn: (row) => row.provincia,
        cell: (info) => info.getValue(),
        header: "provincia",
        footer: (props) => props.column.id,
      },
      {
        id: "municipio",
        accessorFn: (row) => row.municipio,
        cell: (info) => info.getValue(),
        header: "municipio",
        footer: (props) => props.column.id,
      },
      {
        id: "sexo",
        accessorFn: (row) => row.sexo,
        cell: (info) => info.getValue(),
        header: "sexo",
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
        ci: 123123123,
        pais: "cuba",
        provincia: "habana",
        municipio: "uci",
        sexo: "M",
        fecha: "29-06-15",
      },
    ],
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex border-b border-gray-300 justify-between">
        <h2 className="text-gray-700 font-semibold text-lg justify-center al">
          Lista de torpedos
        </h2>
        <Link to={"/configuracion/cajero/torpedo/create"} className={`mx-5 `}>
          <i className="fa-solid fa-circle-plus"></i>
        </Link>
      </div>
      <SGTable data={data} />
    </div>
  );
}
