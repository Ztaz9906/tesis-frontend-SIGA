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

import * as Yup from "yup";
import checkout from "./form";

const {
	formField: {
		name,
		active,
		initials,
		estructura_parent,
		version,
		description,
		capacidad,
		centro_costo,
		category,
		id_sub_director,
		id_tecnico_general,
		id_especialista_complejo
	},
} = checkout;

const validations = [
	Yup.object().shape({
			[name.name]: Yup.string().required(name.errorMsg),
			[initials.name]: Yup.string().required(initials.errorMsg),
			[capacidad.name]: Yup.number()
				.min(0, 'La cantidad no puede menor que 0')
				.required(capacidad.errorMsg),
			[description.name]: Yup.string().required(description.errorMsg),
			[active.name]: Yup.string().required(active.errorMsg),
			[category.name]: Yup.string().required(category.errorMsg),
		}
	),
];
export const SettingsValidations = [
	Yup.object().shape(
		{

			[centro_costo.name]: Yup.string().required(centro_costo.errorMsg),
			[id_sub_director.name]: Yup.string().required(id_sub_director.errorMsg),
			[id_tecnico_general.name]: Yup.string().required(id_tecnico_general.errorMsg),
			[id_especialista_complejo.name]: Yup.string().required(id_especialista_complejo.errorMsg),
		}
	),
];
export default validations;
