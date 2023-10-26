import React, {useEffect, useState} from "react";

import {FilterIcon, PlusCircle, Undo2} from "lucide-react";
import {CircularProgress, Tooltip} from "@mui/material";
import {Button} from "@/components/ui/button.jsx";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {SGTable} from "@/components/auxiliar/table.jsx";
import FilterUsuarios
	from "@/components/Configuracion/Cajero/SolapinPerdido/new-solapin-perdido/components/filters.usuarios.jsx";
import {useEditPersonaMutation, useGetPersonaQuery} from "@/services/persona.service.js";
import {useNavigate, useParams} from "react-router-dom";
import {
	useLazyGetConfiguracionComensalesByIdQuery
} from "@/components/Configuracion/Configuracion/ConfiguracionComensales/service/configuracion.comensales.service.js";


export default function AddComensal() {
	const {id} = useParams()
	const [currentFilters, setCurrentFilters] = React.useState({});
	const [active, setActive] = React.useState(true);
	const [configuracion, setConfiguracion] = useState({});
	const [processingId, setProcessingId] = useState(null);
	const navigate = useNavigate();
	const {data} = useGetPersonaQuery({id_configuracion_comensal: id, exclude: true, ...currentFilters}, {
		refetchOnReconnect: true,
	});
	const [getConfiguracionComensalesById, {data: configuraciondata}] = useLazyGetConfiguracionComensalesByIdQuery()


	useEffect(() => {
		getConfiguracionComensalesById(id)
			.unwrap()
			.then((res) => {
				setConfiguracion(res);
				if (res.activo === false) {
					navigate(`/configuracion/configuracion/configuracion-comensales`)
				}
			});
	}, [id]);
	const [
		EditPersona,
		{
			isError: isErrorC,
			isLoading: isLoadingC,
			isSuccess: isSuccessC,
			error: errorC,
		},
	] = useEditPersonaMutation();
	useRedirectForm(
		isLoadingC,
		isSuccessC,
		isErrorC,
		errorC,
		"Comensal asignado",
	);

	function handleSubmit(id_persona) {
		setProcessingId(id_persona);
		const newValues = {
			id_configuracion_comensal: id,
		};
		EditPersona({id: id_persona, ...newValues})
			.then(() => {
				setProcessingId(null);
			});
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
				id: "id_responsabilidad",
				accessorFn: (row) => row.id_responsabilidad?.nombre_responsabilidad,
				cell: (info) => info.getValue(),
				header: "Cargo",
				footer: (props) => props.column.id,
			},
			{
				id: "id_estructura",
				accessorFn: (row) => row.id_estructura?.nombre_estructura,
				cell: (info) => info.getValue(),
				header: "Área",
				footer: (props) => props.column.id,
			},
			{
				id: "Opciones",
				accessorFn: (row) => (
					<div className="flex gap-2 justify-center items-center">
						<Tooltip title={'Asignar comensal'}>
							<Button onClick={() => handleSubmit(row.id)} variant={"ghost"} size={"icon"}
							>
								{processingId === row.id ? <CircularProgress size={16} color="success"/> :
									<PlusCircle size={15}/>}

							</Button>
						</Tooltip>
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
							navigate('/configuracion/configuracion/configuracion-comensales')
						}}>
							<Undo2 size={16}/>
						</Button>
					</Tooltip>
				</div>
			</div>

			{configuracion && (
				<div className="flex-col flex-wrap justify-center">
					<h2 className="text-gray-600 font-semibold text-sm justify-center al">
						Datos de la configuración
					</h2>
					<div className="flex gap-4 text-center items-center text-sm text-gray-500">
						<p className="font-semibold">
							<span className="font-bold">Fecha:</span> {configuracion.fecha_registro}
						</p>
						<p className="font-semibold">
							<span className="font-bold">Descripción:</span> {configuracion.descripcion}
						</p>
						<p className="font-semibold">
							<span className="font-bold">Activo: </span>
							{configuracion.activo ? 'SI' : "NO"}
						</p>
					</div>
				</div>
			)}
			<div className={`p-3 shadow-md ${active && "hidden"}`}>
				<FilterUsuarios filter={setCurrentFilters}/>
			</div>
			<SGTable data={datadef}/>
		</div>
	);
}
