const form = {
    formId: "new-torpedo",
    formField: {
        id_estado_tarjeta: {
            name: "id_estado_tarjeta",
            label: "Estado",
            type: "text",
            errorMsg: "El estado es requerido.",
        },

        id_tipo_tarjeta: {
            name: "id_tipo_tarjeta",
            label: "Tipo de tarjeta",
            type: "text",
            errorMsg: "El tipo de tarjeta es requerido",
        },
        fecha_inicio: {
            name: "fecha_inicio",
            label: "Fecha de inicio",
            type: "date",
            errorMsg: "Seleccione una fecha de inicio.",
        },
        fecha_fin: {
            name: "fecha_fin",
            label: "Fecha de fin",
            type: "date",
            errorMsg: "Seleccione una fecha de fin.",
        },
    },
};
export default form;
