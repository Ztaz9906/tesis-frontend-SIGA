import * as Yup from "yup";
import checkout from "./form";

const {
	formField: {descripcion, id_categoria, id_categoria_residente, id_estructura},
} = checkout;

const validations = [
	Yup.object().shape({
		[descripcion.name]: Yup.string().required(descripcion.errorMsg),
	}),
];
export default validations;
