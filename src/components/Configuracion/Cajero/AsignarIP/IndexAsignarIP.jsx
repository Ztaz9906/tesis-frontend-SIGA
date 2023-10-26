import {useGetEstructurasQuery} from "@/components/Configuracion/Distribucion/Estructura/service/estructura.service.js";
import {Link} from "react-router-dom";
import {FileEditIcon} from "lucide-react";
import {Tooltip} from "@mui/material";
import {SGTable} from "@/components/auxiliar/table.jsx";
import {useEffect} from "react";
import {useSelector} from "react-redux";

export default function IndexAsignarIP() {
	const {data, refetch} = useGetEstructurasQuery(undefined, {
		refetchOnReconnect: true,
	});
	const user = useSelector((state) => state.user);
	useEffect(() => {
		refetch()
	}, [user, refetch]);
	if (!data) {
		return;
	}

	function getFlatDoors(dataArray) {
		let doors = [];

		function traverse(item) {
			if (item.children && item.children.length > 0) {
				for (let child of item.children) {
					traverse(child);
				}
			} else {
				doors.push(item);
			}
		}

		for (let item of dataArray) {
			traverse(item);
		}

		return doors;
	}


	const puertas = getFlatDoors(data)


	const datadef = {
		columns: [
			{
				id: "name",
				accessorFn: (row) => row.name,
				cell: (info) => info.getValue(),
				header: "Nombre",
				footer: (props) => props.column.id,
			},
			{
				id: "capacidad",
				accessorFn: (row) => row.capacidad,
				cell: (info) => info.getValue(),
				header: "Capacidad",
				footer: (props) => props.column.id,
			},
			{
				id: "initials",
				accessorFn: (row) => row.initials,
				cell: (info) => info.getValue(),
				header: "Siglas",
				footer: (props) => props.column.id,
			},
			{
				id: "Opciones",
				accessorFn: (row) => (
					<div className="flex gap-2 justify-center items-center">
						<Tooltip title={'Asignar ip a puerta'}>
							<Link
								to={`/configuracion/cajero/asignar-ip/${row.id}`}
							>
								<FileEditIcon size={15}/>
							</Link>
						</Tooltip>

					</div>
				),
				cell: (info) => info.getValue(),
				header: "Opciones",
				footer: (props) => props.column.id,
			},
		],
		rows: puertas ?? [],
	};
	return (
		<div className="flex flex-col gap-2">
			<div className="flex border-b border-gray-300 justify-between">
				<h2 className="text-gray-700 font-semibold text-lg justify-center al">
					Lista de puertas
				</h2>
			</div>
			<SGTable data={datadef}/>
		</div>
	);
}
