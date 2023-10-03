import React from "react";
import { Field } from "formik";
import { Box, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

export default function FormFieldAutoComplete({
  label,
  name,
  variant = "outlined",
  options = [],
  valueKey = "value",
  labelKey = "label",
  ...rest
}) {
  return (
    <Field name={name}>
      {({ field, meta, form }) => {
        const { setFieldValue, setFieldTouched } = form;

        return (
          <Box mb={1.5}>
            <Autocomplete
              {...rest}
              options={options}
              getOptionLabel={(option) => option[labelKey] || ""}
              onChange={(_, value) => {
                // Establece el valor en el campo de Formik con el ID (u otro valor clave) del objeto seleccionado.
                setFieldValue(name, value ? value[valueKey] : "");
                setFieldTouched(name, true); // Marca el campo como "touched" cuando se cambia
              }}
              onBlur={() => setFieldTouched(name, true)} // Marca el campo como "touched" cuando pierde el foco
              value={
                options.find((option) => option[valueKey] === field.value) ||
                null
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant={variant}
                  label={label}
                  name={name}
                  fullWidth
                  error={meta.touched && meta.error ? true : false}
                  helperText={meta.touched && meta.error ? meta.error : ""}
                />
              )}
              fullWidth
            />
          </Box>
        );
      }}
    </Field>
  );
}
