import checkout from "./form";

const {
	formField: {nombre_tipo_estructura, activo, descripcion_tipo_estructura},
} = checkout;

const initialValues = {
	[nombre_tipo_estructura.name]: "",
	[activo.name]: "",
	[descripcion_tipo_estructura.name]: "",
};

export default initialValues;
