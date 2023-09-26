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
  formField: { name, active, description,active_modules },
} = checkout;

const initialValues = {
  id_institucion: 1,
  [name.name]: "",
  [active.name]: "",
  [description.name]: "",
  [active_modules.name]: [],
  
};

export default initialValues;
