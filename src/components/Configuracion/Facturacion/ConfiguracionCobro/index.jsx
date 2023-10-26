import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {Button} from "@/components/ui/button.jsx";
import {SGTable} from "@/components/auxiliar/table.jsx";
import {Ban, CheckCircle2, PenSquare, PlusCircle} from "lucide-react";
import Tooltip from "@mui/material/Tooltip";
import {
	useCreateConfiguracionCobroMutation,
	useEditConfiguracionCobroMutation,
	useGetConfiguracionCobrosQuery
} from "@/components/Configuracion/Facturacion/ConfiguracionCobro/servive/configuracion.cobro.service.js";
import {Link} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";

export default function IndexConfiguracionCobro() {
	const {data} = useGetConfiguracionCobrosQuery(undefined, {
		refetchOnReconnect: true,
	});
	const [
		createConfiguracionCobro,
	] = useCreateConfiguracionCobroMutation()
	const [
		editConfiguracionCobro,
		{
			isError: isErrorE,
			isLoading: isLoadingE,
			isSuccess: isSuccessE,
			error: errorE,
		},
	] = useEditConfiguracionCobroMutation();

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
		"Configuración activada",
	);

	function handleDefault() {
		createConfiguracionCobro({
			'nombre_configuracion_cobro': 'Configuración por defecto',
			'descripcion': 'Proceso de configuración por defecto , añadir valores y activar para su uso',
			'activo': false,
			'fecha_registro': getCurrentDate(),
			'id_institucion': user.institucion.id,
		})
	}

	function handleEdit(id, activo) {
		const modifiedFields = {
			'activo': `${!activo}`
		}
		editConfiguracionCobro({
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
				id: "nombre_configuracion_cobro",
				accessorFn: (row) => row.nombre_configuracion_cobro,
				cell: (info) => info.getValue(),
				header: "Nombre de la configuración",
				footer: (props) => props.column.id,
			},
			{
				id: "descripcion",
				accessorFn: (row) => row.descripcion,
				cell: (info) => info.getValue(),
				header: "Descripción de la configuración",
				footer: (props) => props.column.id,
			},
			{
				id: "activo",
				accessorFn: (row) => row.activo,
				cell: (info) => info.getValue() ? 'SI' : 'NO',
				header: "Activa",
				footer: (props) => props.column.id,
			},
			{
				id: "Opciones",
				accessorFn: (row) => (
					<div className="flex gap-2 justify-center items-center">
						<Tooltip
							title="Agregar valores de configuración"
						>
							<Link
								to={`/configuracion/facturacion/configuracion-cobro/agregar-valores/${row.id_configuracion_cobro}`}
							>
								<PenSquare size={16}/>
							</Link>
						</Tooltip>
						<Link
							variant={'ghost'}
							onClick={() => handleEdit(row.id_configuracion_cobro, row.activo)}
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
		rows: data ?? []
	};
	return (
		<>
			<div className="flex border-b border-gray-300 justify-between">
				<h2 className="text-gray-700 font-semibold text-lg justify-center al">
					Configuración del proceso de reservación
				</h2>
				<div className="flex">
					<Tooltip title={'Agregar configuración por defecto'}>
						<Button variant={'ghost'} onClick={handleDefault}><PlusCircle size={16}/></Button>
					</Tooltip>
				</div>
			</div>
			<div className={'p-2'}>
				<SGTable data={datadef}/>
			</div>
		</>)
}
