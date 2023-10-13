import React from "react";
import {Field} from "formik";
import {Box, TextField} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

export default function FormFieldAutoComplete({
	                                              label,
	                                              name,
	                                              variant = "outlined",
	                                              options = [],
	                                              valueKey = "value",
	                                              labelKey = "label",
	                                              multiple = false,
	                                              ...rest
                                              }) {
	return (
		<Field name={name}>
			{({field, meta, form}) => {
				const {setFieldValue, handleBlur} = form;
				return (
					<Box mb={1.5}>
						<Autocomplete
							{...rest}
							multiple={multiple}  // <- Usar la prop 'multiple'
							options={options}
							getOptionLabel={(option) => option[labelKey] || ""}
							onBlur={handleBlur}
							onChange={(_, value) => {
								if (multiple) {
									// Si es multiple, maneja como array
									const selectedValues = value.map(item => item[valueKey]);
									setFieldValue(name, selectedValues);
								} else {
									// Si no es multiple, maneja como valor simple
									setFieldValue(name, value ? value[valueKey] : "");
								}
							}}
							value={
								multiple
									? (field.value || []).map(v => options.find(option => option[valueKey] === v))
									: options.find((option) => option[valueKey] === field.value) || null
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
