import checkout from "./form";

const {
	formField: {username, email, institucion, groups, password, password_confirm},
} = checkout;

const initialValues = {
	[username.name]: "",
	[email.name]: "",
	[institucion.name]: "",
	[groups.name]: "",
	[password.name]: '',
	[password_confirm.name]: '',
};
export const initialValuesEdit = {
	[username.name]: "",
	[email.name]: "",
	[institucion.name]: "",
	[groups.name]: "",
};
export default initialValues;
