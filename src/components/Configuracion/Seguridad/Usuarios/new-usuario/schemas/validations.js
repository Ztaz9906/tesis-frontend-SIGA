import * as Yup from "yup";
import checkout from "./form";

const {
	formField: {username, email, institucion, groups, password, password_confirm},
} = checkout;

const validations = [
	Yup.object().shape({
		[username.name]: Yup.string().required(username.errorMsg),
		[email.name]: Yup.string()
			.matches(
				/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}(\.[a-zA-Z]{2,3})?$/,
				'El correo electrónico no es válido.'
			)
			.required(email.errorMsg),
		[groups.name]: Yup.string().required(groups.errorMsg),
		[institucion.name]: Yup.string().required(institucion.errorMsg),
		[groups.name]: Yup.array()
			.of(Yup.string())
			.min(1, 'Debes seleccionar al menos un grupo')
			.required(groups.errorMsg),
		[password.name]: Yup.string()
			.required(password.errorMsg)
			.matches(
				/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/,
				"Debe tener al menos 8 caracteres, una letra mayúscula, un número y un símbolo"
			),
		[password_confirm.name]: Yup.string()
			.required(password_confirm.errorMsg)
			.oneOf([Yup.ref(password.name)], "Las contraseñas deben coincidir")
	}),
	Yup.object().shape({
		[username.name]: Yup.string().required(username.errorMsg),
		[email.name]: Yup.string()
			.matches(
				/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}(\.[a-zA-Z]{2,3})?$/,
				'El correo electrónico no es válido.'
			)
			.required(email.errorMsg),
		[groups.name]: Yup.string().required(groups.errorMsg),
		[institucion.name]: Yup.string().required(institucion.errorMsg),
		[groups.name]: Yup.array()
			.of(Yup.string())
			.min(1, 'Debes seleccionar al menos un grupo')
			.required(groups.errorMsg),
		
	}),
];
export default validations;
