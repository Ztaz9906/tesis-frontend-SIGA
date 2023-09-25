import PropTypes from "prop-types";
import { ErrorMessage, useField } from "formik";
import { Box, TextField, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

export default function FormFieldAutoComplete({
  label,
  name,
  variant = "outlined",
  as = TextField,
  options = [], // Opciones para el Autocomplete
  ...rest
}) {
  const [field, meta] = useField(name);

  return (
    <Box mb={1.5}>
      <Autocomplete
        {...field}
        {...rest}
        options={options}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant={variant}
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error ? meta.error : ""}
          />
        )}
        onChange={(_, value) => {
          // Aquí puedes adaptar el valor según tus necesidades
          // por ejemplo, si tus opciones son objetos y quieres almacenar solo un valor específico.
          field.onChange({
            target: {
              name: field.name,
              value: value ? value.value : "",
            },
          });
        }}
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

FormFieldAutoComplete.propTypes = {
  variant: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })
  ), // Definir el tipo de propiedades para las opciones del Autocomplete
};
