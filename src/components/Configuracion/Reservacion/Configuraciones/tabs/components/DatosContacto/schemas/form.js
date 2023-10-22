const form = {
	formId: "new-torpedo",
	formField: {
		direccion: {
			name: "direccion",
			label: "Dirección",
			type: "text",
			errorMsg: "Debe poner una dirección.",
		},
		correo: {
			name: "correo",
			label: "Correo",
			type: "email",
			errorMsg: "Debe poner un correo.",
		},
		telefono: {
			name: "telefono",
			label: "Teléfono",
			type: "phone",
			errorMsg: "Debe poner un teléfono.",
		},
	},
};
export default form;
