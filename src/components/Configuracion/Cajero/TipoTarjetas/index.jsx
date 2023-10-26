import React, {useEffect} from "react";
import {SGTable} from "../../../auxiliar/table";
import {Edit2Icon, FilterIcon, PlusCircle, Trash} from "lucide-react";
import {Link} from "react-router-dom";
import {useDeleteTipoTarjetaMutation, useGetTipoTarjetasQuery,} from "./service/tipo.tarjeta.service";
import {Button} from "../../../ui/button";
import Delete from "../../../auxiliar/delete";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {Tooltip} from "@mui/material";
import GenericFilter from "../../../auxiliar/GenericFilter";
import {useSelector} from "react-redux";

export default function IndexTipoTarjeta() {
	const [currentFilters, setCurrentFilters] = React.useState({});
	const [active, setActive] = React.useState(true);
	const {data, refetch} = useGetTipoTarjetasQuery(currentFilters, {
		refetchOnReconnect: true,
	});
	const user = useSelector((state) => state.user);
	useEffect(() => {
		refetch()
	}, [user, refetch]);
	const [
		deleteTipoTarjeta,
		{
			isError: isErrorD,
			isLoading: isLoadingD,
			isSuccess: isSuccessD,
			error: errorD,
		},
	] = useDeleteTipoTarjetaMutation();

	useRedirectForm(
		isLoadingD,
		isSuccessD,
		isErrorD,
		errorD,
		"Tipo de tarjeta eliminada"
	);

	const datadef = {
		columns: [
			{
				id: "nombre_tipo_tarjeta",
				accessorFn: (row) => row.nombre_tipo_tarjeta,
				cell: (info) => info.getValue(),
				header: "Nombre",
				footer: (props) => props.column.id,
			},
			{
				id: "descripcion",
				accessorFn: (row) => row.descripcion,
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
							to={`/configuracion/cajero/tipo_tarjeta/update/${row.id_tipo_tarjeta}`}
						>
							<Edit2Icon size={15}/>
						</Link>
						<Delete
							title={`Borrar ${row.nombre_tipo_tarjeta}`}
							message="¿Está seguro que desea eliminar este tipo de tarjeta?"
							action={() => deleteTipoTarjeta(row.id_tipo_tarjeta)}
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
					Listado de tipos de tarjetas
				</h2>
				<div className="flex">
					<Link
						to={"/configuracion/cajero/tipo_tarjeta/create"}
						className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
					>
						<PlusCircle size={15}/>
					</Link>
					<Tooltip
						placement="bottom"
						title="Filtro para los tipos de tarjetas"
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
							name: "nombre_tipo_tarjeta",
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
