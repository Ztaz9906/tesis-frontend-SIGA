import React, {useState} from "react";
import {SGTable} from "../../../auxiliar/table";
import {Edit2Icon, FilterIcon, PlusCircle, Trash} from "lucide-react";
import {Link} from "react-router-dom";
import {useDeleteEventoMutation, useGetEventosQuery} from "./service/evento.service.js";
import {Button} from "../../../ui/button";
import Delete from "../../../auxiliar/delete";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import GenericFilter from "../../../auxiliar/GenericFilter";
import {Tooltip} from "@mui/material";
import {
	useGetClasificacionEventosQuery
} from "@/components/Configuracion/Distribucion/Evento/service/calsificacion.evento.js";

export default function IndexEvento() {
	const [currentFilters, setCurrentFilters] = React.useState({});
	const [active, setActive] = useState(true);
	const {data} = useGetEventosQuery(currentFilters, {
		refetchOnReconnect: true,
	});
	const [
		deleteEvento,
		{
			isError: isErrorD,
			isLoading: isLoadingD,
			isSuccess: isSuccessD,
			error: errorD,
		},
	] = useDeleteEventoMutation();

	useRedirectForm(
		isLoadingD,
		isSuccessD,
		isErrorD,
		errorD,
		"Evento eliminado"
	);

	const {data: calsificacion_evento} = useGetClasificacionEventosQuery(undefined, {
		refetchOnReconnect: true,
	});
	const calsificacionEventoOptions = calsificacion_evento?.map((tipo) => ({
		value: tipo.id_clasificacion_evento.toString(),
		label: tipo.nombre_clasificacion_evento,
	}));
	const datadef = {
		columns: [
			{
				id: "nombre_evento",
				accessorFn: (row) => row.nombre_evento,
				cell: (info) => info.getValue(),
				header: "Nombre",
				footer: (props) => props.column.id,
			},
			{
				id: "id_clasificacion_evento",
				accessorFn: (row) => row.id_clasificacion_evento.nombre_clasificacion_evento,
				cell: (info) => info.getValue(),
				header: "Clasificación",
				footer: (props) => props.column.id,
			},
			{
				id: "evento_padre",
				accessorFn: (row) => row.evento_padre?.nombre_evento,
				cell: (info) => info.getValue(),
				header: "Evento padre",
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
						<Tooltip title={'Editar'}>
							<Link
								to={`/configuracion/distribucion/evento/update/${row.id_evento}`}
							>
								<Edit2Icon size={15}/>
							</Link>
						</Tooltip>
						<Delete
							title={`Borrar ${row.nombre_evento}`}
							message="¿Está seguro que desea eliminar este evento?"
							action={() => deleteEvento(row.id_evento)}
						>
							<Tooltip title={'Eliminar'}>
								<Button variant={"ghost"} size={"icon"}>
									<Trash size={15}/>
								</Button>
							</Tooltip>
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
					Listado de eventos
				</h2>
				<div className="flex">
					<Tooltip
						title="Crear"
					>
						<Link
							to={"/configuracion/distribucion/evento/create"}
							className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
						>
							<PlusCircle size={15}/>
						</Link>
					</Tooltip>
					<Tooltip
						title="Filtro para los eventos"
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
				{calsificacionEventoOptions && (
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
								name: "id_clasificacion_evento",
								label: "Clasificación de evento",
								options: [
									{value: "", label: "--Seleccione--"},
									...calsificacionEventoOptions,
								],
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
				)}
			</div>
			<SGTable data={datadef}/>
		</div>
	);
}
