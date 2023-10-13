import checkout from "./form.js";

const {
	formField: {direccion, correo, telefono}
} = checkout;

const initialValues = {
	[direccion.name]: "",
	[correo.name]: "",
	[telefono.name]: ""
};

export default initialValues;
