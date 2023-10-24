import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {Button} from "@/components/ui/button.jsx";
import {SGTable} from "@/components/auxiliar/table.jsx";
import React from "react";
import ModalContacto
	from "@/components/Configuracion/Reservacion/Configuraciones/tabs/components/DatosContacto/modal.contacto.jsx";
import {baseUrl} from "@/services/config/axios.jsx";
import {
	useCreateContactoMutation,
	useEditContactoMutation,
	useGetContactosQuery
} from "@/components/Configuracion/Reservacion/Configuraciones/service/contacto.service.js";
import {useSelector} from "react-redux";

export default function DatosContacto() {
	const {data} = useGetContactosQuery(undefined, {
		refetchOnReconnect: true,
	});
	const [
		createContacto,
		{
			isError: isErrorC,
			isLoading: isLoadingC,
			isSuccess: isSuccessC,
			error: errorC,
		},
	] = useCreateContactoMutation()
	const [
		editContacto,
		{
			isError: isErrorE,
			isLoading: isLoadingE,
			isSuccess: isSuccessE,
			error: errorE,
		},
	] = useEditContactoMutation();

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
		createContacto({
			'direccion': `${baseUrl}`,
			'telefono': '00-00-00-00',
			'correo': 'correo@intitucion.cu',
			'fecha_registro': getCurrentDate(),
			'id_institucion': user.institucion.id,
			'id_usuario_registro': user.id,
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
				id: "direccion",
				accessorFn: (row) => row.direccion,
				cell: (info) => info.getValue(),
				header: "Dirección",
				footer: (props) => props.column.id,
			},
			{
				id: "telefono",
				accessorFn: (row) => row.telefono,
				cell: (info) => info.getValue(),
				header: "Teléfono",
				footer: (props) => props.column.id,
			},
			{
				id: "correo",
				accessorFn: (row) => row.correo,
				cell: (info) => info.getValue(),
				header: "Correo electrónico",
				footer: (props) => props.column.id,
			},
			{
				id: "Opciones",
				accessorFn: (row) => (
					<ModalContacto
						title={"Editar datos de contacto"}
						id={row.id_datos_contacto}
						edit={editContacto}
					/>
				),
				cell: (info) => info.getValue(),
				header: "Opciones",
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
