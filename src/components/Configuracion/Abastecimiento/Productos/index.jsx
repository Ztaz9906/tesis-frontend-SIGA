import React, {useEffect, useState} from "react";
import {SGTable} from "../../../auxiliar/table";
import {Edit2Icon, FilterIcon, PlusCircle, Trash} from "lucide-react";
import {Link} from "react-router-dom";
import {useDeleteProductoMutation, useGetProductoQuery,} from "./service/producto.service";
import {Button} from "../../../ui/button";
import Delete from "../../../auxiliar/delete";
import {useRedirectForm} from "../../../../hooks/useRedirectForm";
import GenericFilter from "../../../auxiliar/GenericFilter";
import {Tooltip} from "@mui/material";
import {useGetTipoProductoQuery} from "../Tipos de Productos/service/tipo.producto.service";
import {useGetUMQuery} from "../Unidaddes de Medidas/service/um.service";
import {useSelector} from "react-redux";

export default function IndexProductos() {
	const [currentFilters, setCurrentFilters] = React.useState({});
	const [active, setActive] = useState(true);
	const {data, refetch} = useGetProductoQuery(currentFilters, {
		refetchOnReconnect: true,
	});
	const user = useSelector((state) => state.user);
	useEffect(() => {
		refetch()
	}, [user, refetch]);
	const [
		deleteProducto,
		{
			isError: isErrorD,
			isLoading: isLoadingD,
			isSuccess: isSuccessD,
			error: errorD,
		},
	] = useDeleteProductoMutation();

	useRedirectForm(
		isLoadingD,
		isSuccessD,
		isErrorD,
		errorD,
		"Producto eliminado"
	);
	const {data: tipo_producto} = useGetTipoProductoQuery(undefined, {
		refetchOnReconnect: true,
	});
	const {data: unidad_medidas} = useGetUMQuery(undefined, {
		refetchOnReconnect: true,
	});
	const tiposProductosOptions = tipo_producto?.map((tipo) => ({
		value: tipo.id_tipo_producto.toString(),
		label: tipo.nombre_tipo_producto,
	}));

	const unidadesMedidaOptions = unidad_medidas?.map((unidad) => ({
		value: unidad.id_unidad_medida.toString(),
		label: unidad.nombre_unidad_medida,
	}));
	const datadef = {
		columns: [
			{
				id: "nombre_producto",
				accessorFn: (row) => row.nombre_producto,
				cell: (info) => info.getValue(),
				header: "Nombre",
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
				id: "id_tipo_producto",
				accessorFn: (row) => row.id_tipo_producto.nombre_tipo_producto,
				cell: (info) => info.getValue(),
				header: "Tipo de producto",
				footer: (props) => props.column.id,
			},
			{
				id: "id_unidad_medida",
				accessorFn: (row) => row.id_unidad_medida.nombre_unidad_medida,
				cell: (info) => info.getValue(),
				header: "Unidad de medida",
				footer: (props) => props.column.id,
			},
			{
				id: "Opciones",
				accessorFn: (row) => (
					<div className="flex gap-2 justify-center items-center">
						<Link
							to={`/configuracion/abastecimiento/producto/update/${row.id_producto}`}
						>
							<Edit2Icon size={15}/>
						</Link>
						<Delete
							title={`Borrar ${row.nombre_producto}`}
							message="¿Está seguro que desea eliminar este producto?"
							action={() => deleteProducto(row.id_producto)}
						>
							<Button variant={"ghost"} size={"icon"}>
								<Trash size={15}/>
							</Button>
						</Delete>
					</div>
				),
				cell: (info) => info.getValue(),
				header: "Opciones",
				footer: (props) => props.column.id,
			},
		],
		rows: data ?? [],
	};
	return (
		<div className="flex flex-col gap-2">
			<div className="flex border-b border-gray-300 justify-between">
				<h2 className="text-gray-700 font-semibold text-lg justify-center al">
					Listado de productos
				</h2>
				<div className="flex">
					<Link
						to={"/configuracion/abastecimiento/producto/create"}
						className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
					>
						<PlusCircle size={15}/>
					</Link>
					<Tooltip placement="bottom" title="Filtro para los productos">
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
				{tiposProductosOptions && unidadesMedidaOptions ? (
					<GenericFilter
						onFilter={setCurrentFilters}
						fieldsConfig={[
							{
								type: "text",
								name: "nombre_producto",
								label: "Nombre exacto",
								placeholder: "Sensible a mayúsculas y minúsculas",
							},
							{
								type: "select",
								name: "id_tipo_producto",
								label: "Tipo de producto",
								options: [
									{value: "", label: "--Todos--"},
									...tiposProductosOptions,
								],
							},
							{
								type: "select",
								name: "id_unidad_medida",
								label: "Unidad de medida",
								options: [
									{value: "", label: "--Todos--"},
									...unidadesMedidaOptions,
								],
							},
						]}
					/>
				) : null}
			</div>
			<SGTable data={datadef}/>
		</div>
	);
}
