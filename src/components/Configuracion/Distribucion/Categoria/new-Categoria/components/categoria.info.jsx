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

export default function AddTorpedo({ formData }) {
  const { formField, values, errors, touched } = formData;
  const { name, active, description, color, base } = formField;
  const {
    name: nameV,
    description: descriptionV,
    active: activeV,
    color: colorV,
    base: baseV,
  } = values;

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
        <div className="w-full px-3">
          <FormField
            select
            label={base.label}
            name={base.name}
            value={baseV}
            placeholder={base.placeholder}
            error={errors.base && touched.base}
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
AddTorpedo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};
