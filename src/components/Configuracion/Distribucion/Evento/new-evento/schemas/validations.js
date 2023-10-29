import * as Yup from "yup";
import checkout from "./form";
import {OnlyLetters} from "@/components/auxiliar/RegexValidations.js";

const {
	formField: {nombre_evento, descripcion_evento, activo, id_clasificacion_evento, id_horario},
} = checkout;

const validations = [
	Yup.object().shape({
		[nombre_evento.name]: Yup.string().matches(OnlyLetters.regex, OnlyLetters.message).required(nombre_evento.errorMsg),
		[descripcion_evento.name]: Yup.string().required(descripcion_evento.errorMsg),
		[activo.name]: Yup.string().required(activo.errorMsg),
		[id_clasificacion_evento.name]: Yup.string().required(id_clasificacion_evento.errorMsg),
		[id_horario.name]: Yup.string().required(id_horario.errorMsg),
	}),
];
export default validations;
