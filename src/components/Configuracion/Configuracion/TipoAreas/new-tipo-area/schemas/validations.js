import * as Yup from "yup";
import checkout from "./form";

const {
	formField: {nombre_tipo_estructura, activo, descripcion_tipo_estructura},
} = checkout;

const validations = [
	Yup.object().shape({
		[nombre_tipo_estructura.name]: Yup.string().required(nombre_tipo_estructura.errorMsg),
		[activo.name]: Yup.string().required(activo.errorMsg),
		[descripcion_tipo_estructura.name]: Yup.string().required(descripcion_tipo_estructura.errorMsg),
	}),
];
export default validations;
