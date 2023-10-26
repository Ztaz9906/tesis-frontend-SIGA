import React, {useEffect, useState} from "react";
import {SGTable} from "../../../auxiliar/table";
import {Edit2Icon, FilterIcon, PlusCircle, Trash} from "lucide-react";
import {Link} from "react-router-dom";
import {useDeleteCategoriaMutation, useGetCategoriasQuery,} from "./service/categoria.service";
import {Button} from "../../../ui/button";
import Delete from "../../../auxiliar/delete";
import {useRedirectForm} from "../../../../hooks/useRedirectForm";
import {Tooltip} from "@mui/material";
import GenericFilter from "@/components/auxiliar/GenericFilter.jsx";
import {useSelector} from "react-redux";

export default function Index() {
	const [currentFilters, setCurrentFilters] = React.useState({});
	const [active, setActive] = useState(true);
	const {data, refetch} = useGetCategoriasQuery(currentFilters, {
		refetchOnReconnect: true,
	});
	const user = useSelector((state) => state.user);
	useEffect(() => {
		refetch()
	}, [user, refetch]);
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
		"Categoría eliminada"
	);
	const datadef = {
		columns: [
			{
				id: "name",
				accessorFn: (row) => row.name,
				cell: ({row}) => (
					<p style={{color: row.original.color}}>{row.original.name}</p>
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
				cell: ({row}) => (row.original.active === true ? "SI" : "NO"),
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
							<Edit2Icon size={15}/>
						</Link>
						<Delete
							title={`Borrar ${row.name}`}
							message="¿Está seguro que desea eliminar esta categoría?"
							action={() => deleteCategoria(row.id)}
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
					Listado de categorías
				</h2>
				<div className="flex">
					<Link
						to={"/configuracion/distribucion/categorias/create"}
						className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
					>
						<PlusCircle size={15}/>
					</Link>
					<Tooltip
						placement="bottom"
						title="Filtro para las categorías"
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
							name: "name",
							label: "Nombre exacto",
							placeholder: "Sensible a mayúsculas y minúsculas",
						},
						{
							type: "select",
							name: "active",
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
