import React from "react";
import { SGTable } from "../../../auxiliar/table";
import { Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import {
  useDeleteHorarioMutation,
  useGetHorariosQuery,
} from "./service/horario.service";
import { Edit2Icon } from "lucide-react";
import { Button } from "../../../ui/button";
import Delete from "../../../auxiliar/delete";
import { useRedirectForm } from "../../../../hooks/useRedirectForm";

export default function IndexHorarios() {
  const { data } = useGetHorariosQuery(undefined, {
    refetchOnReconnect: true,
  });
  const [
    deleteHorario,
    {
      isError: isErrorD,
      isLoading: isLoadingD,
      isSuccess: isSuccessD,
      error: errorD,
    },
  ] = useDeleteHorarioMutation();

  useRedirectForm(
    isLoadingD,
    isSuccessD,
    isErrorD,
    errorD,
    "Horario Eliminado"
  );

  console.log(data);
  const datadef = {
    columns: [
      {
        id: "nombre_horario",
        accessorFn: (row) => row.nombre_horario,
        cell: (info) => info.getValue(),
        header: "Nombre",
        footer: (props) => props.column.id,
      },
      {
        id: "hora_inicio",
        accessorFn: (row) => row.hora_inicio,
        cell: (info) => info.getValue(),
        header: "Hora de Inicio",
        footer: (props) => props.column.id,
      },
      {
        id: "hora_fin",
        accessorFn: (row) => row.hora_fin,
        cell: (info) => info.getValue(),
        header: "Hora de Fin",
        footer: (props) => props.column.id,
      },
      {
        id: "dias_semana",
        accessorFn: (row) =>
          Array.isArray(row.dias_semana)
            ? row.dias_semana.map((day) => day.dia_semana).join(", ")
            : "",
        cell: (info) => info.getValue(),
        header: "Dias",
        footer: (props) => props.column.id,
      },
      {
        id: "active",
        accessorFn: (row) => row.active,
        cell: ({ row }) => (row.original.active === true ? "SI" : "NO"),
        header: "Activo",
        footer: (props) => props.column.id,
      },
      {
        id: "Opciones",
        accessorFn: (row) => (
          <div className="flex gap-2 justify-center items-center">
            <Link to={`/configuracion/distribucion/horario/update/${row.id}`}>
              <Edit2Icon size={15} />
            </Link>
            <Delete
              title={`Borrar ${row.name}`}
              message="Esta seguro que desea eliminar esta categoria"
              action={() => deleteHorario(row.id_horario)}
            >
              <Button variant={"ghost"} size={"icon"}>
                <Trash size={15} />
              </Button>
            </Delete>
          </div>
        ),
        cell: (info) => info.getValue(),
        header: "Opciones",
        footer: (props) => props.column.id,
      },
    ],
    rows: data ?? [],
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex border-b border-gray-300 justify-between">
        <h2 className="text-gray-700 font-semibold text-lg justify-center al">
          Horarios
        </h2>
        <Link
          to={"/configuracion/distribucion/categorias/create"}
          className={`mx-5 `}
        >
          <PlusCircle size={15} />
        </Link>
      </div>
      <SGTable data={datadef} />
    </div>
  );
}
