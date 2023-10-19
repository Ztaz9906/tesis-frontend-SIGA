const form = {
	formId: "new-torpedo",
	formField: {
		direccion: {
			name: "direccion",
			label: "Direccion",
			type: "text",
			errorMsg: "Debe poner una direccion.",
		},
		correo: {
			name: "correo",
			label: "Correo",
			type: "email",
			errorMsg: "Debe poner un correo.",
		},
		telefono: {
			name: "telefono",
			label: "Telefono",
			type: "phone",
			errorMsg: "Debe poner un telefono.",
		},
	},
};
export default form;
