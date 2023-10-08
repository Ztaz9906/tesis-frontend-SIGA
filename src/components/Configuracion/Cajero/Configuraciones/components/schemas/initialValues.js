import checkout from "./form";

const {
    formField: {cantidad_acceso}
} = checkout;

const initialValues = {
    [cantidad_acceso.name]: ""
};

export default initialValues;
