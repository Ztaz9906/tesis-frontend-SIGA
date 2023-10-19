import checkout from "./form";

const {
	formField: {descripcion, id_categoria, id_categoria_residente, id_estructura}
} = checkout;

const initialValuesForm1 = {
	[descripcion.name]: "",
	[id_categoria.name]: "",
	[id_categoria_residente.name]: "",
	[id_estructura.name]: "",
};

export {
	initialValuesForm1
}
