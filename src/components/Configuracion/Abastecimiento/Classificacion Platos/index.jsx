import React, {useEffect, useState} from "react";
import {SGTable} from "../../../auxiliar/table";
import {Edit2Icon, FilterIcon, PlusCircle, Trash} from "lucide-react";
import {Link} from "react-router-dom";
import {useDeleteClassPlatosMutation, useGetClassPlatosQuery,} from "./service/clasificacion.platos.service";
import {Button} from "../../../ui/button";
import Delete from "../../../auxiliar/delete";
import {useRedirectForm} from "../../../../hooks/useRedirectForm";
import GenericFilter from "../../../auxiliar/GenericFilter";
import {Tooltip} from "@mui/material";
import {useSelector} from "react-redux";

export default function IndexClassPlatos() {
	const [currentFilters, setCurrentFilters] = React.useState({});
	const [active, setActive] = useState(true);
	const {data, refetch} = useGetClassPlatosQuery(currentFilters, {
		refetchOnReconnect: true,
	});
	const user = useSelector((state) => state.user);

	useEffect(() => {
		refetch()
	}, [user, refetch]);
	const [
		deleteClassPlatos,
		{
			isError: isErrorD,
			isLoading: isLoadingD,
			isSuccess: isSuccessD,
			error: errorD,
		},
	] = useDeleteClassPlatosMutation();

	useRedirectForm(
		isLoadingD,
		isSuccessD,
		isErrorD,
		errorD,
		"Clasificación de platos eliminada"
	);

	const datadef = {
		columns: [
			{
				id: "nombre_clasificacion_plato",
				accessorFn: (row) => row.nombre_clasificacion_plato,
				cell: (info) => info.getValue(),
				header: "Nombre",
				footer: (props) => props.column.id,
			},
			{
				id: "descripcion_clasificacion_plato",
				accessorFn: (row) => row.descripcion_clasificacion_plato,
				cell: (info) => info.getValue(),
				header: "Descripción",
				footer: (props) => props.column.id,
			},
			{
				id: "activo",
				accessorFn: (row) => row.activo,
				cell: ({row}) => (row.original.activo === true ? "SI" : "NO"),
				header: "Activo",
				footer: (props) => props.column.id,
			},
			{
				id: "Opciones",
				accessorFn: (row) => (
					<div className="flex gap-2 justify-center items-center">
						<Link
							to={`/configuracion/abastecimiento/clasificacion_platos/update/${row.id_clasificacion_plato}`}
						>
							<Edit2Icon size={15}/>
						</Link>
						<Delete
							title={`Borrar ${row.nombre_clasificacion_plato}`}
							message="¿Está seguro que desea eliminar esta clasificación?"
							action={() => deleteClassPlatos(row.id_clasificacion_plato)}
						>
							<Button variant={"ghost"} size={"icon"}>
								<Trash size={15}/>
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
					Listado de clasificaciones de platos
				</h2>
				<div className="flex">
					<Link
						to={"/configuracion/abastecimiento/clasificacion_platos/create"}
						className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
					>
						<PlusCircle size={15}/>
					</Link>
					<Tooltip
						placement="bottom"
						title="Filtro para las clasificaciones de platos"
					>
						<Button
							variant={"ghost"}
							size={"icon"}
							onClick={() => setActive(!active)}
						>
							<FilterIcon size={16}/>
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
							name: "nombre_clasificacion_plato",
							label: "Nombre exacto",
							placeholder: "Sensible a mayúsculas y minúsculas",
						},
						{
							type: "select",
							name: "activo",
							label: "Activo",
							options: [
								{value: "", label: "--Activo--"},
								{value: "true", label: "Si"},
								{value: "false", label: "No"},
							],
						},
					]}
				/>
			</div>
			<SGTable data={datadef}/>
		</div>
	);
}
