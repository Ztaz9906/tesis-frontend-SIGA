import React, {useEffect, useState} from "react";
import {useGetEstructurasQuery} from "./service/estructura.service";
import {Link} from "react-router-dom";
import {FilterIcon, PlusCircle} from "lucide-react";
import RenderTreeView from "./TreeView";
import Tooltip from "@mui/material/Tooltip";
import {Button} from "@/components/ui/button.jsx";
import GenericFilter from "@/components/auxiliar/GenericFilter.jsx";
import {useSelector} from "react-redux";

export default function IndexEstructura() {
	const [currentFilters, setCurrentFilters] = React.useState({});
	const [active, setActive] = useState(true);
	const {data, refetch} = useGetEstructurasQuery(currentFilters, {
		refetchOnReconnect: true,
	});
	const user = useSelector((state) => state.user);

	useEffect(() => {
		refetch()
	}, [user, refetch]);
	if (!data) {
		return;
	}

	return (
		<>
			<div className="flex border-b border-gray-300 justify-between">
				<h2 className="text-gray-700 font-semibold text-lg justify-center al">
					Lista de estructuras
				</h2>
				<div className="flex">
					<Tooltip title={'Crear'}>
						<Link
							to={"/configuracion/distribucion/estructura/create"}
							className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
						>
							<PlusCircle size={15}/>
						</Link>
					</Tooltip>
					<Tooltip
						placement="bottom"
						title="Filtro para las estructuras"
					>
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
				<GenericFilter
					onFilter={setCurrentFilters}
					fieldsConfig={[
						{
							type: "text",
							name: "name",
							label: "Nombre exacto",
							placeholder: "Sensible a mayúsculas y minúsculas",
						},
						{
							type: "text",
							name: "initials",
							label: "Iniciales",
							placeholder: "Sensible a mayúsculas y minúsculas",
						},
						{
							type: "select",
							name: "active",
							label: "Activo",
							options: [
								{value: "", label: "--Activo--"},
								{value: "true", label: "Si"},
								{value: "false", label: "No"},
							],
						},
					]}
				/>
			</div>
			<div className="p-5">
				<RenderTreeView data={data}/>
			</div>
		</>
	);
}
