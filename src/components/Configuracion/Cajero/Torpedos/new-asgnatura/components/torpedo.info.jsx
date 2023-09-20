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

// @mui material components
import Grid from "@mui/material/Grid";

// NewUser page components

import { Box, MenuItem } from "@mui/material";
import FormField from "../../../../../auxiliar/FormField";

export default function AddTorpedo({ formData }) {
  const { formField, values, errors, touched } = formData;
  const { nombre, activo, clave } = formField;
  const { nombre: nombreV, clave: claveV, activo: activoV } = values;

  return (
    <Box>
      <Box mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              select
              label={activo.label}
              name={activo.name}
              value={activoV}
              placeholder={activo.placeholder}
              error={errors.activo && touched.activo}
              onInput={(e) =>
                (e.target.value = ("" + e.target.value).toUpperCase())
              }
            >
              <MenuItem value={""} selected disabled>
                --Seleccione--
              </MenuItem>
              <MenuItem value={true}>Si</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </FormField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={nombre.type}
              label={nombre.label}
              name={nombre.name}
              value={nombreV}
              placeholder={nombre.placeholder}
              error={errors.nombre && touched.nombre}
              success={nombreV.length > 0 && !errors.nombre}
              onInput={(e) =>
                (e.target.value = ("" + e.target.value).toUpperCase())
              }
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormField
              multiline
              rowsMax={10}
              type={clave.type}
              label={clave.label}
              name={clave.name}
              value={claveV}
              placeholder={clave.placeholder}
              error={errors.clave && touched.clave}
              success={claveV.length > 0 && !errors.clave}
              onInput={(e) =>
                (e.target.value = ("" + e.target.value).toUpperCase())
              }
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

// typechecking props for UserInfo
AddTorpedo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};
