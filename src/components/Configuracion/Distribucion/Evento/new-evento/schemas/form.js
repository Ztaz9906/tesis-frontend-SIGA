const form = {
	formId: "new-torpedo",
	formField: {
		nombre_evento: {
			name: "nombre_evento",
			label: "Nombre",
			type: "text",
			errorMsg: "El nombre es requerido.",
		},
		descripcion_evento: {
			name: "descripcion_evento",
			label: "Descripción",
			type: "text",
			errorMsg: "La descripción es requerida.",
		},
		activo: {
			name: "activo",
			label: "Activo",
			type: "text",
			errorMsg: "Activo es requerido.",
		},
		id_clasificacion_evento: {
			name: "id_clasificacion_evento",
			label: "Clasificación",
			type: "text",
			errorMsg: "Clasificación requerida.",
		},
		id_horario: {
			name: "id_horario",
			label: "Horario",
			type: "text",
			errorMsg: "Horario requerido.",
		},
		evento_padre: {
			name: "evento_padre",
			label: "Evento padre",
			type: "text",
		},
	},
};
export default form;
