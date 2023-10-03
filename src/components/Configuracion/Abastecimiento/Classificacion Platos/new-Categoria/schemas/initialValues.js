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
  formField: { activo, nombre_clasificacion_plato,
    descripcion_clasificacion_plato},
} = checkout;

const initialValues = {
  [activo.name]: "",
  [nombre_clasificacion_plato.name]: "",
  [descripcion_clasificacion_plato.name]: "",
};

export default initialValues;
