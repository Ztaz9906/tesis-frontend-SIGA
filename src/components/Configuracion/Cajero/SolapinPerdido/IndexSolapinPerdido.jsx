import React, {useEffect} from "react";
import {SGTable} from "../../../auxiliar/table";
import {FilterIcon, PlusCircle, Trash} from "lucide-react";
import {Link} from "react-router-dom";
import {Tooltip} from "@mui/material";
import Delete from "@/components/auxiliar/delete.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {
	useDeleteSolapinPerdidoMutation,
	useGetSolapinPerdidosQuery
} from "@/components/Configuracion/Cajero/SolapinPerdido/service/solapin.perdido.service.js";
import FilterSolapinPerdido
	from "@/components/Configuracion/Cajero/SolapinPerdido/new-solapin-perdido/components/filters.jsx";
import {format, parseISO} from 'date-fns';
import {useSelector} from "react-redux";

export default function IndexSolapinPerdido() {
	const [currentFilters, setCurrentFilters] = React.useState({});
	const [active, setActive] = React.useState(true);
	const {data, refetch} = useGetSolapinPerdidosQuery(currentFilters, {
		refetchOnReconnect: true,
	});
	const user = useSelector((state) => state.user);
	useEffect(() => {
		refetch()
	}, [user, refetch]);
	const [
		deleteSolapinPerdido,
		{
			isError: isErrorD,
			isLoading: isLoadingD,
			isSuccess: isSuccessD,
			error: errorD,
		},
	] = useDeleteSolapinPerdidoMutation();
	useRedirectForm(
		isLoadingD,
		isSuccessD,
		isErrorD,
		errorD,
		"Persona con solapín perdido eliminada"
	);

	const datadef = {
		columns: [
			{
				id: "nombre_completo",
				accessorFn: (row) => row.id_persona.nombre_completo,
				cell: (info) => info.getValue(),
				header: "Nombre",
				footer: (props) => props.column.id,
			},
			{
				id: "ci",
				accessorFn: (row) => row.id_persona.ci,
				cell: (info) => info.getValue(),
				header: "Carnet de identidad",
				footer: (props) => props.column.id,
			},
			{
				id: "solapin",
				accessorFn: (row) => row.id_persona.solapin,
				cell: (info) => info.getValue(),
				header: "Solapín",
				footer: (props) => props.column.id,
			},
			{
				id: "codigo_solapin",
				accessorFn: (row) => row.id_persona.codigo_solapin,
				cell: (info) => info.getValue(),
				header: "Código",
				footer: (props) => props.column.id,
			},
			{
				id: "fecha_registro",
				accessorFn: (row) => {
					const date = parseISO(row.fecha_registro);
					return format(date, 'dd/MM/yy HH:mm:ss');
				},
				cell: (info) => info.getValue(),
				header: "Fecha de registro",
				footer: (props) => props.column.id,
			},
			{
				id: "Opciones",
				accessorFn: (row) => (
					<div className="flex gap-2 justify-center items-center">
						<Delete
							title={`Borrar ${row.id_persona.nombre_completo}`}
							message="¿Está seguro que desea eliminar este Solapín Perdido?"
							action={() => deleteSolapinPerdido(row.id_solapin_perdido)}
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
					Listado de personas con solapín perdido
				</h2>
				<div className="flex">
					<Tooltip
						title="Añadir solapín perdido"
					>
						<Link
							to={"/configuracion/cajero/solapin_perdido/create"}
							className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
						>
							<PlusCircle size={15}/>
						</Link>
					</Tooltip
					>
					<Tooltip
						placement="bottom"
						title="Filtro para los solapines perdidos"
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
				<FilterSolapinPerdido filter={setCurrentFilters}/>
			</div>
			<SGTable data={datadef}/>
		</div>
	);
}
