import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {Button} from "@/components/ui/button.jsx";
import {
	useCreatePeriodoReservacionMutation,
	useEditPeriodoReservacionMutation,
	useGetPeriodoReservacionesQuery,
} from "@/components/Configuracion/Reservacion/Configuraciones/service/periodo.reservacion.service.js";
import {SGTable} from "@/components/auxiliar/table.jsx";
import ModalPreiodoReservacion
	from "@/components/Configuracion/Reservacion/Configuraciones/tabs/components/PeriodoReservacion/modal.preiodo.reservacion.jsx";
import {useSelector} from "react-redux";

export default function PeriodoReservacion() {
	const {data} = useGetPeriodoReservacionesQuery(undefined, {
		refetchOnReconnect: true,
	});
	const [
		createPeriodoReservacion,
		{
			isError: isErrorC,
			isLoading: isLoadingC,
			isSuccess: isSuccessC,
			error: errorC,
		},
	] = useCreatePeriodoReservacionMutation()
	const [
		editPeriodoReservacion,
		{
			isError: isErrorE,
			isLoading: isLoadingE,
			isSuccess: isSuccessE,
			error: errorE,
		},
	] = useEditPeriodoReservacionMutation();

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
		"Cantidad editada",
	);

	function handleDefault() {
		createPeriodoReservacion({
			'periodo_reservacion': 0,
			'fecha_registro': getCurrentDate(),
			'id_institucion': user.institucion.id,
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
				id: "periodo_reservacion",
				accessorFn: (row) => row.periodo_reservacion,
				cell: (info) => (
					<div className="flex items-center justify-evenly">
						<span>{info.getValue()}</span>
						<ModalPreiodoReservacion
							title={"Editar Período de Reservación"}
							id={info.row.original.id_periodo_reservacion}
							edit={editPeriodoReservacion}/>

					</div>
				),
				header: "Período de reservación",
				footer: (props) => props.column.id,
			},
		],
		rows: data ?? []
	};
	return (<>{(!data || Object.keys(data).length === 0) && (
		<Button variant={'ghost'} onClick={handleDefault}>Añadir configuración por defecto</Button>
	)}
		<SGTable data={datadef} setFilter={false} setPagination={false}/></>)
}
