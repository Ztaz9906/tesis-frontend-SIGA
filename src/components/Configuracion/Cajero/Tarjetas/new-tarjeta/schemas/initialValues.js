import checkout from "./form";

const {
    formField: {
        id_estado_tarjeta,
        id_tipo_tarjeta,
        fecha_fin,
        fecha_inicio,
    }
} = checkout;

const initialValues = {

    [id_estado_tarjeta.name]: "",
    [id_tipo_tarjeta.name]: "",
    [fecha_fin.name]: "",
    [fecha_inicio.name]: "",
};

export default initialValues;
