const form = {
	form1Id: "new-confcomensal",
	form2Id: "new-valorconfcomensal",
	formField: {
		descripcion: {
			name: "descripcion",
			label: "Descripcion",
			type: "text",
			errorMsg: "La Descripcion es requerida.",
		},
		id_estructura: {
			name: "id_estructura",
			label: "Areas",
			type: "text",
			errorMsg: "Areas es requerido.",
		},
		id_categoria_residente: {
			name: "id_categoria_residente",
			label: "Residente",
			type: "text",
			errorMsg: "Residente es requerido.",
		},
		id_categoria: {
			name: "id_categoria",
			label: "Categoria",
			type: "text",
			errorMsg: "Categoria es requerida.",
		}
	},
};
export default form;
