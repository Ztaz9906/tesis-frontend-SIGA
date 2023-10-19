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
    name: {
      name: "name",
      label: "Nombre",
      type: "text",
      errorMsg: "El nombre es requerido.",
    },
    description: {
      name: "description",
      label: "Descripcion",
      type: "text",
      errorMsg: "La descripcion es requerida.",
    },

    active: {
      name: "active",
      label: "Activo",
      type: "text",
      errorMsg: "Activo es requerido.",
    },
    
    active_modules: {
      name: "active_modules",
      label: "Modulos",
      type: "text",
      errorMsg: "Seleccione los modulos activos para esta institucion.",
    },
  },
};
export default form;

//Distribucion_TbNdiaSemana