import React, {useEffect, useState} from "react";
import {SGTable} from "../../../../../auxiliar/table";
import {Avatar} from "@mui/material";
import {Trash} from "lucide-react";
import {useLazyGetEstructuraByIdQuery} from "../../service/estructura.service";

export function TablaEstructura({id}) {
	const [getEstructuraById, {data}] = useLazyGetEstructuraByIdQuery();

	const [estructura, setEstructura] = useState({});
	useEffect(() => {
		getEstructuraById(id)
			.unwrap()
			.then((res) => {
				setEstructura(res);
			});
	}, [id]);

	const dataEstrucutra = {
		columns: [
			{
				id: "name",
				accessorFn: (row) => row.name,
				cell: (info) => info.getValue(),
				header: "Nombre",
				footer: (props) => props.column.id,
			},
			{
				id: "initials",
				accessorFn: (row) => row.initials,
				cell: (info) => info.getValue(),
				header: "Iniciales",
				footer: (props) => props.column.id,
			},
			{
				id: "category",
				cell: ({row}) => row.original.category.name,
				header: "Categoría",
				footer: (props) => props.column.id,
			},
			{
				id: "active",
				accessorFn: (row) => row.active,
				cell: ({row}) => (row.original.active === true ? "SI" : "NO"),
				header: "Activo",
				footer: (props) => props.column.id,
			},
		],
		rows: estructura.children ?? [],
	};

	return <SGTable data={dataEstrucutra} setFilter={false}/>;
}

export function TablaReglas() {
	return <div>Tablas Reglas</div>;
}

export function TablaResponsables() {
	return <div>Tablas Responsables</div>;
}

export function TablaPersonas() {
	const data = {
		columns: [
			{
				id: "foto",
				accessorFn: (row) => <Avatar/>,
				cell: (info) => info.getValue(),
				header: "foto",
				footer: (props) => props.column.id,
			},
			{
				id: "nombre",
				accessorFn: (row) => row.nombre,
				cell: (info) => info.getValue(),
				header: "Nombre",
				footer: (props) => props.column.id,
			},
			{
				id: "usuario",
				accessorFn: (row) => row.usuario,
				cell: (info) => info.getValue(),
				header: "Usuario",
				footer: (props) => props.column.id,
			},
			{
				id: "solapin",
				accessorFn: (row) => row.solapin,
				cell: (info) => info.getValue(),
				header: "Solapín",
				footer: (props) => props.column.id,
			},
			{
				id: "codigo",
				accessorFn: (row) => row.codigo,
				cell: (info) => info.getValue(),
				header: "Código",
				footer: (props) => props.column.id,
			},
			{
				id: "fecha",
				accessorFn: (row) => row.fecha,
				cell: (info) => info.getValue(),
				header: "Fecha",
				footer: (props) => props.column.id,
			},
			{
				id: "area",
				accessorFn: (row) => row.area,
				cell: (info) => info.getValue(),
				header: "Área",
				footer: (props) => props.column.id,
			},
			{
				id: "Opciones",
				accessorFn: (row) => <Trash size={15}/>,
				cell: (info) => info.getValue(),
				header: "Editar",
				footer: (props) => props.column.id,
			},
		],
		rows: [
			{
				Nombre: "tanner",
				Usuario: 123123123,
				Solapín: "ef123",
				Código: "T!234",
				Área: "uci",
				Fecha: "29-06-15",
			},
		],
	};
	return <SGTable data={data}/>;
}
