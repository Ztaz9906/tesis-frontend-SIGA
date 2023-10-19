import PropTypes from "prop-types";
import {useState} from "react";
import {ErrorMessage, Field} from "formik";
import {Box, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import {MdOutlineVisibility, MdOutlineVisibilityOff} from "react-icons/md"; // Asumiendo que estás usando estos íconos

export default function FormField(
	{
		label,
		name,
		variant = "outlined",
		as = TextField,
		type, // Agrega type a las props
		...rest
	}) {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const isPasswordField = type === "password";
	const fieldProps = {
		...rest,
		name: name,
		variant: variant,
		label: label,
		fullWidth: true,
		type: isPasswordField && showPassword ? "text" : type,
	};

	if (isPasswordField && as === TextField) {
		fieldProps.InputProps = {
			endAdornment: (
				<InputAdornment position="end">
					<IconButton
						aria-label="toggle password visibility"
						onClick={handleClickShowPassword}
						onMouseDown={handleMouseDownPassword}
					>
						{showPassword ? <MdOutlineVisibilityOff/> : <MdOutlineVisibility/>}
					</IconButton>
				</InputAdornment>
			),
		};
	}
	return (
		<Box mb={1.5}>
			<Field
				{...fieldProps}
				as={as}
			/>
			<Box mt={0.75}>
				<Typography
					component="div"
					variant="caption"
					color="error"
					fontWeight="regular"
				>
					<ErrorMessage name={name}/>
				</Typography>
			</Box>
		</Box>
	);
}

FormField.propTypes = {
	variant: PropTypes.string,
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	type: PropTypes.string, // Agrega type a las propTypes
};
