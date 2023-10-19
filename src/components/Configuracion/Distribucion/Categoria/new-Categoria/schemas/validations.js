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
  formField: { name, active, description,color,base},
} = checkout;

const validations = [
  Yup.object().shape({
    [name.name]: Yup.string().required(name.errorMsg),
    [active.name]: Yup.string().required(active.errorMsg),
    [description.name]: Yup.string().required(description.errorMsg),
    [color.name]: Yup.string().required(color.errorMsg),
    [base.name]: Yup.string().required(base.errorMsg),
  }),
];
export default validations;
