import React from "react";
import {SGTable} from "../../../auxiliar/table";
import {Edit2Icon, FilterIcon, PlusCircle, Trash} from "lucide-react";
import {Link} from "react-router-dom";
import {useDeleteAreaMutation, useGetAreasQuery} from "./service/areas.service.js";
import {Button} from "../../../ui/button";
import Delete from "../../../auxiliar/delete";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {Tooltip} from "@mui/material";
import GenericFilter from "../../../auxiliar/GenericFilter";
import {useGetTipoAreasQuery} from "@/components/Configuracion/Configuracion/TipoAreas/service/tipo.areas.service.js";

export default function IndexAreas() {

	const [currentFilters, setCurrentFilters] = React.useState({});
	const [active, setActive] = React.useState(true);
	const {data} = useGetAreasQuery(currentFilters, {
		refetchOnReconnect: true,
	});
	const [
		deleteTipoEstrutura,
		{
			isError: isErrorD,
			isLoading: isLoadingD,
			isSuccess: isSuccessD,
			error: errorD,
		},
	] = useDeleteAreaMutation();

	useRedirectForm(
		isLoadingD,
		isSuccessD,
		isErrorD,
		errorD,
		"Area Eliminada"
	);
	const {data: tipo_areas} = useGetTipoAreasQuery(undefined, {
		refetchOnReconnect: true,
	});
	const tiposAreasOptions = tipo_areas?.map((tipo) => ({
		value: tipo.id_tipo_estructura.toString(),
		label: tipo.nombre_tipo_estructura,
	}));

	const datadef = {
		columns: [
			{
				id: "nombre_estructura",
				accessorFn: (row) => row.nombre_estructura,
				cell: (info) => info.getValue(),
				header: "Nombre",
				footer: (props) => props.column.id,
			},
			{
				id: "codigo_externo",
				accessorFn: (row) => row.codigo_externo,
				cell: (info) => info.getValue(),
				header: "Codigo Externo",
				footer: (props) => props.column.id,
			},
			{
				id: "codigo_area",
				accessorFn: (row) => row.codigo_area,
				cell: (info) => info.getValue(),
				header: "Codigo de Area",
				footer: (props) => props.column.id,
			},
			{
				id: "id_tipo_estructura",
				accessorFn: (row) => row.id_tipo_estructura.nombre_tipo_estructura,
				cell: (info) => info.getValue(),
				header: "Tipo de Area",
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
							to={`/configuracion/configuracion/area/update/${row.id_estructura}`}
						>
							<Edit2Icon size={15}/>
						</Link>
						<Delete
							title={`Borrar ${row.nombre_tipo_tarjeta}`}
							message="Esta seguro que desea eliminar esta TipoEstrutura"
							action={() => deleteTipoEstrutura(row.id_estructura)}
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
					Listado de Areas
				</h2>
				<div className="flex">
					<Link
						to={"/configuracion/configuracion/area/create"}
						className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
					>
						<PlusCircle size={15}/>
					</Link>
					<Tooltip
						placement="bottom"
						title="Filtro para las los tipos de areas"
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
				{tiposAreasOptions && (

					<GenericFilter
						onFilter={setCurrentFilters}
						fieldsConfig={[
							{
								type: "text",
								name: "nombre_estructura",
								label: "Nombre exacto",
								placeholder: "Sensible a mayusculas y minusculas",
							},
							{
								type: "text",
								name: "codigo_area",
								label: "Nombre exacto",
								placeholder: "Sensible a mayusculas y minusculas",
							},
							{
								type: "text",
								name: "codigo_externo",
								label: "Nombre exacto",
								placeholder: "Sensible a mayusculas y minusculas",
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
							{
								type: "select",
								name: "id_tipo_estructura",
								label: "Tipo de Estructura",
								options: [
									{value: "", label: "--Activo--"},
									...tiposAreasOptions
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
