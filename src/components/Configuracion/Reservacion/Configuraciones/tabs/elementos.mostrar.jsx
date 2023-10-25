import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {Button} from "@/components/ui/button.jsx";
import {
	useCreateElementoMostrarMutation,
	useEditElementoMostrarMutation,
	useGetElementoMostrarseQuery
} from "@/components/Configuracion/Reservacion/Configuraciones/service/elementos.mostrar.js";
import {SGTable} from "@/components/auxiliar/table.jsx";
import ModalReservacion
	from "@/components/Configuracion/Reservacion/Configuraciones/tabs/components/ElementosMostrar/modal.elementos.mostrar.reservacion.jsx";
import ModalCalendario
	from "@/components/Configuracion/Reservacion/Configuraciones/tabs/components/ElementosMostrar/modal.elementos.mostrar.calendario.jsx";
import {useSelector} from "react-redux";

export default function ElementosMostrar() {
	const {data} = useGetElementoMostrarseQuery(undefined, {
		refetchOnReconnect: true,
	});
	const [
		createElementoMostrar,
		{
			isError: isErrorC,
			isLoading: isLoadingC,
			isSuccess: isSuccessC,
			error: errorC,
		},
	] = useCreateElementoMostrarMutation()
	const [
		editElementoMostrar,
		{
			isError: isErrorE,
			isLoading: isLoadingE,
			isSuccess: isSuccessE,
			error: errorE,
		},
	] = useEditElementoMostrarMutation();

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
		"Cantidad Editada",
	);

	function handleDefault() {
		createElementoMostrar({
			'elementos_mostrar_menu': 0,
			'elementos_mostrar_reservacion': 0,
			'elementos_mostrar_calendario': 0,
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
				id: "elementos_mostrar_reservacion",
				accessorFn: (row) => row.elementos_mostrar_reservacion,
				cell: (info) => (
					<div className="flex items-center justify-evenly">
						<span>{info.getValue()}</span>
						<ModalReservacion
							title={"Editar reservación por platos"}
							id={info.row.original.id_elementos_mostrar}
							edit={editElementoMostrar}
						/>
					</div>
				),
				header: "Reservación por platos",
				footer: (props) => props.column.id,
			},
			{
				id: "elementos_mostrar_calendario",
				accessorFn: (row) => row.elementos_mostrar_calendario,
				cell: (info) => (
					<div className="flex items-center justify-evenly">
						<span>{info.getValue()}</span>
						<ModalCalendario
							title={"Editar Calendario"}
							id={info.row.original.id_elementos_mostrar}
							edit={editElementoMostrar}
						/>
					</div>
				),
				header: "Calendario",
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
