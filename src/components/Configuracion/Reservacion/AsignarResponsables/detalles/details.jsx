import React, {useEffect} from "react";

import {Undo2} from "lucide-react";
import {Tooltip} from "@mui/material";
import {Button} from "@/components/ui/button.jsx";
import {SGTable} from "@/components/auxiliar/table.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useLazyGetAreaByIdQuery} from "@/components/Configuracion/Configuracion/Areas/service/areas.service.js";
import {
	useGetResponsableReservacionesQuery
} from "@/components/Configuracion/Reservacion/AsignarResponsables/service/responsable.reservacion.service.js";
import {
	useGetAsociarPersonasQuery
} from "@/components/Configuracion/Reservacion/AsignarResponsables/service/areas.personas.reservacion.service.js";


export default function Detalles() {
	const {id} = useParams()
	const [currentFilters, setCurrentFilters] = React.useState({});
	const navigate = useNavigate()

	const {data: responsables} = useGetResponsableReservacionesQuery({id_estructura: id}, {
		refetchOnReconnect: true,
	});
	const {data: asociados} = useGetAsociarPersonasQuery({id_estructura: id}, {
		refetchOnReconnect: true,
	});

	const [getAreaById, {data: area}] = useLazyGetAreaByIdQuery();
	useEffect(() => {
		getAreaById(id)
	}, [id]);

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
		],
		rows: responsables ?? []
	};

	const datadefAsociar = {
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
		],
		rows: asociados ?? []
	};

	return (
		<div className="flex flex-col gap-2">
			<div className="flex border-b border-gray-300 justify-between">
				<h2 className="text-gray-700 font-semibold text-lg justify-center al">
					Detalles
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
				<SGTable data={datadefResponsable} setFilter={false} setPagination={false}/>
			</div>
			<div className={'p-4'}>
				<h2 className="text-gray-700 font-semibold text-lg justify-center al">
					Lista de personas asociadas
				</h2>
				<SGTable data={datadefAsociar}/>
			</div>

		</div>
	);
}
