import * as Yup from "yup";
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
	},
} = checkout;
export const validacionValoresConfiguracion = Yup.object().shape({
	[precio.name]: Yup.string().required(precio.errorMsg),
	[id_tipo_cobro.name]: Yup.string().required(id_tipo_cobro.errorMsg),
	[id_categoria.name]: Yup.string().required(id_categoria.errorMsg),
	[id_evento.name]: Yup.string().required(id_evento.errorMsg),
	[id_categoria_residente.name]: Yup.string().required(id_categoria_residente.errorMsg),
});

export const validacionConfiguracionCobro = Yup.object().shape({
	[nombre_configuracion_cobro.name]: Yup.string().required(nombre_configuracion_cobro.errorMsg),
	[descripcion.name]: Yup.string().required(descripcion.errorMsg),
});

