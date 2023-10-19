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
  formField: { nombre_producto,
    descripcion,
    precio_cup,
    id_tipo_producto,
    id_unidad_medida},
} = checkout;

const initialValues = {
  [nombre_producto.name]: "",
  [descripcion.name]: "",
  [precio_cup.name]: "",
  [id_tipo_producto.name]: "",
  [id_unidad_medida.name]: "",
};

export default initialValues;
