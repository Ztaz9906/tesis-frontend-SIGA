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

const form = {
  formId: "new-torpedo",
  formField: {
    nombre: {
      name: "nombre",
      label: "Nombre",
      type: "text",
      errorMsg: "El nombre es requerido.",
    },
    clave: {
      name: "clave",
      label: "Descripcion",
      type: "text",
      errorMsg: "La clave es requerida.",
    },

    activo: {
      name: "activo",
      label: "Activo",
      type: "text",
      errorMsg: "Activo es requerido.",
    },
  },
};

export default form;
