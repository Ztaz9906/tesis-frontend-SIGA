const form = {
	form1Id: "new-confcomensal",
	form2Id: "new-valorconfcomensal",
	formField: {
		descripcion: {
			name: "descripcion",
			label: "Descripción",
			type: "text",
			errorMsg: "La descripción es requerida.",
		},
		id_estructura: {
			name: "id_estructura",
			label: "Áreas",
			type: "text",
			errorMsg: "Seleccione un área",
		},
		id_categoria_residente: {
			name: "id_categoria_residente",
			label: "Residente",
			type: "text",
			errorMsg: "Seleccione un residente",
		},
		id_categoria: {
			name: "id_categoria",
			label: "Categoría",
			type: "text",
			errorMsg: "La categoría es requerida.",
		}
	},
};
export default form;
