import checkout from "./form.js";

const {
	formField: {elementos_mostrar_reservacion}
} = checkout;

const initialValues = {
	[elementos_mostrar_reservacion.name]: ""
};

export default initialValues;
