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
  formField: { nombre_horario, activo, hora_fin,hora_inicio,dias_semana },
} = checkout;

const initialValues = {
  id_institucion: 1,
  [nombre_horario.name]: "",
  [activo.name]: "",
  [hora_fin.name]: "",
  [hora_inicio.name]: "",
  [dias_semana.name]: [],
  
};

export default initialValues;
