import * as Yup from "yup";
import checkout from "./form";
import {CIvalidation, OnlyLetters} from "@/components/auxiliar/RegexValidations.js";

const {
	formField: {
		nombre_completo,
		ci,
		descripcion,
		id_sexo,
		id_municipio,
		id_pais,
		id_provincia
	},
} = checkout;

const validations = [
	Yup.object().shape({
		[nombre_completo.name]: Yup.string().matches(OnlyLetters.regex, OnlyLetters.message).required(nombre_completo.errorMsg),
		[descripcion.name]: Yup.string().required(descripcion.errorMsg),
		[ci.name]: Yup.string()
			.required(ci.errorMsg)
			.matches(
				CIvalidation.regex,
				CIvalidation.message
			)
			.length(11, 'El carnet de identidad debe tener 11 dígitos'),
		[id_sexo.name]: Yup.number().required(id_sexo.errorMsg),
		[id_municipio.name]: Yup.number().required(id_municipio.errorMsg),
		[id_pais.name]: Yup.number().required(id_pais.errorMsg),
		[id_provincia.name]: Yup.number().required(id_provincia.errorMsg),
	}),
];
export default validations;
