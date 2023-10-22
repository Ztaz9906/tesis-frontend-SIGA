const form = {
    formId: "new-torpedo",
    formField: {
        nombre_completo: {
            name: "nombre_completo",
            label: "Nombre",
            type: "text",
            errorMsg: "El nombre es requerido.",
        },
        ci: {
            name: "ci",
            label: "CI",
            type: "text",
            errorMsg: "El carnet de identidad es requerido.",
        },
        descripcion: {
            name: "descripcion",
            label: "Descripción",
            type: "text",
            errorMsg: "La descripción es requerida.",
        },
        id_sexo: {
            name: "id_sexo",
            label: "Sexo",
            type: "text",
            errorMsg: "Seleccione un sexo.",
        },
        id_municipio: {
            name: "id_municipio",
            label: "Municipio",
            type: "text",
            errorMsg: "Seleccione un municipio.",
        },
        id_provincia: {
            name: "id_provincia",
            label: "Provincia",
            type: "text",
            errorMsg: "Seleccione una provincia.",
        },
        id_pais: {
            name: "id_pais",
            label: "País",
            type: "text",
            errorMsg: "Seleccione un país.",
        },
    },
};

export default form;
