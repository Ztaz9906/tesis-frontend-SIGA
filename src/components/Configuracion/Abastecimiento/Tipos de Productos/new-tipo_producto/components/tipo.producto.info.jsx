import PropTypes from "prop-types";
import { MenuItem } from "@mui/material";
import FormField from "../../../../../auxiliar/FormField";

export default function AddTipoProducto({ formData }) {
  const { formField, values, errors, touched } = formData;
  const { activo, nombre_tipo_producto, descripcion_tipo_producto } = formField;
  const {
    descripcion_tipo_producto: descripcion_tipo_productoV,
    activo: activoV,
    nombre_tipo_producto: nombre_tipo_productoV,
  } = values;

  return (
    <div className="p-4">
      <div className="flex flex-wrap -mx-3">
        <div className="w-full sm:w-1/2 px-3">
          <FormField
            type={nombre_tipo_producto.type}
            label={nombre_tipo_producto.label}
            name={nombre_tipo_producto.name}
            value={nombre_tipo_productoV}
            placeholder={nombre_tipo_producto.placeholder}
            error={errors.nombre_tipo_producto && touched.nombre_tipo_producto}
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
            type={descripcion_tipo_producto.type}
            label={descripcion_tipo_producto.label}
            name={descripcion_tipo_producto.name}
            value={descripcion_tipo_productoV}
            placeholder={descripcion_tipo_producto.placeholder}
            error={
              errors.descripcion_tipo_producto &&
              touched.descripcion_tipo_producto
            }
          />
        </div>
      </div>
    </div>
  );
}

// typechecking props for UserInfo
AddTipoProducto.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};
