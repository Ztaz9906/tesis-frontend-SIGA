import * as Yup from "yup";
import checkout from "./form";

const {
	formField: {
		activo,
		estructura_credencial,
		estructura_consejo,
		codigo_area,
		codigo_externo,
		nombre_estructura,
		id_tipo_estructura
	},
} = checkout;

const validations = [
	Yup.object().shape({
		[activo.name]: Yup.string().required(activo.errorMsg),
		[estructura_credencial.name]: Yup.string().required(estructura_credencial.errorMsg),
		[estructura_consejo.name]: Yup.string().required(estructura_consejo.errorMsg),
		[codigo_area.name]: Yup.string().required(codigo_area.errorMsg),
		[codigo_externo.name]: Yup.string().required(codigo_externo.errorMsg),
		[nombre_estructura.name]: Yup.string().required(nombre_estructura.errorMsg),
		[id_tipo_estructura.name]: Yup.string().required(id_tipo_estructura.errorMsg),

	}),
];
export default validations;
