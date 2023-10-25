import React from "react";
import { SGTable } from "../../../auxiliar/table";
import { Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { useDeleteUMMutation, useGetUMQuery } from "./service/um.service";
import { Edit2Icon } from "lucide-react";
import { Button } from "../../../ui/button";
import Delete from "../../../auxiliar/delete";
import { useRedirectForm } from "../../../../hooks/useRedirectForm";
import { FilterIcon } from "lucide-react";
import { useState } from "react";
import { Tooltip } from "@mui/material";
import GenericFilter from "../../../auxiliar/GenericFilter";

export default function IndexUM() {
  const [currentFilters, setCurrentFilters] = React.useState({});
  const [active, setActive] = useState(true);
  const { data } = useGetUMQuery(currentFilters, {
    refetchOnReconnect: true,
  });
  const [
    deleteUM,
    {
      isError: isErrorD,
      isLoading: isLoadingD,
      isSuccess: isSuccessD,
      error: errorD,
    },
  ] = useDeleteUMMutation();

  useRedirectForm(
    isLoadingD,
    isSuccessD,
    isErrorD,
    errorD,
    "Unidad de medida eliminada"
  );
  const datadef = {
    columns: [
      {
        id: "nombre_unidad_medida",
        accessorFn: (row) => row.nombre_unidad_medida,
        cell: (info) => info.getValue(),
        header: "Nombre",
        footer: (props) => props.column.id,
      },
      {
        id: "siglas",
        accessorFn: (row) => row.siglas,
        cell: (info) => info.getValue(),
        header: "Siglas",
        footer: (props) => props.column.id,
      },
      {
        id: "clasificacion",
        accessorFn: (row) => row.clasificacion,
        cell: (info) => info.getValue(),
        header: "Clasificación",
        footer: (props) => props.column.id,
      },
      {
        id: "descripcion_unidad_medida",
        accessorFn: (row) => row.descripcion_unidad_medida,
        cell: (info) => info.getValue(),
        header: "Descripción",
        footer: (props) => props.column.id,
      },
      {
        id: "activo",
        accessorFn: (row) => row.activo,
        cell: ({ row }) => (row.original.activo === true ? "SI" : "NO"),
        header: "Activo",
        footer: (props) => props.column.id,
      },
      {
        id: "Opciones",
        accessorFn: (row) => (
          <div className="flex gap-2 justify-center items-center">
            <Link
              to={`/configuracion/abastecimiento/unidad_medida/update/${row.id_unidad_medida}`}
            >
              <Edit2Icon size={15} />
            </Link>
            <Delete
              title={`Borrar ${row.name}`}
              message="¿Está seguro que desea eliminar esta UM?"
              action={() => deleteUM(row.id_unidad_medida)}
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
          Listado de unidades de medidas
        </h2>
        <div className="flex">
          <Link
            to={"/configuracion/abastecimiento/unidad_medida/create"}
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
          >
            <PlusCircle size={15} />
          </Link>
          <Tooltip
            placement="bottom"
            title="Filtro para las unidades de medidas"
          >
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => setActive(!active)}
            >
              <FilterIcon size={16} />
            </Button>
          </Tooltip>
        </div>
      </div>

      <div className={`p-3 shadow-md ${active && "hidden"}`}>
        <GenericFilter
          onFilter={setCurrentFilters}
          fieldsConfig={[
            {
              type: "text",
              name: "nombre_unidad_medida",
              label: "Nombre exacto",
              placeholder: "Sensible a mayúsculas y minúsculas",
            },
            {
              type: "select",
              name: "clasificacion",
              label: "Clasificación",
              options: [
                { value: "", label: "--Seleccione Clasificación--" },
                { value: "masa", label: "Masa" },
                { value: "volumen", label: "Volumen" },
              ],
            },
            {
              type: "select",
              name: "activo",
              label: "Activo",
              options: [
                { value: "", label: "--Activo--" },
                { value: "true", label: "Si" },
                { value: "false", label: "No" },
              ],
            },
          ]}
        />
      </div>

      <SGTable data={datadef} />
    </div>
  );
}
