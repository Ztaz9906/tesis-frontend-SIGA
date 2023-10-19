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
  formField: { nombre_tipo_tarjeta, activo, descripcion,color},
} = checkout;

const initialValues = {

  [nombre_tipo_tarjeta.name]: "",
  [activo.name]: "",
  [descripcion.name]: "",
  [color.name]: "#32c5c8",
};

export default initialValues;
