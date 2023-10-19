import checkout from "./form";

const {
	formField: {file},
} = checkout;

const initialValues = {
	[file.name]: "",
};

export default initialValues;
