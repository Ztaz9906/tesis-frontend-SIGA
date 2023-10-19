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
        nombre_completo,
        ci,
        descripcion,
        id_sexo,
        id_municipio,
        id_pais,
        id_provincia
    },
} = checkout;

const validations = [
    Yup.object().shape({
        [nombre_completo.name]: Yup.string().required(nombre_completo.errorMsg),
        [descripcion.name]: Yup.string().required(descripcion.errorMsg),
        [ci.name]: Yup.string()
            .required(ci.errorMsg)
            .matches(
                /^\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])\d{5}$/,
                'Formato del carnet de identidad no válido'
            )
            .length(11, 'El carnet de identidad debe tener 11 dígitos'),
        [id_sexo.name]: Yup.number().required(id_sexo.errorMsg),
        [id_municipio.name]: Yup.number().required(id_municipio.errorMsg),
        [id_pais.name]: Yup.number().required(id_pais.errorMsg),
        [id_provincia.name]: Yup.number().required(id_provincia.errorMsg),
    }),
];
export default validations;
