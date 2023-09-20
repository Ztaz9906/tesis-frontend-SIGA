import React from "react";
import { SGTable } from "../../../auxiliar/table";
import Modal from "../../../auxiliar/modal";
export default function IndexConfiguracion() {
  const data = {
    columns: [
      {
        id: "fecha",
        accessorFn: (row) => row.fecha,
        cell: (info) => info.getValue(),
        header: "Fecha",
        footer: (props) => props.column.id,
      },
      {
        id: "acceso",
        accessorFn: (row) => row.acceso,
        cell: (info) => info.getValue(),
        header: "Acceso",
        footer: (props) => props.column.id,
      },
      {
        id: "editar",
        accessorFn: (row) => <Modal title={"Editar Accesos"} />,
        cell: (info) => info.getValue(),
        header: "Editar",
        footer: (props) => props.column.id,
      },
    ],
    rows: [
      {
        fecha: "tanner",
        acceso: "linsley",
      },
    ],
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <div className="border-x-[0.075rem] border-t border-gray-500 text-sm p-1 w-1/3">
          Configuracciones de acceso
        </div>
        <div className="border-b border-gray-500 w-full"></div>
      </div>
      <SGTable data={data} />
    </div>
  );
}
