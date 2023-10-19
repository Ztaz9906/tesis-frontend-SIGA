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
import { useGetCategoriasQuery } from "../../../Categoria/service/categoria.service";

export default function AddEstructura({ formData }) {
  const { formField, values, errors, touched } = formData;
  const {
    name,
    description,
    active,
    estructura_parent,
    category,
    id_sub_director,
    id_tecnico_general,
    id_especialista_complejo,
    capacidad,
    centro_costo,
    version,
    initials,
  } = formField;
  const {
    capacidad: capacidadV,
    centro_costo: centro_costoV,
    version: versionV,
    name: nameV,
    description: descriptionV,
    active: activeV,
    estructura_parent: estructura_parentV,
    category: categoryV,
    id_sub_director: id_sub_directorV,
    id_tecnico_general: id_tecnico_generalV,
    id_especialista_complejo: id_especialista_complejoV,
    initials: initialsV,
  } = values;

  const { data: data_categoria } = useGetCategoriasQuery(undefined, {
    refetchOnReconnect: true,
  });
  return (
    <div className="p-4">
      <div className="flex flex-wrap -mx-3">
        <div className="w-full px-3">
          <FormField
            type={name.type}
            label={name.label}
            name={name.name}
            value={nameV}
            placeholder={name.placeholder}
            error={errors.name && touched.name}
          />
        </div>
        <div className="w-full px-3">
          <FormField
            type={initials.type}
            label={initials.label}
            name={initials.name}
            value={initialsV}
            placeholder={initials.placeholder}
            error={errors.initials && touched.initials}
          />
        </div>
        <div className="w-full px-3">
          <FormField
            type={capacidad.type}
            label={capacidad.label}
            name={capacidad.name}
            value={capacidadV}
            placeholder={capacidad.placeholder}
            error={errors.capacidad && touched.capacidad}
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3">
        <div className="w-full px-3">
          <FormField
            multiline
            type={description.type}
            label={description.label}
            name={description.name}
            value={descriptionV}
            placeholder={description.placeholder}
            error={errors.description && touched.description}
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3">
        <div className="w-full sm:w-1/2 px-3">
          <FormField
            select
            label={active.label}
            name={active.name}
            value={activeV}
            placeholder={active.placeholder}
            error={errors.active && touched.active}
          >
            <MenuItem value={""} selected disabled>
              --Seleccione--
            </MenuItem>
            <MenuItem value={true}>Si</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </FormField>
        </div>
        <div className="w-full sm:w-1/2 px-3">
          <FormField
            select
            label={category.label}
            name={category.name}
            value={categoryV}
            placeholder={category.placeholder}
            error={errors.category && touched.category}
          >
            <MenuItem value={""} selected disabled>
              --Seleccione--
            </MenuItem>
            {data_categoria?.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </FormField>
        </div>
      </div>
    </div>
  );
}

// typechecking props for UserInfo
AddEstructura.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};
