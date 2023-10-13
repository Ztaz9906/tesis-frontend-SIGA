import * as Yup from "yup";
import checkout from "./form.js";

const {
	formField: {direccion, correo, telefono}
} = checkout;

const validations = [
	Yup.object().shape({
		[telefono.name]: Yup.string()
			.required(telefono.errorMsg),
		[direccion.name]: Yup.string()
			.required(direccion.errorMsg),
		[correo.name]: Yup.string()
			.required(correo.errorMsg).email('Debe ser un correo electrónico válido'),
	}),
];
export default validations;
