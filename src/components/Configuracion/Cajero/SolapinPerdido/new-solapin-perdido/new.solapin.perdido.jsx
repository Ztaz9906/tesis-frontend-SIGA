import React, {useEffect} from "react";

import {FilterIcon, PlusCircle, Undo2} from "lucide-react";
import {Tooltip} from "@mui/material";
import Delete from "@/components/auxiliar/delete.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {
	useCreateSolapinPerdidoMutation,
	useGetSolapinPerdidosQuery
} from "@/components/Configuracion/Cajero/SolapinPerdido/service/solapin.perdido.service.js";
import {useSelector} from "react-redux";
import {SGTable} from "@/components/auxiliar/table.jsx";
import FilterUsuarios
	from "@/components/Configuracion/Cajero/SolapinPerdido/new-solapin-perdido/components/filters.usuarios.jsx";
import {useGetPersonaQuery} from "@/services/persona.service.js";
import {useNavigate} from "react-router-dom";


export default function AddSolapinPerdido() {
	const [currentFilters, setCurrentFilters] = React.useState({});
	const [active, setActive] = React.useState(true);

	const {data, refetch} = useGetPersonaQuery(currentFilters, {
		refetchOnReconnect: true,
	});
	const {data: solapin_perdido} = useGetSolapinPerdidosQuery(undefined, {
		refetchOnReconnect: true,
	});
	const PersonasasociadasIds = solapin_perdido?.map(res => res.id_persona.id);
	const filteredData = data?.filter(persona =>
		!PersonasasociadasIds?.includes(persona.id)
	) || [];
	const navigate = useNavigate();

	const user = useSelector((state) => state.user);
	useEffect(() => {
		refetch()
	}, [user, refetch]);
	const [
		CreateSolapinPerdido,
		{
			isError: isErrorC,
			isLoading: isLoadingC,
			isSuccess: isSuccessC,
			error: errorC,
		},
	] = useCreateSolapinPerdidoMutation();
	useRedirectForm(
		isLoadingC,
		isSuccessC,
		isErrorC,
		errorC,
		"Persona con solapín perdido añadida",
		'/configuracion/cajero/solapin-perdidos'
	);

	function handleSubmit(id_persona) {
		const newValues = {
			"id_institucion": user?.institucion.id,
			"id_persona": id_persona,
			"id_usuario_registro": user.id
		};
		CreateSolapinPerdido(newValues)
	}


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
				id: "solapin",
				accessorFn: (row) => row.solapin,
				cell: (info) => info.getValue(),
				header: "Solapín",
				footer: (props) => props.column.id,
			},
			{
				id: "codigo_solapin",
				accessorFn: (row) => row.codigo_solapin,
				cell: (info) => info.getValue(),
				header: "Código",
				footer: (props) => props.column.id,
			},
			{
				id: "Opciones",
				accessorFn: (row) => (
					<div className="flex gap-2 justify-center items-center">
						<Delete
							title={`Registrar solapín perdido de ${row.nombre_completo}`}
							message={`¿Está seguro que desea registrar este Solapín Perdido? ${row.solapin}`}
							action={() => handleSubmit(row.id)}
						>
							<Tooltip title={'Registrar solapín perdido'}>
								<Button variant={"ghost"} size={"icon"}
								>
									<PlusCircle size={15}/>
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
		rows: filteredData ?? []
	};

	return (
		<div className="flex flex-col gap-2">
			<div className="flex border-b border-gray-300 justify-between">
				<h2 className="text-gray-700 font-semibold text-lg justify-center al">
					Listado de personas
				</h2>
				<div className="flex">
					<Tooltip
						placement="bottom"
						title="Filtro para las personas"
					>
						<Button
							variant={"ghost"}
							size={"icon"}
							onClick={() => setActive(!active)}
						>
							<FilterIcon size={16}/>
						</Button>
					</Tooltip>
					<Tooltip title={'Atrás'}>
						<Button variant={'ghost'} size={'icon'} onClick={() => {
							navigate('/configuracion/cajero/solapin-perdidos')
						}}>
							<Undo2 size={16}/>
						</Button>
					</Tooltip>
				</div>
			</div>
			<div className={`p-3 shadow-md ${active && "hidden"}`}>
				<FilterUsuarios filter={setCurrentFilters}/>
			</div>
			<SGTable data={datadef}/>
		</div>
	);
}
