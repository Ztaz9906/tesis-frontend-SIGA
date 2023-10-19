import * as Yup from "yup";
import checkout from "./form";

const {
	formField: {elementos_mostrar_calendario}
} = checkout;

const validations = [
	Yup.object().shape({
		[elementos_mostrar_calendario.name]: Yup.number()
			.required(elementos_mostrar_calendario.errorMsg),
	}),
];
export default validations;
