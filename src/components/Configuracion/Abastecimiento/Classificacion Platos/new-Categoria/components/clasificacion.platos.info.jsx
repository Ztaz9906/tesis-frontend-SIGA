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

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";
import { MenuItem } from "@mui/material";
import FormField from "../../../../../auxiliar/FormField";

export default function AddClassPlatos({ formData }) {
  const { formField, values, errors, touched } = formData;
  const {
    activo,
    nombre_clasificacion_plato,
    descripcion_clasificacion_plato,
  } = formField;
  const {
    descripcion_clasificacion_plato: descripcion_clasificacion_platoV,
    activo: activoV,
    nombre_clasificacion_plato: nombre_clasificacion_platoV,
  } = values;

  return (
    <div className="p-4">
      <div className="flex flex-wrap -mx-3">
        <div className="w-full sm:w-1/2 px-3">
          <FormField
            type={nombre_clasificacion_plato.type}
            label={nombre_clasificacion_plato.label}
            name={nombre_clasificacion_plato.name}
            value={nombre_clasificacion_platoV}
            placeholder={nombre_clasificacion_plato.placeholder}
            error={
              errors.nombre_clasificacion_plato &&
              touched.nombre_clasificacion_plato
            }
          />
        </div>
        <div className="w-full sm:w-1/2 px-3">
          <FormField
            select
            label={activo.label}
            name={activo.name}
            value={activoV}
            placeholder={activo.placeholder}
            error={errors.activo && touched.activo}
          >
            <MenuItem value={""} selected disabled>
              --Seleccione--
            </MenuItem>
            <MenuItem value={true}>Si</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </FormField>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3">
        <div className="w-full px-3">
          <FormField
            multiline
            type={descripcion_clasificacion_plato.type}
            label={descripcion_clasificacion_plato.label}
            name={descripcion_clasificacion_plato.name}
            value={descripcion_clasificacion_platoV}
            placeholder={descripcion_clasificacion_plato.placeholder}
            error={
              errors.descripcion_clasificacion_plato &&
              touched.descripcion_clasificacion_plato
            }
          />
        </div>
      </div>
    </div>
  );
}

// typechecking props for UserInfo
AddClassPlatos.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};
