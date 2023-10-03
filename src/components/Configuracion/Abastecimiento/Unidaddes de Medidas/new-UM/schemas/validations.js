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
  formField: { activo, nombre_unidad_medida,
    descripcion_unidad_medida,siglas,clasificacion}
} = checkout;

const validations = [
  Yup.object().shape({
    [activo.name]: Yup.string().required(activo.errorMsg),
    [nombre_unidad_medida.name]: Yup.string().required(nombre_unidad_medida.errorMsg),
    [descripcion_unidad_medida.name]: Yup.string().required(descripcion_unidad_medida.errorMsg),
    [clasificacion.name]: Yup.string().required(clasificacion.errorMsg),
    [siglas.name]: Yup.string().required(siglas.errorMsg),
    
  }),
];
export default validations;
