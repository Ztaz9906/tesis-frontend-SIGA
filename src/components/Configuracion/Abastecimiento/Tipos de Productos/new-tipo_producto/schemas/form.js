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
    nombre_tipo_producto: {
      name: "nombre_tipo_producto",
      label: "Nombre",
      type: "text",
      errorMsg: "El nombre es requerido.",
    },
    descripcion_tipo_producto: {
      name: "descripcion_tipo_producto",
      label: "Descripción",
      type: "text",
      errorMsg: "La descripción es requerida.",
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
