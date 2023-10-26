import React from "react";
import {SGTable} from "../../../auxiliar/table";
import {Edit2Icon, PlusCircle, Trash} from "lucide-react";
import {Link} from "react-router-dom";
import {Button} from "../../../ui/button";
import Delete from "../../../auxiliar/delete";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {useDeleteInstitucionMutation, useGetInstitucionesQuery,} from "./service/institucion.service";

export default function IndexInstituciones() {
	const {data} = useGetInstitucionesQuery(undefined, {
		refetchOnReconnect: true,
	});

	const [
		deleteInstitucion,
		{
			isError: isErrorD,
			isLoading: isLoadingD,
			isSuccess: isSuccessD,
			error: errorD,
		},
	] = useDeleteInstitucionMutation();

	useRedirectForm(
		isLoadingD,
		isSuccessD,
		isErrorD,
		errorD,
		"Institución eliminada"
	);

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	};
	const datadef = {
		columns: [
			{
				id: "Nombre",
				accessorFn: (row) => row.name,
				cell: (info) => info.getValue(),
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
				id: "active_modules",
				accessorFn: (row) =>
					Array.isArray(row.active_modules)
						? row.active_modules.map(capitalizeFirstLetter).join(", ")
						: "",
				cell: (info) => info.getValue(),
				header: "Módulos",
				footer: (props) => props.column.id,
			},
			{
				id: "active",
				accessorFn: (row) => (row.active === true ? "SI" : "NO"),
				cell: (info) => info.getValue(),
				header: "Activo",
				footer: (props) => props.column.id,
			},
			{
				id: "Opciones",
				accessorFn: (row) => (
					<div className="flex gap-2 justify-center items-center">
						<Link to={`/configuracion/seguridad/institucion/update/${row.id}`}>
							<Edit2Icon size={15}/>
						</Link>
						<Delete
							title={`Borrar ${row.name}`}
							message="¿Está seguro que desea eliminar esta institución?"
							action={() => deleteInstitucion(row.id)}
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
					Instituciones
				</h2>
				<Link
					to={"/configuracion/seguridad/institucion/create"}
					className={`mx-5 `}
				>
					<PlusCircle size={15}/>
				</Link>
			</div>
			<SGTable data={datadef}/>
		</div>
	);
}
