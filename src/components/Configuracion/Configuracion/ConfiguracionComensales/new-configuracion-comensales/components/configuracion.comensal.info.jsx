import PropTypes from "prop-types";
import FormField from "../../../../../auxiliar/FormField";

export default function AddConfiguraciionComensales({formData}) {
	const {formField, values, errors, touched} = formData;
	const {descripcion} = formField;
	const {
		descripcion: descripcionV,
	} = values;

	return (
		<FormField
			multiline
			type={descripcion.type}
			label={descripcion.label}
			name={descripcion.name}
			value={descripcionV}
			placeholder={descripcion.placeholder}
			error={errors.descripcion && touched.descripcion}
		/>
	);
}

AddConfiguraciionComensales.propTypes = {
	formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};
