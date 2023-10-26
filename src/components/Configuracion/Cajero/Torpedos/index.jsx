import React, {useEffect} from "react";
import {SGTable} from "../../../auxiliar/table";
import {Edit2Icon, FilterIcon, PlusCircle, Trash} from "lucide-react";
import {Link} from "react-router-dom";
import {Tooltip} from "@mui/material";
import Delete from "@/components/auxiliar/delete.jsx";
import {Button} from "@/components/ui/button.jsx";
import {
	useDeleteTorpedoMutation,
	useGetTorpedosQuery
} from "@/components/Configuracion/Cajero/Torpedos/service/torpedo.service.js";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import FilterTorpedo from "@/components/Configuracion/Cajero/Torpedos/new-asgnatura/components/filter.jsx";
import {useSelector} from "react-redux";


export default function IndexTorpedo() {
	const [currentFilters, setCurrentFilters] = React.useState({});
	const [active, setActive] = React.useState(true);
	const {data, refetch} = useGetTorpedosQuery(currentFilters, {
		refetchOnReconnect: true,
	});
	const user = useSelector((state) => state.user);
	useEffect(() => {
		refetch()
	}, [user, refetch]);
	const [
		deleteTorpedo,
		{
			isError: isErrorD,
			isLoading: isLoadingD,
			isSuccess: isSuccessD,
			error: errorD,
		},
	] = useDeleteTorpedoMutation();
	useRedirectForm(
		isLoadingD,
		isSuccessD,
		isErrorD,
		errorD,
		"Torpedo eliminado"
	);

	const datadef = {
		columns: [
			{
				id: "nombre_completo",
				accessorFn: (row) => row.nombre_completo,
				cell: (info) => info.getValue(),
				header: "Nombre",
				footer: (props) => props.column.id,
			},
			{
				id: "ci",
				accessorFn: (row) => row.ci,
				cell: (info) => info.getValue(),
				header: "Carnet de identidad",
				footer: (props) => props.column.id,
			},
			{
				id: "id_pais",
				accessorFn: (row) => row.id_pais?.nombre_pais,
				cell: (info) => info.getValue(),
				header: "País",
				footer: (props) => props.column.id,
			},
			{
				id: "id_provincia",
				accessorFn: (row) => row.id_provincia?.nombre_provincia,
				cell: (info) => info.getValue(),
				header: "Provincia",
				footer: (props) => props.column.id,
			},
			{
				id: "id_municipio.nombre_municipio",
				accessorFn: (row) => row.id_municipio?.nombre_municipio,
				cell: (info) => info.getValue(),
				header: "Municipio",
				footer: (props) => props.column.id,
			},
			{
				id: "id_sexo",
				accessorFn: (row) => row.id_sexo?.nombre_sexo,
				cell: (info) => info.getValue(),
				header: "Sexo",
				footer: (props) => props.column.id,
			},
			{
				id: "Opciones",
				accessorFn: (row) => (
					<div className="flex gap-2 justify-center items-center">
						<Tooltip title={'Editar'}>
							<Link
								to={`/configuracion/cajero/torpedo/update/${row.id_persona_torpedo}`}
							>
								<Edit2Icon size={15}/>
							</Link>
						</Tooltip>
						<Delete
							title={`Borrar ${row.nombre_completo}`}
							message="¿Está seguro que desea eliminar este Torpedo?"
							action={() => deleteTorpedo(row.id_persona_torpedo)}
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
		rows: data ?? []
	};

	return (
		<div className="flex flex-col gap-2">
			<div className="flex border-b border-gray-300 justify-between">
				<h2 className="text-gray-700 font-semibold text-lg justify-center al">
					Listado de torpedos
				</h2>
				<div className="flex">
					<Tooltip
						title="Crear torpedo"
					>
						<Link
							to={"/configuracion/cajero/torpedo/create"}
							className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
						>
							<PlusCircle size={15}/>
						</Link>
					</Tooltip
					>
					<Tooltip
						placement="bottom"
						title="Filtro para los torpedos"
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
				<FilterTorpedo filter={setCurrentFilters}/>
			</div>
			<SGTable data={datadef}/>
		</div>
	);
}
