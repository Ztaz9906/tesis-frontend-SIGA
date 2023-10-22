import React from "react";
import {SGTable} from "../../../auxiliar/table";
import {FilterIcon, List, UserPlus2, Users2} from "lucide-react";
import {Link} from "react-router-dom";
import {Button} from "../../../ui/button";
import {Tooltip} from "@mui/material";
import GenericFilter from "../../../auxiliar/GenericFilter";
import {useGetTipoAreasQuery} from "@/components/Configuracion/Configuracion/TipoAreas/service/tipo.areas.service.js";
import {useGetAreasQuery} from "@/components/Configuracion/Configuracion/Areas/service/areas.service.js";
import {
	useGetResponsableReservacionesQuery
} from "@/components/Configuracion/Reservacion/AsignarResponsables/service/responsable.reservacion.service.js";
import {
	useGetAsociarPersonasQuery
} from "@/components/Configuracion/Reservacion/AsignarResponsables/service/areas.personas.reservacion.service.js";

export default function IndexAsignarResponsablesReservacion() {
	const [currentFilters, setCurrentFilters] = React.useState({});
	const [active, setActive] = React.useState(true);
	const [responsablesIds, setResponsablesIds] = React.useState(new Set());
	const [asociadosIds, setAsociadosIds] = React.useState(new Set());

	const {data} = useGetAreasQuery(currentFilters, {
		refetchOnReconnect: true,
	});

	const {data: tipo_areas} = useGetTipoAreasQuery(undefined, {
		refetchOnReconnect: true,
	});
	const tiposAreasOptions = tipo_areas?.map((tipo) => ({
		value: tipo.id_tipo_estructura.toString(),
		label: tipo.nombre_tipo_estructura,
	}));

	function getDataAsociados(id) {
		const {data: asociados, isLoading: isLoadingA} = useGetAsociarPersonasQuery(undefined, {
			refetchOnReconnect: true,
		});
		setAsociadosIds(new Set(asociados?.map(aso => aso.id_estructura.id_estructura) || []));


		return asociadosIds.has(id)
	}

	function getDataResponsables(id) {
		const {data: responsables, isLoading: isLoadingR} = useGetResponsableReservacionesQuery(undefined, {
			refetchOnReconnect: true,
		});
		setResponsablesIds(new Set(responsables?.map(res => res.id_estructura.id_estructura) || []));

		return responsablesIds.has(id)
	}

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
				id: "id_tipo_estructura",
				accessorFn: (row) => row.id_tipo_estructura.nombre_tipo_estructura,
				cell: (info) => info.getValue(),
				header: "Tipo de Área",
				footer: (props) => props.column.id,
			},
			{
				id: "tiene_responsables_reservacion",
				accessorFn: (row) => row.tiene_responsables_reservacion,
				cell: (info) => info.getValue() ? "SI" : "NO",
				header: "Tiene responsables",
				footer: (props) => props.column.id,
			},
			{
				id: "tiene_responsables_area",
				accessorFn: (row) => row.tiene_responsables_area,
				cell: (info) => info.getValue() ? "SI" : "NO",
				header: "Tiene personas asociadas",
				footer: (props) => props.column.id,
			},
			{
				id: "Opciones",
				accessorFn: (row) => (
					<div className="flex gap-2 justify-center items-center">
						<Tooltip title={'Detalles'}>
							<Link
								to={`/configuracion/reservacion/responsable-areas/details/${row.id_estructura}`}
							>
								<List size={15}/>
							</Link>
						</Tooltip>
						<Tooltip title={'Asignar responsable de area'}>
							<Link
								to={`/configuracion/reservacion/responsable-areas/asignar-responsable/${row.id_estructura}`}
							>
								<UserPlus2 size={15}/>
							</Link>
						</Tooltip>
						{row.tiene_responsables_reservacion ? (
							<Tooltip title={'Asignar personas'}>
								<Link
									to={`/configuracion/reservacion/responsable-areas/asociar-personas/${row.id_estructura}`}
								>
									<Users2 size={15}/>
								</Link>
							</Tooltip>
						) : ''}
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
					Listado de Áreas
				</h2>
				<div className="flex">
					<Tooltip
						placement="bottom"
						title="Filtro para las areas"
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
								type: "select",
								name: "id_tipo_estructura",
								label: "Tipo de Área",
								options: [
									{value: "", label: "--Activo--"},
									...tiposAreasOptions
								],
							},
							{
								type: "select",
								name: "tiene_responsables_reservacion",
								label: "Tiene responsables",
								options: [
									{value: "", label: "--Seleccione--"},
									{value: "true", label: "Si"},
									{value: "false", label: "No"},
								],
							},
							{
								type: "select",
								name: "tiene_responsables_area",
								label: "Tiene personas asociadas",
								options: [
									{value: "", label: "--Seleccione--"},
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
