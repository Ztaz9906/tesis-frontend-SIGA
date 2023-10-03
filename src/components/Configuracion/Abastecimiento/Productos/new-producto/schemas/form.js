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
    nombre_producto: {
      name: "nombre_producto",
      label: "Nombre",
      type: "text",
      errorMsg: "El nombre es requerido.",
    },
    
    descripcion: {
      name: "descripcion",
      label: "Descripcion",
      type: "text",
      errorMsg: "La descripcion es requerida.",
    },
    
    precio_cup: {
      name: "precio_cup",
      label: "Precio",
      type: "number",
      errorMsg: "El precio es requerido.",
    },
    
    id_tipo_producto: {
      name: "id_tipo_producto",
      label: "Tipo Producto",
      type: "text",
      errorMsg: "Seleccione un Tipo Producto.",
    },
    
    id_unidad_medida: {
      name: "id_unidad_medida",
      label: "Unidad Medida",
      type: "text",
      errorMsg: "Seleccione una Unidad Medida.",
    },
  },
};
export default form;
