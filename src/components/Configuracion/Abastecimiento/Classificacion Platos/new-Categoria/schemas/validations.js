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
  formField: { activo, nombre_clasificacion_plato,
    descripcion_clasificacion_plato},
} = checkout;

const validations = [
  Yup.object().shape({
    [activo.name]: Yup.string().required(activo.errorMsg),
    [nombre_clasificacion_plato.name]: Yup.string().required(nombre_clasificacion_plato.errorMsg),
    [descripcion_clasificacion_plato.name]: Yup.string().required(descripcion_clasificacion_plato.errorMsg),
    
  }),
];
export default validations;
