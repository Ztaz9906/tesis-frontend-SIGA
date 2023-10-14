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
	}
} = checkout;

const initialValues = {

	[activo.name]: "",
	[estructura_credencial.name]: "",
	[estructura_consejo.name]: "",
	[codigo_area.name]: "",
	[codigo_externo.name]: "",
	[nombre_estructura.name]: "",
	[id_tipo_estructura.name]: "",

};

export default initialValues;
