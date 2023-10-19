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
  formField: { name, active, initials,estructura_parent,description,capacidad,centro_costo,category,id_sub_director,id_tecnico_general,id_especialista_complejo},
} = checkout;
const getCurrentTimestamp = () => {
  return new Date().toISOString();
}
const initialValues = {
  created_at: getCurrentTimestamp(),
  [name.name]: "",
  [initials.name]: "",
  [active.name]: "",
  [estructura_parent.name]: '',
  [description.name]: '',
  [capacidad.name]: '',
  [centro_costo.name]: '',
  [category.name]: '',
  [id_sub_director.name]: '',
  [id_tecnico_general.name]: '',
  [id_especialista_complejo.name]: '',

};
export const initialValuesSettings = {
  created_at: getCurrentTimestamp(),
  [centro_costo.name]: '',
  [id_sub_director.name]: '',
  [id_tecnico_general.name]: '',
  [id_especialista_complejo.name]: '',

};

export default initialValues;
