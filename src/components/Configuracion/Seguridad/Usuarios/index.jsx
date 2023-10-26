import React, {useEffect} from "react";
import {SGTable} from "../../../auxiliar/table";
import {Edit2Icon, PlusCircle, Trash} from "lucide-react";
import {Link} from "react-router-dom";
import {Button} from "../../../ui/button";
import Delete from "../../../auxiliar/delete";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {
	useDeleteUsuarioMutation,
	useGetUsuariosQuery
} from "@/components/Configuracion/Seguridad/Usuarios/service/usuario.service.js";
import {useSelector} from "react-redux";

export default function IndexUsuarioes() {
	const {data, refetch} = useGetUsuariosQuery(undefined, {
		refetchOnReconnect: true,
	});

	const user = useSelector((state) => state.user);
	useEffect(() => {
		refetch()
	}, [user, refetch]);


	const [
		deleteUsuario,
		{
			isError: isErrorD,
			isLoading: isLoadingD,
			isSuccess: isSuccessD,
			error: errorD,
		},
	] = useDeleteUsuarioMutation();

	useRedirectForm(
		isLoadingD,
		isSuccessD,
		isErrorD,
		errorD,
		"Usuario eliminado"
	);
	const datadef = {
		columns: [
			{
				id: "username",
				accessorFn: (row) => row.username,
				cell: (info) => info.getValue(),
				header: "Usuario",
				footer: (props) => props.column.id,
			},
			{
				id: "rol",
				accessorFn: (row) => Array.isArray(row.groups)
					? row.groups.map((rol) => rol.name).join(", ")
					: "",
				cell: (info) => info.getValue(),
				header: "Descripción",
				footer: (props) => props.column.id,
			},
			{
				id: "Opciones",
				accessorFn: (row) => (
					<div className="flex gap-2 justify-center items-center">
						<Link to={`/configuracion/seguridad/usuario/update/${row.id}`}>
							<Edit2Icon size={15}/>
						</Link>
						<Delete
							title={`Borrar ${row.name}`}
							message="¿Está seguro que desea eliminar este usuario?"
							action={() => deleteUsuario(row.id)}
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
					Usuarios
				</h2>
				<Link
					to={"/configuracion/seguridad/usuario/create"}
					className={`mx-5 `}
				>
					<PlusCircle size={15}/>
				</Link>
			</div>
			<SGTable data={datadef}/>
		</div>
	);
}
