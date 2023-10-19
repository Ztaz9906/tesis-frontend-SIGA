import * as Yup from "yup";
import checkout from "./form";

const {
    formField: {cantidad_acceso}
} = checkout;

const validations = [
    Yup.object().shape({
        [cantidad_acceso.name]: Yup.number()
            .required(cantidad_acceso.errorMsg),
    }),
];
export default validations;
