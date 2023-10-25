const form = {
	formId: "new-torpedo",
	formField: {
		id_tipo_estructura: {
			name: "id_tipo_estructura",
			label: "Tipo de área",
			type: "text",
			errorMsg: "Tipo de área requerida.",
		},
		nombre_estructura: {
			name: "nombre_estructura",
			label: "Nombre",
			type: "text",
			errorMsg: "El nombre es requerido.",
		},
		codigo_externo: {
			name: "codigo_externo",
			label: "Código externo",
			type: "text",
			errorMsg: "Código externo requerido.",
		},
		codigo_area: {
			name: "codigo_area",
			label: "Código área",
			type: "text",
			errorMsg: "Código área requerido.",
		},
		estructura_consejo: {
			name: "estructura_consejo",
			label: "Área consejo",
			type: "text",
			errorMsg: "Área consejo requerido.",
		},
		estructura_credencial: {
			name: "estructura_credencial",
			label: "Área credencial",
			type: "text",
			errorMsg: "Área credencial requerido.",
		},
		activo: {
			name: "activo",
			label: "Activo",
			type: "text",
			errorMsg: "Activo requerido.",
		},
	},
};
export default form;
