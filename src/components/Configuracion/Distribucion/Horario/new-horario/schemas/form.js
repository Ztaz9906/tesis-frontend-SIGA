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
    nombre_horario: {
      name: "nombre_horario",
      label: "Nombre",
      type: "text",
      errorMsg: "El nombre es requerido.",
    },
    hora_inicio: {
      name: "hora_inicio",
      label: "Hora de Inicio",
      type: "text",
      errorMsg: "La clave es requerida.",
    },

    activo: {
      name: "activo",
      label: "Activo",
      type: "text",
      errorMsg: "Activo es requerido.",
    },
    hora_fin: {
      name: "hora_fin",
      label: "Hora de Fin",
      type: "text",
      errorMsg: "Seleccione un color.",
    },
  },
};
export default form;
