const form = {
	formId: "new-torpedo",
	formField: {
		nombre_tipo_estructura: {
			name: "nombre_tipo_estructura",
			label: "Nombre",
			type: "text",
			errorMsg: "El nombre es requerido.",
		},
		descripcion_tipo_estructura: {
			name: "descripcion_tipo_estructura",
			label: "Descripción",
			type: "text",
			errorMsg: "La descripción es requerida.",
		},
		activo: {
			name: "activo",
			label: "Activo",
			type: "text",
			errorMsg: "Activo es requerido.",
		}
	},
};
export default form;
