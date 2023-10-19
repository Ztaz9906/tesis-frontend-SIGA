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
  formField: { name, active, description,active_modules},
} = checkout;

const validations = [
  Yup.object().shape({
    [name.name]: Yup.string().required(name.errorMsg),
    [active.name]: Yup.string().required(active.errorMsg),
    [description.name]: Yup.string().required(description.errorMsg),
    [active_modules.name]: Yup.array().min(1, active_modules.errorMsg).of(Yup.string()),
  }),
];
export default validations;
