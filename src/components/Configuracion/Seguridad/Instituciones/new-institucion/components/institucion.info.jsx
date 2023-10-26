/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";
import {Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select,} from "@mui/material";
import FormField from "../../../../../auxiliar/FormField";
import {useState} from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};
const modulo = [
	{
		label: "Abastecimiento", value: "abastecimiento",
	},
	{
		label: "Cajero", value: "cajero"
	},
	{
		label: "Reservación", value: "reservacion"
	},
	{
		label: "Facturación", value: "facturacion"
	},
	{
		label: "Configuración", value: "configuracion"
	},
	{label: "Distribución", value: "distribucion"},
];
export default function AddInstitucion({formData}) {
	const [modulos, setModulos] = useState([]);
	const {formField, values, errors, touched} = formData;
	const {name, active, description, active_modules} = formField;
	const {
		name: nameV,
		description: descriptionV,
		active: activeV,
		active_modules: active_modulesV,
	} = values;
	return (
		<div className="p-4">
			<div className="flex flex-wrap -mx-3">
				<div className="w-full px-3">
					<FormField
						type={name.type}
						label={name.label}
						name={name.name}
						value={nameV}
						placeholder={name.placeholder}
						error={errors.name && touched.name}
					/>
				</div>
			</div>
			<div className="flex flex-wrap -mx-3">
				<div className="w-full px-3">
					<FormField
						select
						label={active.label}
						name={active.name}
						value={activeV}
						placeholder={active.placeholder}
						error={errors.active && touched.active}
					>
						<MenuItem value={""} selected disabled>
							--Seleccione--
						</MenuItem>
						<MenuItem value={true}>Si</MenuItem>
						<MenuItem value={false}>No</MenuItem>
					</FormField>
				</div>
			</div>
			<div className="flex flex-wrap -mx-3">
				<div className="w-full px-3">
					<FormField
						multiline
						type={description.type}
						label={description.label}
						name={description.name}
						value={descriptionV}
						placeholder={description.placeholder}
						error={errors.description && touched.description}
					/>
				</div>
			</div>
			<div className="flex flex-wrap -mx-3">
				<FormControl className="w-full px-3">
					<InputLabel id="active_modules">Módulos</InputLabel>
					<FormField
						labelId="active_modules"
						as={Select}
						multiple
						name={active_modules.name}
						value={active_modulesV}
						input={<OutlinedInput label="Módulos"/>}
						placeholder={active_modules.placeholder}
						error={errors.active_modules && touched.active_modules}
						renderValue={(selected) => selected.map(value => modulo.find(item => item.value === value)?.label || value).join(", ")}
						MenuProps={MenuProps}
					>
						<MenuItem value={""} selected disabled>
							--Seleccione--
						</MenuItem>
						{modulo.map((item) => (
							<MenuItem key={item.value} value={item.value}>
								<Checkbox checked={active_modulesV.indexOf(item.value) > -1}/>
								<ListItemText primary={item.label}/>
							</MenuItem>
						))}
					</FormField>
				</FormControl>

			</div>
		</div>
	);
}

// typechecking props for UserInfo
AddInstitucion.propTypes = {
	formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};
