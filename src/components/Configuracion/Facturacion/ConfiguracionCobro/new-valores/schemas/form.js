const form = {
	form1Id: "new-confcomensal",
	form2Id: "new-valorconfcomensal",
	formField: {
		nombre_configuracion_cobro: {
			name: "nombre_configuracion_cobro",
			label: "Nombre",
			type: "text",
			errorMsg: "Nombre es requerido.",
		},
		descripcion: {
			name: "descripcion",
			label: "Descripción",
			type: "text",
			errorMsg: "La descripción es requerida.",
		},
		precio: {
			name: "precio",
			label: "Precio",
			type: "text",
			errorMsg: "Precio es requerido.",
		},
		id_tipo_cobro: {
			name: "id_tipo_cobro",
			label: "Tipo de cobro",
			type: "text",
			errorMsg: "Tipo Cobro es requerido.",
		},
		id_evento: {
			name: "id_evento",
			label: "Evento",
			type: "text",
			errorMsg: "Evento es requerido.",
		},
		id_categoria_residente: {
			name: "id_categoria_residente",
			label: "Residente",
			type: "text",
			errorMsg: "Residente es requerido.",
		},
		id_categoria: {
			name: "id_categoria",
			label: "Categoría",
			type: "text",
			errorMsg: "Categoría es requerida.",
		}
	},
};
export default form;
