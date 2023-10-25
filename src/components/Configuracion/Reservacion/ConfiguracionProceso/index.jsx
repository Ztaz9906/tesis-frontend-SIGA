import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {Button} from "@/components/ui/button.jsx";
import {
	useCreateProcesoReservacionMutation,
	useEditProcesoReservacionMutation,
	useGetProcesoReservacionesQuery
} from "@/components/Configuracion/Reservacion/ConfiguracionProceso/service/configuracion.proceso.reservacion.js";
import {SGTable} from "@/components/auxiliar/table.jsx";
import {Ban, CheckCircle2} from "lucide-react";
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import {useSelector} from "react-redux";

export default function IndexConfiguracionProcesoReservacion() {
	const {data} = useGetProcesoReservacionesQuery(undefined, {
		refetchOnReconnect: true,
	});
	const [
		createProcesoReservacion,
	] = useCreateProcesoReservacionMutation()
	const [
		editProcesoReservacion,
		{
			isError: isErrorE,
			isLoading: isLoadingE,
			isSuccess: isSuccessE,
			error: errorE,
		},
	] = useEditProcesoReservacionMutation();

	const user = useSelector(state => state.user);
	const getCurrentDate = () => {
		const date = new Date();
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		return `${year}-${month}-${day}`;
	}
	useRedirectForm(
		isLoadingE,
		isSuccessE,
		isErrorE,
		errorE,
		"Proceso de reservación cambiado exitosamente",
	);

	function handleDefault() {
		createProcesoReservacion({
			'flujo': false,
			'fecha_registro': getCurrentDate(),
			'id_institucion': user.institucion.id,
			'id_usuario_registro': user.id,
		})
	}

	function handleEdit(id, flujo) {
		const modifiedFields = {
			'flujo': `${!flujo}`
		}
		editProcesoReservacion({
			id: id,
			...modifiedFields
		})

	}

	const datadef = {
		columns: [
			{
				id: "fecha_registro",
				accessorFn: (row) => row.fecha_registro,
				cell: (info) => info.getValue(),
				header: "Fecha",
				footer: (props) => props.column.id,
			},
			{
				id: "descripcion",
				accessorFn: (row) => row.periodo_reservacion,
				cell: (info) => {
					return (
						<div className="flex items-center">
							<div className={'flex justify-end w-1/2'}>
								<span>{info.row.original.flujo ? 'Proceso con reservación' : 'Proceso sin reservación'}</span>
							</div>
							<div className={'flex justify-end w-1/2'}>
								<Button
									variant={'ghost'}
									onClick={() => handleEdit(info.row.original.id_configuracion_proceso, info.row.original.flujo)}
								>
									{info.row.original.flujo ?
										<Tooltip title="Establecer proceso sin reservación">
											<Ban size={15}/>
										</Tooltip>
										:
										<Tooltip title="Establecer proceso con reservación">
											<CheckCircle2 size={15}/>
										</Tooltip>
									}
								</Button>
							</div>
						</div>
					)
				},
				header: "Descripción del proceso de reservación",
				footer: (props) => props.column.id,
			},
		],
		rows: data ?? []
	};
	return (<>
		<div className="flex border-b border-gray-300 justify-between">
			<h2 className="text-gray-700 font-semibold text-lg justify-center al">
				Configuración de proceso de reservación
			</h2>
			<div className="flex">
				{(!data || Object.keys(data).length === 0) && (
					<Button variant={'ghost'} onClick={handleDefault}>Añadir configuración por defecto</Button>
				)}
			</div>
		</div>
		<SGTable data={datadef} setFilter={false} setPagination={false}/></>)
}
