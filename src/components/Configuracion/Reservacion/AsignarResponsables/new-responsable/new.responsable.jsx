import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {FilterIcon, PlusCircle, Trash, Undo2} from "lucide-react";
import {CircularProgress, Tooltip} from "@mui/material";
import {Button} from "@/components/ui/button.jsx";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {SGTable} from "@/components/auxiliar/table.jsx";
import FilterUsuarios
	from "@/components/Configuracion/Cajero/SolapinPerdido/new-solapin-perdido/components/filters.usuarios.jsx";
import {useGetPersonaQuery} from "@/services/persona.service.js";
import {useNavigate, useParams} from "react-router-dom";
import {useLazyGetAreaByIdQuery} from "@/components/Configuracion/Configuracion/Areas/service/areas.service.js";
import {
	useCreateResponsableReservacionMutation,
	useDeleteResponsableReservacionMutation,
	useGetResponsableReservacionesQuery
} from "@/components/Configuracion/Reservacion/AsignarResponsables/service/responsable.reservacion.service.js";


export default function Responsable() {
	const {id} = useParams()
	const [currentFilters, setCurrentFilters] = React.useState({});
	const [active, setActive] = React.useState(true);
	const [processingId, setProcessingId] = useState(null);
	const [processingIdR, setProcessingIdR] = useState(null);
	const navigate = useNavigate()
	const user = useSelector(state => state.user);
	const {data} = useGetPersonaQuery(currentFilters, {
		refetchOnReconnect: true,
	});
	const {data: responsables} = useGetResponsableReservacionesQuery({id_estructura: id}, {
		refetchOnReconnect: true,
	});
	const responsablesPersonasIds = responsables?.map(res => res.id_persona.id);
	const filteredData = data?.filter(persona =>
		!responsablesPersonasIds?.includes(persona.id)
	) || [];
	const [getAreaById, {data: area}] = useLazyGetAreaByIdQuery();
	useEffect(() => {
		getAreaById(id)
	}, [id]);
	const [
		CreateResponsable,
		{
			isError: isErrorC,
			isLoading: isLoadingC,
			isSuccess: isSuccessC,
			error: errorC,
		},
	] = useCreateResponsableReservacionMutation();
	const [
		DeleteResponsable,
		{
			isError: isErrorD,
			isLoading: isLoadingD,
			isSuccess: isSuccessD,
			error: errorD,
		},
	] = useDeleteResponsableReservacionMutation();
	useRedirectForm(
		isLoadingC,
		isSuccessC,
		isErrorC,
		errorC,
		"Responsable asociado",
	);
	useRedirectForm(
		isLoadingD,
		isSuccessD,
		isErrorD,
		errorD,
		"Responsable eliminado",
	);
	const getCurrentDate = () => {
		const date = new Date();
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		return `${year}-${month}-${day}`;
	}
	useEffect(() => {
		if (processingId !== null) {
			const newValues = {
				id_persona: processingId,
				id_estructura: id,
				id_institucion: user.institucion.id,
				fecha_registro: getCurrentDate()
			};

			CreateResponsable(newValues).then(() => setProcessingId(null));
		}
	}, [processingId]);

	function handleSubmit(id_persona) {
		setProcessingId(id_persona)
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
						<Tooltip title={'Asignar responsable'}>
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
		rows: filteredData ?? []
	};
	useEffect(() => {
		if (processingIdR !== null) {
			DeleteResponsable(processingIdR).then(() => setProcessingIdR(null));
		}
	}, [processingIdR]);

	function handleDelete(id_responsable_reservacion) {
		setProcessingIdR(id_responsable_reservacion)
	}

	const datadefResponsable = {
		columns: [
			{
				id: "nombre_completo",
				accessorFn: (row) => row.id_persona?.nombre_completo,
				cell: (info) => info.getValue(),
				header: "Nombre",
				footer: (props) => props.column.id,
			},
			{
				id: "solapin",
				accessorFn: (row) => row.id_persona?.solapin,
				cell: (info) => info.getValue(),
				header: "Solapín",
				footer: (props) => props.column.id,
			},
			{
				id: "id_responsabilidad",
				accessorFn: (row) => row.id_persona?.id_responsabilidad?.nombre_responsabilidad,
				cell: (info) => info.getValue(),
				header: "Cargo",
				footer: (props) => props.column.id,
			},
			{
				id: "id_estructura",
				accessorFn: (row) => row.id_persona?.id_estructura?.nombre_estructura,
				cell: (info) => info.getValue(),
				header: "Área",
				footer: (props) => props.column.id,
			},
			{
				id: "Opciones",
				accessorFn: (row) => (
					<div className="flex gap-2 justify-center items-center">
						<Tooltip title={'Eliminar responsable'}>
							<Button
								onClick={() => handleDelete(row.id_responsable_reservacion)} variant={"ghost"}
								size={"icon"}
							>
								{processingIdR === row.id_responsable_reservacion ?
									<CircularProgress size={16} color="success"/> :
									<Trash size={15}/>}

							</Button>
						</Tooltip>
					</div>
				),
				cell: (info) => info.getValue(),
				header: "Opciones",
				footer: (props) => props.column.id,
			},
		],
		rows: responsables ?? []
	};
	return (
		<div className="flex flex-col gap-2">
			<div className="flex border-b border-gray-300 justify-between">
				<h2 className="text-gray-700 font-semibold text-lg justify-center al">
					Asignar responsable de área
				</h2>
				<Tooltip title={'Atrás'}>
					<Button variant={'ghost'} size={'icon'} onClick={() => {
						navigate('/configuracion/reservacion/responsable-areas')
					}}>
						<Undo2 size={16}/>
					</Button>
				</Tooltip>
			</div>
			{area && (
				<div className="flex-col flex-wrap justify-center">
					<h2 className="text-gray-600 font-semibold text-sm justify-center al">
						Detalles del área
					</h2>
					<div className="flex gap-4 text-center items-center text-sm text-gray-500">
						<p className="font-semibold">
							<span className="font-bold">Nombre:</span> {area.nombre_estructura}
						</p>
						<p className="font-semibold">
							<span className="font-bold">Consejo:</span> {area.estructura_consejo ? 'SI' : "NO"}
						</p>
						<p className="font-semibold">
							<span className="font-bold">Activo: </span>
							{area.activo ? 'SI' : "NO"}
						</p>
						<p className="font-semibold">
							<span className="font-bold">Código externo: </span>
							{area.codigo_externo}
						</p>
						<p className="font-semibold">
							<span className="font-bold">Código de área: </span>
							{area.codigo_area ? 'SI' : "NO"}
						</p>
					</div>
				</div>
			)}
			<div className={'p-2'}>
				<h2 className="text-gray-700 font-semibold text-lg justify-center al">
					Lista de responsables
				</h2>
				<SGTable data={datadefResponsable}/>
			</div>
			<div className={'p-4'}>
				<div className="flex border-b border-gray-300 justify-between">
					<h2 className="text-gray-700 font-semibold text-lg justify-center al">
						Lista de personas
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
		</div>
	);
}
