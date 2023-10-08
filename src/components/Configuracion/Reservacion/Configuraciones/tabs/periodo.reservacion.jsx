import React from "react";
import {SGTable} from "../../../auxiliar/table";
import Modal from "./components/modal.jsx";

import {
	useCreateAccesoMutation,
	useEditAccesoMutation,
	useGetAccesoQuery
} from "@/components/Configuracion/Cajero/Configuraciones/service/accesos.service.js";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {Button} from "@/components/ui/button.jsx";
import useUser from "@/hooks/useUser.jsx";

export default function PeriodoReservacion() {
	const {data} = useGetAccesoQuery(undefined, {
		refetchOnReconnect: true,
	});
	const [
		createAcceso,
		{
			isError: isErrorC,
			isLoading: isLoadingC,
			isSuccess: isSuccessC,
			error: errorC,
		},
	] = useCreateAccesoMutation()
	const [
		editAcceso,
		{
			isError: isErrorE,
			isLoading: isLoadingE,
			isSuccess: isSuccessE,
			error: errorE,
		},
	] = useEditAccesoMutation();

	const [user] = useUser()
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
		"Cantidad de acceso editada",
	);

	function handleDefault() {
		createAcceso({
			'cantidad_acceso': 0,
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
				id: "cantidad_acceso",
				accessorFn: (row) => row.cantidad_acceso,
				cell: (info) => info.getValue(),
				header: "Cantidad de accesos por persona",
				footer: (props) => props.column.id,
			},
			{
				id: "editar",
				accessorFn: (row) => <Modal title={"Editar Accesos"} id={row.id_acceso_evento_secundario}
				                            edit={editAcceso}/>,
				cell: (info) => info.getValue(),
				header: "Editar",
				footer: (props) => props.column.id,
			},
		],
		rows: data ?? []
	};
	return (<>{(!data || Object.keys(data).length === 0) && (
		<Button variant={'ghost'} onClick={handleDefault}>Añadir configuracion por defecto</Button>
	)}
		<SGTable data={datadef} setFilter={false} setPagination={false}/></>)
}
