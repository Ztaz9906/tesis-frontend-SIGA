const form = {
	formId: "new-torpedo",
	formField: {
		id_tipo_estructura: {
			name: "id_tipo_estructura",
			label: "Tipo de area",
			type: "text",
			errorMsg: "Tipo de area requerida.",
		},
		nombre_estructura: {
			name: "nombre_estructura",
			label: "Nombre",
			type: "text",
			errorMsg: "El nombre es requerido.",
		},
		codigo_externo: {
			name: "codigo_externo",
			label: "Codigo Externo",
			type: "text",
			errorMsg: "Codigo externo requerido.",
		},
		codigo_area: {
			name: "codigo_area",
			label: "Codigo Area",
			type: "text",
			errorMsg: "Codigo area requerido.",
		},
		estructura_consejo: {
			name: "estructura_consejo",
			label: "Area consejo",
			type: "text",
			errorMsg: "Area consejo requerido.",
		},
		estructura_credencial: {
			name: "estructura_credencial",
			label: "Area credencial",
			type: "text",
			errorMsg: "Area credencial requerido.",
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
