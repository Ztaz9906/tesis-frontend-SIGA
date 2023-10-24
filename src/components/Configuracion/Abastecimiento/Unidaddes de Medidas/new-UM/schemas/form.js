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
    nombre_unidad_medida: {
      name: "nombre_unidad_medida",
      label: "Nombre",
      type: "text",
      errorMsg: "El nombre es requerido.",
    },
    descripcion_unidad_medida: {
      name: "descripcion_unidad_medida",
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
    siglas: {
      name: "siglas",
      label: "Siglas",
      type: "text",
      errorMsg: "Las siglas son requeridas.",
    },
    clasificacion: {
      name: "clasificacion",
      label: "Clasificación",
      type: "text",
      errorMsg: "La clasificación es requerida",
    },

    
  },
};
export default form;
