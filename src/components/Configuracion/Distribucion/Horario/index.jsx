import React, {useState} from "react";
import {SGTable} from "../../../auxiliar/table";
import {Edit2Icon, FilterIcon, PlusCircle, Trash} from "lucide-react";
import {Link} from "react-router-dom";
import {useDeleteHorarioMutation, useGetHorariosQuery,} from "./service/horario.service";
import {Button} from "../../../ui/button";
import Delete from "../../../auxiliar/delete";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import GenericFilter from "@/components/auxiliar/GenericFilter.jsx";
import {Tooltip} from "@mui/material";

export default function IndexHorarios() {
	const [currentFilters, setCurrentFilters] = React.useState({});
	const [active, setActive] = useState(true);
	const {data} = useGetHorariosQuery(currentFilters, {
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
		"Horario eliminado"
	);


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
				header: "Hora de inicio",
				footer: (props) => props.column.id,
			},
			{
				id: "hora_fin",
				accessorFn: (row) => row.hora_fin,
				cell: (info) => info.getValue(),
				header: "Hora de fin",
				footer: (props) => props.column.id,
			},
			{
				id: "dias_semana",
				accessorFn: (row) =>
					Array.isArray(row.dias_semana)
						? row.dias_semana.map((day) => day.dia_semana).join(", ")
						: "",
				cell: (info) => info.getValue(),
				header: "Días",
				footer: (props) => props.column.id,
			},
			{
				id: "activo",
				accessorFn: (row) => row.active,
				cell: ({row}) => (row.original.activo === true ? "SI" : "NO"),
				header: "Activo",
				footer: (props) => props.column.id,
			},
			{
				id: "Opciones",
				accessorFn: (row) => (
					<div className="flex gap-2 justify-center items-center">
						<Link
							to={`/configuracion/distribucion/horario/update/${row.id_horario}`}
						>
							<Edit2Icon size={15}/>
						</Link>
						<Delete
							title={`Borrar ${row.name}`}
							message="¿Está seguro que desea eliminar este horario?"
							action={() => deleteHorario(row.id_horario)}
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
					Horarios
				</h2>
				<div className="flex">
					<Tooltip
						title="Crear"
					>
						<Link
							to={"/configuracion/distribucion/horario/create"}
							className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
						>
							<PlusCircle size={15}/>
						</Link>
					</Tooltip>
					<Tooltip
						placement="bottom"
						title="Filtro para los horarios"
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
							name: "nombre_horario",
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
