import React, {useEffect, useState} from "react";
import {useLazyGetEstructuraByIdQuery} from "../service/estructura.service";
import {Link, useParams} from "react-router-dom";
import {List} from "lucide-react";
import {BottomNavigation, BottomNavigationAction, Box} from "@mui/material";
import {styled} from "@mui/material/styles";
import {TablaEstructura, TablaPersonas, TablaReglas, TablaResponsables,} from "./components/tablas";

const StyledBottomNavigationAction = styled(BottomNavigationAction)(
	({theme}) => ({
		flex: 1,

		"&.Mui-selected": {
			color: "red",
			borderTop: "1px solid lightgray",
			borderLeft: "1px solid lightgray",
			borderRight: "1px solid lightgray",
			backgroundColor: "rgba(255, 0, 0, 0.05)", // Fondo ligeramente oscuro para resaltar
			zIndex: 1, // Para asegurarse de que se muestre encima de los otros botones
		},

		"&:not(.Mui-selected)": {
			borderBottom: "1px solid lightgray",
		},
	})
);

export default function DetailEstructura() {
	const [value, setValue] = React.useState(0);
	const {id} = useParams();
	const [estructura, setEstructura] = useState({});
	const [getEstructuraById, {data}] = useLazyGetEstructuraByIdQuery();

	useEffect(() => {
		getEstructuraById(id)
			.unwrap()
			.then((res) => {
				setEstructura(res);
			});
	}, [id]);

	function renderTables() {
		switch (value) {
			case 0:
				return <TablaEstructura id={id}/>;
			case 1:
				return <TablaReglas/>;
			case 2:
				return <TablaResponsables/>;
			case 3:
				return <TablaPersonas/>;
		}
	}

	return (
		<>
			<div className="flex border-b border-gray-300 justify-between">
				<h2 className="text-gray-700 font-semibold text-lg justify-center al">
					Detalles de la estructura
				</h2>
				<Link
					to={"/configuracion/distribucion/estructuras"}
					className={`mx-5 `}
				>
					<List size={15}/>
				</Link>
			</div>

			{estructura && (
				<div className="flex flex-wrap justify-start items-center gap-16 p-5 text-sm text-gray-500">
					<div className="gap-1">
						<p className="font-semibold">
							<span className="font-bold">Nombre:</span> {estructura.name}
						</p>
						<p className="font-semibold">
							<span className="font-bold">Siglas:</span> {estructura.initials}
						</p>
						<p className="font-semibold">
							<span className="font-bold">Categoría:</span>
							{estructura.category ? estructura?.category.name : "---"}
						</p>
					</div>
					<div className="gap-1">
						<p className="font-semibold">
							<span className="font-bold">Estructura padre:</span>
							{estructura?.estructura_parent
								? estructura?.estructura_parent.name
								: "---"}
						</p>
						<p className="font-semibold">
							<span className="font-bold">Capacidad:</span>
							{estructura.capacidad ? estructura.capacidad : "---"}
						</p>
						<p className="font-semibold">
							<span className="font-bold">Activo:</span>
							{estructura.active ? "Si" : "No"}
						</p>
					</div>
					{/* This block appears to be repeated. Remove or adjust as necessary */}
					<div className="gap-1">
						<p className="font-semibold">
							<span className="font-bold">Sub Director:</span>
							{estructura?.id_sub_director
								? estructura?.id_sub_director.nombre_completo
								: "---"}
						</p>
						<p className="font-semibold">
							<span className="font-bold">Técnico general:</span>
							{estructura.id_tecnico_general
								? estructura.id_tecnico_general.nombre_completo
								: "---"}
						</p>
						<p className="">
							<span className="font-bold">Centro de costo:</span>
							{estructura.centro_costo ? estructura.centro_costo : "---"}
						</p>
					</div>
				</div>
			)}

			<div className="p-5">
				<Box sx={{width: "auto"}}>
					<BottomNavigation
						showLabels
						value={value}
						onChange={(event, newValue) => {
							setValue(newValue);
						}}
						style={{color: "red"}}
					>
						<StyledBottomNavigationAction label="Estructura"/>
						{/* <StyledBottomNavigationAction label="Reglas" />
            <StyledBottomNavigationAction label="Responsables" />
            <StyledBottomNavigationAction label="Personas" /> */}
					</BottomNavigation>
				</Box>
			</div>
			<div>{renderTables()}</div>
		</>
	);
}
