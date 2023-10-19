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
  formField: { nombre_producto,
    descripcion,
    precio_cup,
    id_tipo_producto,
    id_unidad_medida},
} = checkout;

const validations = [
  Yup.object().shape({
    [nombre_producto.name]: Yup.string().required(nombre_producto.errorMsg),
    [descripcion.name]: Yup.string().required(descripcion.errorMsg),
    [precio_cup.name]: Yup.string().required(precio_cup.errorMsg),
    [id_tipo_producto.name]: Yup.number().required(id_tipo_producto.errorMsg),
    [id_unidad_medida.name]: Yup.number().required(id_unidad_medida.errorMsg),
    
    
  }),
];
export default validations;
