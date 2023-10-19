import checkout from "./form";

const {
	formField: {evento_padre, nombre_evento, descripcion_evento, activo, id_clasificacion_evento, id_horario},
} = checkout;

const initialValues = {

	[nombre_evento.name]: "",
	[evento_padre.name]: "",
	[descripcion_evento.name]: "",
	[activo.name]: "",
	[id_clasificacion_evento.name]: "",
	[id_horario.name]: "",
};

export default initialValues;
