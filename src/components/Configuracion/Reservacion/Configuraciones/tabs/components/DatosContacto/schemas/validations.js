import * as Yup from "yup";
import checkout from "./form.js";
import {emailValidation} from "@/components/auxiliar/RegexValidations.js";

const {
	formField: {direccion, correo, telefono}
} = checkout;

const validations = [
	Yup.object().shape({
		[telefono.name]: Yup.string().matches(
			/^(?:\+53 5\d{7}|\(\d{2}\) \d{7})$/,
			'Número de teléfono no válido para Cuba.'
		)
			.required(telefono.errorMsg),
		[direccion.name]: Yup.string()
			.required(direccion.errorMsg),
		[correo.name]: Yup.string().matches(
			emailValidation.regex,
			emailValidation.message
		)
			.required(correo.errorMsg).email('Debe ser un correo electrónico válido'),
	}),
];
export default validations;
