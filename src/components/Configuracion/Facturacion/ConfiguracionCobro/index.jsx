import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {SGTable} from "@/components/auxiliar/table.jsx";
import {Ban, CheckCircle2, PenSquare} from "lucide-react";
import Tooltip from "@mui/material/Tooltip";
import {
	useEditConfiguracionCobroMutation,
	useGetConfiguracionCobrosQuery
} from "@/components/Configuracion/Facturacion/ConfiguracionCobro/servive/configuracion.cobro.service.js";
import {Link} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";
import Modal from "@/components/Configuracion/Facturacion/ConfiguracionCobro/create.default.modal.jsx";

export default function IndexConfiguracionCobro() {
	const {data} = useGetConfiguracionCobrosQuery(undefined, {
		refetchOnReconnect: true,
	});
	const [activo, setActivo] = React.useState(false);
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

	useRedirectForm(
		isLoadingE,
		isSuccessE,
		isErrorE,
		errorE,
		activo ? "Configuración activada" : "Configuración desactivada",
	);

	function handleEdit(id, activo) {
		setActivo(!activo)
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
					Configuración del proceso de cobro
				</h2>
				<div className="flex">
					<Modal user={user}/>
				</div>
			</div>
			<div className={'p-2'}>
				<SGTable data={datadef}/>
			</div>
		</>)
}
