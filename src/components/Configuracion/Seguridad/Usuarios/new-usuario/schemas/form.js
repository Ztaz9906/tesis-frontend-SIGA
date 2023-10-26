const form = {
	formId: "new-torpedo",
	formField: {
		username: {
			name: "username",
			label: "Nombre de usuario",
			type: "text",
			errorMsg: "El nombre de usuario es requerido.",
		},
		email: {
			name: "email",
			label: "Correo electrónico",
			type: "text",
			errorMsg: "El correo electronico es requerido.",
		},

		groups: {
			name: "groups",
			label: "Rol",
			type: "text",
			errorMsg: "Rol es requerido.",
		},

		institucion: {
			name: "institucion",
			label: "Institución",
			type: "text",
			errorMsg: "Seleccione una institucion.",
		},
		password: {
			name: "password",
			label: "Contraseña",
			type: "password",
			errorMsg: "La contraseña es requerida .",
		},
		password_confirm: {
			name: "password_confirm",
			label: "Confirmar contraseña",
			type: "password",
			errorMsg: "La contraseña es requerida .",
		},

	},
};
export default form;
