import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import React from "react";
import PeriodoReservacion from "@/components/Configuracion/Reservacion/Configuraciones/tabs/periodo.reservacion.jsx";
import ElementosMostrar from "@/components/Configuracion/Reservacion/Configuraciones/tabs/elementos.mostrar.jsx";
import DatosContacto from "@/components/Configuracion/Reservacion/Configuraciones/tabs/datos.contacto.jsx";

export default function IndexConfiguracionReservacion() {
	const [value, setValue] = React.useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className="flex flex-col gap-2">
			<Box sx={{width: '100%'}}>
				<Box sx={{paddingBottom: 1}}>
					<div className="flex justify-between"> {/* Contenedor Flex */}
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

							<Tab label={'Período de Reservación'} {...a11yProps(0)} sx={{
								color: 'gray',
								"&.Mui-selected": {color: 'gray'}
							}}/>
							<Tab label={'Elementos a mostrar'} {...a11yProps(1)} sx={{
								color: 'gray',
								"&.Mui-selected": {color: 'gray'}
							}}/>
							<Tab label={'Datos de contacto'} {...a11yProps(2)} sx={{
								color: 'gray',
								"&.Mui-selected": {color: 'gray'}
							}}/>
						</Tabs>
					</div>
				</Box>
				<CustomTabPanel value={value} index={0}>
					<PeriodoReservacion/>
				</CustomTabPanel>
				<CustomTabPanel value={value} index={1}>
					<ElementosMostrar/>
				</CustomTabPanel>
				<CustomTabPanel value={value} index={2}>
					<DatosContacto/>
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

