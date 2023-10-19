import * as Yup from "yup";
import checkout from "./form.js";

const {
	formField: {elementos_mostrar_reservacion}
} = checkout;

const validations = [
	Yup.object().shape({
		[elementos_mostrar_reservacion.name]: Yup.number()
			.required(elementos_mostrar_reservacion.errorMsg),
	}),
];
export default validations;
