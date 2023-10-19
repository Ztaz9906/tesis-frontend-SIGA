import checkout from "./form";

const {
	formField: {
		descripcion,
		id_categoria,
		id_categoria_residente,
		nombre_configuracion_cobro,
		precio,
		id_tipo_cobro,
		id_evento
	}
} = checkout;

const initialValuesForm1 = {
	[nombre_configuracion_cobro.name]: "",
	[descripcion.name]: "",
};
const initialValuesForm2 = {
	[precio.name]: "",
	[id_tipo_cobro.name]: "",
	[id_evento.name]: "",
	[id_categoria.name]: "",
	[id_categoria_residente.name]: "",
};

export {
	initialValuesForm1, initialValuesForm2
}
