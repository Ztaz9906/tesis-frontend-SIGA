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
    }
} = checkout;

const initialValues = {
    [nombre_completo.name]: "",
    [descripcion.name]: "",
    [ci.name]: "",
    [id_municipio.name]: "",
    [id_provincia.name]: "",
    [id_sexo.name]: "",
    [id_pais.name]: "",
};

export default initialValues;
