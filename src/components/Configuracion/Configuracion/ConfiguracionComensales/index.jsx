import React from "react";
import {SGTable} from "../../../auxiliar/table";
import {Ban, CheckCircle2, PlusCircle, UserPlus2} from "lucide-react";
import {Link} from "react-router-dom";
import {
	useCreateConfiguracionComensalesMutation,
	useEditConfiguracionComensalesMutation,
	useGetConfiguracionComensalesQuery
} from "./service/configuracion.comensales.service.js";
import {useSelector} from "react-redux";
import {Tooltip} from "@mui/material";
import {Button} from "@/components/ui/button.jsx";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";

export default function IndexConfiguracionComensales() {
	const {data} = useGetConfiguracionComensalesQuery(undefined, {
		refetchOnReconnect: true,
	});
	const user = useSelector(state => state.user);

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
				accessorFn: (row) => row.descripcion,
				cell: (info) => info.getValue(),
				header: "Descripción",
				footer: (props) => props.column.id,
			},
			{
				id: "activo",
				accessorFn: (row) => row.activo,
				cell: ({row}) => (row.original.activo === true ? "SI" : "NO"),
				header: "Activo",
				footer: (props) => props.column.id,
			},
			{
				id: "Opciones",
				accessorFn: (row) => (
					<div className="flex gap-2 justify-center items-center">
						{row.activo && (
							<>
								<Tooltip
									title="Agregar valores"
								>
									<Link
										to={`/configuracion/configuracion/configurar-comensales/agregar-valores/${row.id_configuracion_persona}`}
									>
										<PlusCircle size={16}/>
									</Link>
								</Tooltip>
								<Tooltip title={'Asignar personas a la configuración'}>
									<Link
										to={`/configuracion/configuracion/configurar-comensales/asociar-personas/${row.id_configuracion_persona}`}
									>
										<UserPlus2 size={18}/>
									</Link>
								</Tooltip>
							</>
						)}
						<Link
							variant={'ghost'}
							onClick={() => handleEdit(row.id_configuracion_persona, row.activo)}
						>
							{row.activo ?
								<Tooltip title="Desactivar configuración">
									<Ban size={16}/>
								</Tooltip>
								:
								<Tooltip title="Activar configuración">
									<CheckCircle2 size={16}/>
								</Tooltip>
							}
						</Link>
					</div>
				),
				cell: (info) => info.getValue(),
				header: "Opciones",
				footer: (props) => props.column.id,
			},
		],
		rows: data ?? [],
	};
	const getCurrentDate = () => {
		const date = new Date();
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		return `${year}-${month}-${day}`;
	}
	const [
		createConfiguracionComensales
	] = useCreateConfiguracionComensalesMutation();
	const [
		editConfiguracionComensales,
		{
			isError: isErrorE,
			isLoading: isLoadingE,
			isSuccess: isSuccessE,
			error: errorE,
		},
	] = useEditConfiguracionComensalesMutation();
	useRedirectForm(
		isLoadingE,
		isSuccessE,
		isErrorE,
		errorE,
		"Estado de la configuración cambiado",
	);

	function handleEdit(id, activo) {
		const modifiedFields = {
			'activo': `${!activo}`
		}
		editConfiguracionComensales({
			id: id,
			...modifiedFields
		})
	}

	function handleDefault() {
		createConfiguracionComensales({
			"activo": false,
			"descripcion": "Configuración por defecto",
			'fecha_registro': getCurrentDate(),
			'id_institucion': user.institucion.id,
			'id_usuario_registro': user.id,
		})
	}

	return (
		<div className="flex flex-col gap-2">
			<div className="flex border-b border-gray-300 justify-between">
				<h2 className="text-gray-700 font-semibold text-lg justify-center al">
					Configuración de comensales
				</h2>
				<div className="flex">
					{(!data || Object.keys(data).length === 0) && (
						<Button variant={'ghost'} onClick={handleDefault}>Añadir configuración por defecto</Button>
					)}
				</div>
			</div>

			<SGTable data={datadef} setPagination={false} setFilter={false}/>
		</div>
	);
}
