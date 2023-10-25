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
      label: "Hora de inicio",
      type: "time",
      errorMsg: "Seleccione una hora de inicio.",
    },

    activo: {
      name: "activo",
      label: "Activo",
      type: "text",
      errorMsg: "Activo es requerido.",
    },
    hora_fin: {
      name: "hora_fin",
      label: "Hora de fin",
      type: "time",
      errorMsg: "Seleccione una hora de fin.",
    },
    dias_semana: {
      name: "dias_semana",
      label: "Días",
      type: "text",
      errorMsg: "Seleccione días de la semana para este horario.",
    },
  },
};
export default form;

//Distribucion_TbNdiaSemana