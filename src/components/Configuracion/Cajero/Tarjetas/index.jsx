import React, {useEffect} from "react";
import {SGTable} from "../../../auxiliar/table";
import {Edit2Icon, FileEditIcon, FilterIcon, PlusCircle, Trash, UserPlus2} from "lucide-react";
import {Link} from "react-router-dom";
import {useDeleteTarjetaMutation, useGetTarjetasQuery,} from "./service/tarjeta.service.js";
import {Button} from "../../../ui/button";
import Delete from "../../../auxiliar/delete";
import {useRedirectForm} from "../../../../hooks/useRedirectForm";
import {Tooltip} from "@mui/material";
import {useGetTipoTarjetasQuery} from "@/components/Configuracion/Cajero/TipoTarjetas/service/tipo.tarjeta.service.js";
import {useGetEstadoTarjetasQuery} from "@/components/Configuracion/Cajero/Tarjetas/service/estado.tarjeta.service.js";
import GenericFilter from "@/components/auxiliar/GenericFilter.jsx";
import {
	useGetAsociarTarjetasQuery
} from "@/components/Configuracion/Cajero/Tarjetas/service/persona.tarjeta.service.js";
import {useSelector} from "react-redux";

export default function IndexTarjeta() {
	const [currentFilters, setCurrentFilters] = React.useState({});
	const [active, setActive] = React.useState(true);
	const {data, refetch} = useGetTarjetasQuery(currentFilters, {
		refetchOnReconnect: true,
	});
	const {data: tarjetas_asociadas} = useGetAsociarTarjetasQuery(undefined, {
		refetchOnReconnect: true,
	});
	const user = useSelector((state) => state.user);
	useEffect(() => {
		refetch()
	}, [user, refetch]);
	const [filterID, setFilterID] = React.useState();

	useEffect(() => {
		setFilterID(tarjetas_asociadas?.map(res => res.id_tarjeta.id_tarjeta_alimentacion) || []);
	}, [tarjetas_asociadas]);
	const [
		deleteTarjeta,
		{
			isError: isErrorD,
			isLoading: isLoadingD,
			isSuccess: isSuccessD,
			error: errorD,
		},
	] = useDeleteTarjetaMutation();

	useRedirectForm(
		isLoadingD,
		isSuccessD,
		isErrorD,
		errorD,
		"Tarjeta eliminada"
	);

	const datadef = {
		columns: [
			{
				id: "numero_serie",
				accessorFn: (row) => row.numero_serie,
				cell: (info) => info.getValue(),
				header: "Número de serie",
				footer: (props) => props.column.id,
			},
			{
				id: "codigo",
				accessorFn: (row) => row.codigo,
				cell: (info) => info.getValue(),
				header: "Código",
				footer: (props) => props.column.id,
			},
			{
				id: "id_tipo_tarjeta",
				accessorFn: (row) => row.id_tipo_tarjeta.nombre_tipo_tarjeta,
				cell: (info) => info.getValue(),
				header: "Tipo de tarjeta",
				footer: (props) => props.column.id,
			},
			{
				id: "id_estado_tarjeta",
				accessorFn: (row) => row.id_estado_tarjeta.nombre_estado_tarjeta,
				cell: (info) => info.getValue(),
				header: "Estado",
				footer: (props) => props.column.id,
			},
			{
				id: "Opciones",
				accessorFn: (row) => (
					<div className="flex gap-2 justify-center items-center">
						<Tooltip title={'Editar'}>
							<Link
								to={`/configuracion/cajero/tarjeta/update/${row.id_tarjeta_alimentacion}`}
							>
								<Edit2Icon size={15}/>
							</Link>
						</Tooltip>
						<Tooltip title={'Editar estado'}>
							<Link
								to={`/configuracion/cajero/tarjeta/update-estado/${row.id_tarjeta_alimentacion}`}
							>
								<FileEditIcon size={15}/>
							</Link>
						</Tooltip>
						{!row.has_persona && (

							<Tooltip title={'Asociar tarjeta'}>
								<Link
									to={`/configuracion/cajero/tarjeta/asociar-persona/${row.id_tarjeta_alimentacion}`}
								>
									<UserPlus2 size={17}/>
								</Link>
							</Tooltip>
						)}

						<Delete
							title={`Borrar tarjeta con número de serie: ${row.numero_serie}`}
							message="¿Está seguro que desea eliminar esta tarjeta?"
							action={() => deleteTarjeta(row.id_tarjeta_alimentacion)}
						>
							<Tooltip title={'Eliminar'}>
								<Trash size={15}/>
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

	const {data: estado_tarjeta} = useGetEstadoTarjetasQuery(undefined, {
		refetchOnReconnect: true,
	});
	const {data: tipo_tarjeta} = useGetTipoTarjetasQuery(undefined, {
		refetchOnReconnect: true,
	});
	const estadoTarjetaOptions = estado_tarjeta?.map((tipo) => ({
		value: tipo.id_estado_tarjeta.toString(),
		label: tipo.nombre_estado_tarjeta,
	}));
	const tipoTarjetaOptions = tipo_tarjeta?.map((unidad) => ({
		value: unidad.id_tipo_tarjeta.toString(),
		label: unidad.nombre_tipo_tarjeta,
	}));

	return (
		<div className="flex flex-col gap-2">
			<div className="flex border-b border-gray-300 justify-between">
				<h2 className="text-gray-700 font-semibold text-lg justify-center al">
					Listado de tarjetas
				</h2>
				<div className="flex">
					<Tooltip
						placement="bottom"
						title="Crear tarjeta"
					>
						<Link
							to={"/configuracion/cajero/tarjeta/create"}
							className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
						>
							<PlusCircle size={15}/>
						</Link>
					</Tooltip>
					<Tooltip
						placement="bottom"
						title="Filtro para las tarjetas"
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
				{tipoTarjetaOptions && estadoTarjetaOptions ? (
					<GenericFilter
						onFilter={setCurrentFilters}
						fieldsConfig={[
							{
								type: "text",
								name: "numero_serie",
								label: "Número de serie",
								placeholder: "Sensible a mayúsculas y minúsculas",
							},
							{
								type: "text",
								name: "codigo",
								label: "Código",
								placeholder: "Sensible a mayúsculas y minúsculas",
							},
							{
								type: "select",
								name: "id_tipo_tarjeta",
								label: "Tipo de tarjeta",
								options: [
									{value: "", label: "--Todos--"},
									...tipoTarjetaOptions,
								],
							},
							{
								type: "select",
								name: "id_estado_tarjeta",
								label: "Estado",
								options: [
									{value: "", label: "--Todos--"},
									...estadoTarjetaOptions,
								],
							}
						]}
					/>
				) : null}

			</div>
			<SGTable data={datadef}/>
		</div>
	);
}
