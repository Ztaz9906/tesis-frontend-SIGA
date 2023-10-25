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
    initials: {
      name: "initials",
      label: "Iniciales",
      type: "text",
      errorMsg: "Iniciales requeridas.",
    },

    active: {
      name: "active",
      label: "Activo",
      type: "text",
      errorMsg: "Activo es requerido.",
    },
    estructura_parent: {
      name: "estructura_parent",
      label: "Padre",
      type: "text",
      errorMsg: "Seleccione un padre.",
    },
    description: {
      name: "description",
      label: "Descripción",
      type: "text",
      errorMsg: "La descripción es requerida.",
    },
    capacidad: {
      name: "capacidad",
      label: "Capacidad",
      type: "number",
      errorMsg: "La capacidad es requerida.",
    },
    centro_costo: {
      name: "centro_costo",
      label: "Centro Costo",
      type: "text",
      errorMsg: "El centro costo es requerido.",
    },
    category: {
      name: "category",
      label: "Categoría",
      type: "text",
      errorMsg: "Seleccione una categoría.",
    },
    id_sub_director: {
      name: "id_sub_director",
      label: "Sub-Director",
      type: "text",
      errorMsg: "Seleccione un Sub-Director.",
    },
    id_tecnico_general: {
      name: "id_tecnico_general",
      label: "Técnico General",
      type: "text",
      errorMsg: "Seleccione un Técnico General.",
    },
    id_especialista_complejo: {
      name: "id_especialista_complejo",
      label: "Especialista de Complejo",
      type: "text",
      errorMsg: "Seleccione un Especialista de Complejo.",
    },
    
  },
};
export default form;
