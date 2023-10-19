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
  formField: { nombre_tipo_tarjeta, activo, descripcion,color},
} = checkout;

const validations = [
  Yup.object().shape({
    [nombre_tipo_tarjeta.name]: Yup.string().required(nombre_tipo_tarjeta.errorMsg),
    [activo.name]: Yup.string().required(activo.errorMsg),
    [descripcion.name]: Yup.string().required(descripcion.errorMsg),
    [color.name]: Yup.string().required(color.errorMsg),
    
  }),
];
export default validations;
