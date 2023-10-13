import React from "react";

import {FilterIcon, PlusCircle} from "lucide-react";
import {Tooltip} from "@mui/material";
import Delete from "@/components/auxiliar/delete.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {
	useCreateSolapinPerdidoMutation
} from "@/components/Configuracion/Cajero/SolapinPerdido/service/solapin.perdido.service.js";
import useUser from "@/hooks/useUser.jsx";
import {SGTable} from "@/components/auxiliar/table.jsx";
import FilterUsuarios
	from "@/components/Configuracion/Cajero/SolapinPerdido/new-solapin-perdido/components/filters.usuarios.jsx";
import {useGetPersonaQuery} from "@/services/persona.service.js";


export default function AddSolapinPerdido() {
	const [currentFilters, setCurrentFilters] = React.useState({});
	const [active, setActive] = React.useState(true);

	const {data} = useGetPersonaQuery(currentFilters, {
		refetchOnReconnect: true,
	});

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
		"Persona con solapin perdido añadida",
		'/configuracion/cajero/solapin-perdidos'
	);
	const [user] = useUser();

	function handleSubmit(id_persona) {
		const newValues = {
			"id_institucion": user?.institucion.id,
			"id_persona": id_persona,
			"id_usuario_registro": user.id
		};
		CreateSolapinPerdido(newValues)
	}

	console.log(data)
	const datadef = {
		columns: [
			{
				id: "nombre_completo",
				accessorFn: (row) => row.nombre_completo,
				cell: (info) => info.getValue(),
				header: "nombre",
				footer: (props) => props.column.id,
			},
			{
				id: "solapin",
				accessorFn: (row) => row.solapin,
				cell: (info) => info.getValue(),
				header: "Solapin",
				footer: (props) => props.column.id,
			},
			{
				id: "codigo_solapin",
				accessorFn: (row) => row.codigo_solapin,
				cell: (info) => info.getValue(),
				header: "Codigo de Barras",
				footer: (props) => props.column.id,
			},
			{
				id: "Opciones",
				accessorFn: (row) => (
					<div className="flex gap-2 justify-center items-center">
						<Delete
							title={`Registrar solapin perdido de ${row.nombre_completo}`}
							message={`Esta seguro que desea registrar este Solapin Perdido? ${row.solapin}`}
							action={() => handleSubmit(row.id)}
						>
							<Tooltip title={'Registrar solapin perdido'}>
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
		rows: data ?? []
	};

	return (
		<div className="flex flex-col gap-2">
			<div className="flex border-b border-gray-300 justify-between">
				<h2 className="text-gray-700 font-semibold text-lg justify-center al">
					Listado de Personas
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
				</div>
			</div>
			<div className={`p-3 shadow-md ${active && "hidden"}`}>
				<FilterUsuarios filter={setCurrentFilters}/>
			</div>
			<SGTable data={datadef}/>
		</div>
	);
}
