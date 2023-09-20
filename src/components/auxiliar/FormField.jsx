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
// formik components
import { ErrorMessage, Field } from "formik";
import { Box, TextField, Typography } from "@mui/material";

// Material Dashboard 2 PRO React components

export default function FormField({
  label,
  name,
  variant = "outlined",
  as = TextField,
  ...rest
}) {
  return (
    <Box mb={1.5}>
      <Field
        {...rest}
        name={name}
        as={as}
        variant={variant}
        label={label}
        fullWidth
      />
      <Box mt={0.75}>
        <Typography
          component="div"
          variant="caption"
          color="error"
          fontWeight="regular"
        >
          <ErrorMessage name={name} />
        </Typography>
      </Box>
    </Box>
  );
}

//typechecking props for FormField
FormField.propTypes = {
  variant: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
};
