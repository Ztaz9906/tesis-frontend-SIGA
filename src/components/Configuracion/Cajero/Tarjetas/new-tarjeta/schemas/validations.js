/**
 =========================================================
 * Material Dashboard 2 PRO React - v2.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
 * Copyright 2022 Creative Tim (https://www.creative-tim.com)

 Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

import * as Yup from "yup";
import checkout from "./form";

const {
    formField: {
        id_estado_tarjeta,
        id_tipo_tarjeta,
        fecha_fin,
        fecha_inicio,
    },
} = checkout;

const validations = [
    Yup.object().shape({
        [id_estado_tarjeta.name]: Yup.string().required(id_estado_tarjeta.errorMsg),
        [id_tipo_tarjeta.name]: Yup.string().required(id_tipo_tarjeta.errorMsg),
        [fecha_fin.name]: Yup.string().required(fecha_fin.errorMsg),
        [fecha_inicio.name]: Yup.string().required(fecha_inicio.errorMsg),

    }),
];
export default validations;
