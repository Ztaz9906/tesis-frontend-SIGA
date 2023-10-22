import React, {useEffect} from "react";
import {SGTable} from "../../../auxiliar/table";
import Modal from "./components/modal.jsx";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {
	useCreateAccesoMutation,
	useEditAccesoMutation,
	useGetAccesoQuery
} from "@/components/Configuracion/Cajero/Configuraciones/service/accesos.service.js";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useSelector} from "react-redux";

export default function IndexConfiguracion() {
	const [value, setValue] = React.useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const {data, refetch} = useGetAccesoQuery(undefined, {
		refetchOnReconnect: true,
	});
	const user = useSelector((state) => state.user);
	useEffect(() => {
		refetch()
	}, [user, refetch]);

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

	useRedirectForm(
		isLoadingE,
		isSuccessE,
		isErrorE,
		errorE,
		"Cantidad de acceso editada",
	);
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
	const getCurrentDate = () => {
		const date = new Date();
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	function handleDefault() {
		createAcceso({
			'cantidad_acceso': 0,
			'fecha_registro': getCurrentDate(),
			'id_institucion': user.institucion.id,
		})
	}
    return (
        <div className="flex flex-col gap-2">
            <Box sx={{width: '100%'}}>
                <Box sx={{paddingBottom: 1}}>
                    <div className="flex"> {/* Contenedor Flex */}
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor: 'gray'
                                }
                            }}
                            sx={{flex: 1}}
                        >
                            <Tab label={'Configuraciones de acceso'} {...a11yProps(0)} sx={{
                                color: 'gray',
                                "&.Mui-selected": {color: 'gray'}
                            }}/>
                        </Tabs>
                        {(!data || Object.keys(data).length === 0) && (
                            <Button variant={'ghost'} onClick={handleDefault}>Añadir configuración por defecto</Button>
                        )}
                    </div>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <SGTable data={datadef} setFilter={false} setPagination={false}/>
                </CustomTabPanel>
            </Box>
        </div>
    );
}

function CustomTabPanel(props) {
	const {children, value, index, ...other} = props;
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<>
					{children}
				</>


			)}
		</div>
	);
}

CustomTabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

