import PropTypes from "prop-types";
import FormField from "../../../../../auxiliar/FormField";

export default function AddConfiguraciionCobro({formData}) {
	const {formField, values, errors, touched} = formData;
	const {descripcion, nombre_configuracion_cobro} = formField;
	const {
		descripcion: descripcionV,
		nombre_configuracion_cobro: nombre_configuracion_cobroV
	} = values;

	return (
		<>
			<FormField
				type={nombre_configuracion_cobro.type}
				label={nombre_configuracion_cobro.label}
				name={nombre_configuracion_cobro.name}
				value={nombre_configuracion_cobroV}
				placeholder={nombre_configuracion_cobro.placeholder}
				error={errors.nombre_configuracion_cobro && touched.nombre_configuracion_cobro}
			/>
			<FormField
				multiline
				type={descripcion.type}
				label={descripcion.label}
				name={descripcion.name}
				value={descripcionV}
				placeholder={descripcion.placeholder}
				error={errors.descripcion && touched.descripcion}
			/>
		</>
	);
}

AddConfiguraciionCobro.propTypes = {
	formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};
