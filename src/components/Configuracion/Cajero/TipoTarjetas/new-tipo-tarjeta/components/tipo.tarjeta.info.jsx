import PropTypes from "prop-types";
import { MenuItem } from "@mui/material";
import FormField from "../../../../../auxiliar/FormField";

export default function AddTipoTarjeta({ formData }) {
  const { formField, values, errors, touched } = formData;
  const { nombre_tipo_tarjeta, activo, descripcion, color } = formField;
  const {
    nombre_tipo_tarjeta: nombre_tipo_tarjetaV,
    descripcion: descripcionV,
    activo: activoV,
    color: colorV,
  } = values;

  return (
    <div className="p-4">
      <div className="flex flex-wrap -mx-3">
        <div className="w-full px-3">
          <FormField
            type={nombre_tipo_tarjeta.type}
            label={nombre_tipo_tarjeta.label}
            name={nombre_tipo_tarjeta.name}
            value={nombre_tipo_tarjetaV}
            placeholder={nombre_tipo_tarjeta.placeholder}
            error={errors.nombre_tipo_tarjeta && touched.nombre_tipo_tarjeta}
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3">
        <div className="w-full px-3">
          <FormField
            multiline
            type={descripcion.type}
            label={descripcion.label}
            name={descripcion.name}
            value={descripcionV}
            placeholder={descripcion.placeholder}
            error={errors.descripcion && touched.descripcion}
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3">
        <div className="w-full sm:w-1/2 px-3">
          <FormField
            type={color.type}
            name={color.name}
            value={colorV}
            placeholder={color.placeholder}
            error={errors.color && touched.color}
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
    </div>
  );
}

// typechecking props for UserInfo
AddTipoTarjeta.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};
