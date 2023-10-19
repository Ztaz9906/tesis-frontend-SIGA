import * as Yup from "yup";
import checkout from "./form";

const {
	formField: {file},
} = checkout;

const validations = [
	Yup.object().shape({
		[file.name]: Yup.string().required(file.errorMsg),
		[file.name]: Yup.mixed()
			.required(file.errorMsg)
			.test(
				"fileFormat",
				"Tipo no soportado",
				value => value && ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(value.type)
			)
	}),

];
export default validations;
