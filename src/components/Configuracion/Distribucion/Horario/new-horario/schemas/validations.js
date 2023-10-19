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
  formField: { nombre_horario, activo, hora_fin,hora_inicio,dias_semana},
} = checkout;

const validations = [
  Yup.object().shape({
    [nombre_horario.name]: Yup.string().required(nombre_horario.errorMsg),
    [activo.name]: Yup.string().required(activo.errorMsg),
    [hora_fin.name]: Yup.string().required(hora_fin.errorMsg),
    [hora_inicio.name]: Yup.string().required(hora_inicio.errorMsg),
    [dias_semana.name]: Yup.array().min(1, dias_semana.errorMsg).of(Yup.string()),
  }),
];
export default validations;
