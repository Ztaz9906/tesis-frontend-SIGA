import checkout from "./form";

const {
	formField: {periodo_reservacion}
} = checkout;

const initialValues = {
	[periodo_reservacion.name]: ""
};

export default initialValues;
