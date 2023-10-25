import React, {useEffect, useState} from "react";
import {FilterIcon, PlusCircle, Undo2} from "lucide-react";
import {CircularProgress, Tooltip} from "@mui/material";
import {Button} from "@/components/ui/button.jsx";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {SGTable} from "@/components/auxiliar/table.jsx";
import FilterUsuarios
	from "@/components/Configuracion/Cajero/SolapinPerdido/new-solapin-perdido/components/filters.usuarios.jsx";
import {useGetPersonaQuery} from "@/services/persona.service.js";
import {useNavigate, useParams} from "react-router-dom";
import {
	useCreateAsociarTarjetaMutation,
	useGetAsociarTarjetasQuery
} from "@/components/Configuracion/Cajero/Tarjetas/service/persona.tarjeta.service.js";
import {useLazyGetTarjetaByIdQuery} from "@/components/Configuracion/Cajero/Tarjetas/service/tarjeta.service.js";
import {useSelector} from "react-redux";

export default function AsociarPersonaTarjeta() {
	const {id} = useParams()
	const [currentFilters, setCurrentFilters] = React.useState({});
	const [active, setActive] = React.useState(true);
	const [processingId, setProcessingId] = useState(null);
	const navigate = useNavigate()
	const user = useSelector(state => state.user);
	const {data, refetch} = useGetPersonaQuery(currentFilters, {
		refetchOnReconnect: true,
	});
	useEffect(() => {
		refetch()
	}, [user, refetch]);
	const {data: persona_asociadas} = useGetAsociarTarjetasQuery(undefined, {
		refetchOnReconnect: true,
	});

	const PersonasasociadasIds = persona_asociadas?.map(res => res.id_persona.id);
	const filteredData = data?.filter(persona =>
		!PersonasasociadasIds?.includes(persona.id)
	) || [];
	const [getTarjetasById, {data: tarjeta}] = useLazyGetTarjetaByIdQuery();
	const [filterID, setFilterID] = React.useState();

	useEffect(() => {
		setFilterID(persona_asociadas?.map(res => res.id_tarjeta.id_tarjeta_alimentacion) || []);
		if (filterID && filterID.length > 0 && filterID.includes(Number(id))) {
			navigate('/configuracion/cajero/tarjetas')
		}
		getTarjetasById(id)
	}, [persona_asociadas, id]);
	const [
		CreateResponsable,
		{
			isError: isErrorC,
			isLoading: isLoadingC,
			isSuccess: isSuccessC,
			error: errorC,
		},
	] = useCreateAsociarTarjetaMutation();

	useRedirectForm(
		isLoadingC,
		isSuccessC,
		isErrorC,
		errorC,
		"Persona asociada correctamente",
		'/configuracion/cajero/tarjetas'
	);

	const getCurrentDate = () => {
		const date = new Date();
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	function handleSubmit(id_persona) {
		setProcessingId(id_persona)
		const newValues = {
			id_persona: id_persona,
			id_tarjeta: id,
			id_institucion: user.institucion.id,
			fecha_registro: getCurrentDate(),
			activo: true
		};
		CreateResponsable(newValues)
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
	return (
		<div className="flex flex-col gap-2">
			<div className="flex border-b border-gray-300 justify-between">
				<h2 className="text-gray-700 font-semibold text-lg justify-center al">
					Asignar persona a tarjeta
				</h2>
				<Tooltip title={'Atrás'}>
					<Button variant={'ghost'} size={'icon'} onClick={() => {
						navigate('/configuracion/cajero/tarjetas')
					}}>
						<Undo2 size={16}/>
					</Button>
				</Tooltip>
			</div>
			{tarjeta && (
				<div className="flex-col flex-wrap justify-center">
					<h2 className="text-gray-600 font-semibold text-sm justify-center al">
						Detalles de la tarjeta
					</h2>
					<div className="flex gap-4 text-center items-center text-sm text-gray-500 p-2">
						<p className="font-semibold">
							<span className="font-bold">Código:</span> {tarjeta.codigo}
						</p>
						<p className="font-semibold">
							<span className="font-bold">No.Serie:</span> {tarjeta.numero_serie ? 'SI' : "NO"}
						</p>
						<p className="font-semibold">
							<span className="font-bold">Estado: </span>
							{tarjeta.id_estado_tarjeta.nombre_estado_tarjeta}
						</p>
						<p className="font-semibold">
							<span className="font-bold">Tipo: </span>
							{tarjeta.id_tipo_tarjeta.nombre_tipo_tarjeta}
						</p>
					</div>
				</div>
			)}
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
