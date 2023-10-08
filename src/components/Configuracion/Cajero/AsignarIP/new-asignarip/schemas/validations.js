import * as Yup from "yup";
import checkout from "./form";

const {
    formField: {ip_puerta}
} = checkout;

const validations = [
    Yup.object().shape({
        [ip_puerta.name]: Yup.string()
            .matches(
                /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
                "Introduce una IP válida ej: 0.0.0.0"
            )
            .required(ip_puerta.errorMsg),
    }),
];
export default validations;
