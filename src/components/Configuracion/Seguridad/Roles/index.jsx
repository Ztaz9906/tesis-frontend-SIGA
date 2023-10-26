import React from "react";
import { SGTable } from "../../../auxiliar/table";
import { Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { Edit2Icon } from "lucide-react";
import { Button } from "../../../ui/button";
import Delete from "../../../auxiliar/delete";
import { useRedirectForm } from "../../../../hooks/useRedirectForm";
import {
  useDeleteGrupoMutation,
  useGetGruposQuery,
} from "./service/roles.service";
import { ListIcon } from "lucide-react";

export default function IndexRoles() {
  const { data } = useGetGruposQuery(undefined, {
    refetchOnReconnect: true,
  });

  const [
    deleteGrupo,
    {
      isError: isErrorD,
      isLoading: isLoadingD,
      isSuccess: isSuccessD,
      error: errorD,
    },
  ] = useDeleteGrupoMutation();

  useRedirectForm(isLoadingD, isSuccessD, isErrorD, errorD, "Rol eliminado");

  const datadef = {
    columns: [
      {
        id: "Nombre",
        accessorFn: (row) => row.name,
        cell: (info) => info.getValue(),
        header: "Nombre",
        footer: (props) => props.column.id,
      },
      {
        id: "Opciones",
        accessorFn: (row) => (
          <div className="flex gap-2 justify-center items-center">
            <Link to={`/configuracion/seguridad/roles/update/${row.id}`}>
              <Edit2Icon size={15} />
            </Link>
            <Delete
              title={`Borrar ${row.name}`}
              message="Esta seguro que desea eliminar este rol"
              action={() => deleteGrupo(row.id)}
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
          Roles
        </h2>
        <Link to={"/configuracion/seguridad/roles/create"} className={`mx-5 `}>
          <PlusCircle size={15} />
        </Link>
      </div>
      <SGTable data={datadef} />
    </div>
  );
}
