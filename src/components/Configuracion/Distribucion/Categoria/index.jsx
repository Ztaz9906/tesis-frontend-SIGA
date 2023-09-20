import React from "react";
import { SGTable } from "../../../auxiliar/table";
import { Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import {
  useDeleteCategoriaMutation,
  useGetCategoriasQuery,
} from "./service/categoria.service";
import { Edit2Icon } from "lucide-react";
import { Button } from "../../../ui/button";
import Delete from "../../../auxiliar/delete";
import { useRedirectForm } from "../../../../hooks/useRedirectForm";

export default function Index() {
  const { data } = useGetCategoriasQuery(undefined, {
    refetchOnReconnect: true,
  });
  const [
    deleteCategoria,
    {
      isError: isErrorD,
      isLoading: isLoadingD,
      isSuccess: isSuccessD,
      error: errorD,
    },
  ] = useDeleteCategoriaMutation();

  useRedirectForm(
    isLoadingD,
    isSuccessD,
    isErrorD,
    errorD,
    "Categoria Eliminada"
  );
  console.log(data);
  const datadef = {
    columns: [
      {
        id: "name",
        accessorFn: (row) => row.name,
        cell: ({ row }) => (
          <p style={{ color: row.original.color }}>{row.original.name}</p>
        ),
        header: "Nombre",
        footer: (props) => props.column.id,
      },
      {
        id: "description",
        accessorFn: (row) => row.description,
        cell: (info) => info.getValue(),
        header: "Descripción",
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
            <Link
              to={`/configuracion/distribucion/categorias/update/${row.id}`}
            >
              <Edit2Icon size={15} />
            </Link>
            <Delete
              title={`Borrar ${row.name}`}
              message="Esta seguro que desea eliminar esta categoria"
              action={() => deleteCategoria(row.id)}
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
          Listado de Categorias
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
