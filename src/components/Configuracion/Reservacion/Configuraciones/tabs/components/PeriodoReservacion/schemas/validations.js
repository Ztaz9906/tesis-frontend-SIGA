import * as Yup from "yup";
import checkout from "./form";

const {
	formField: {periodo_reservacion}
} = checkout;

const validations = [
	Yup.object().shape({
		[periodo_reservacion.name]: Yup.number()
			.required(periodo_reservacion.errorMsg),
	}),
];
export default validations;
