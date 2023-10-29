import * as Yup from "yup";
import checkout from "./form";
import {OnlyLetters} from "@/components/auxiliar/RegexValidations.js";

const {
	formField: {
		activo, nombre_clasificacion_plato,
		descripcion_clasificacion_plato
	},
} = checkout;

const validations = [
	Yup.object().shape({
		[activo.name]: Yup.string().required(activo.errorMsg),
		[nombre_clasificacion_plato.name]: Yup.string().matches(OnlyLetters.regex, OnlyLetters.message).required(nombre_clasificacion_plato.errorMsg),
		[descripcion_clasificacion_plato.name]: Yup.string().required(descripcion_clasificacion_plato.errorMsg),

	}),
];
export default validations;
