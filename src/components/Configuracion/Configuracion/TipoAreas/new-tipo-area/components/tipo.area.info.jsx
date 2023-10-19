import PropTypes from "prop-types";
import {MenuItem} from "@mui/material";
import FormField from "../../../../../auxiliar/FormField";

export default function AddTipoTipoArea({formData}) {
	const {formField, values, errors, touched} = formData;
	const {nombre_tipo_estructura, activo, descripcion_tipo_estructura} = formField;
	const {
		nombre_tipo_estructura: nombre_tipo_estructuraV,
		descripcion_tipo_estructura: descripcion_tipo_estructuraV,
		activo: activoV,
	} = values;

	return (
		<div className="p-4">
			<div className="flex flex-wrap -mx-3">
				<div className="w-full px-3">
					<FormField
						type={nombre_tipo_estructura.type}
						label={nombre_tipo_estructura.label}
						name={nombre_tipo_estructura.name}
						value={nombre_tipo_estructuraV}
						placeholder={nombre_tipo_estructura.placeholder}
						error={errors.nombre_tipo_estructura && touched.nombre_tipo_estructura}
					/>
				</div>
			</div>
			<div className="flex flex-wrap -mx-3">
				<div className="w-full px-3">
					<FormField
						multiline
						type={descripcion_tipo_estructura.type}
						label={descripcion_tipo_estructura.label}
						name={descripcion_tipo_estructura.name}
						value={descripcion_tipo_estructuraV}
						placeholder={descripcion_tipo_estructura.placeholder}
						error={errors.descripcion_tipo_estructura && touched.descripcion_tipo_estructura}
					/>
				</div>
			</div>
			<div className="flex flex-wrap -mx-3">
				<div className="w-full px-3">
					<FormField
						select
						label={activo.label}
						name={activo.name}
						value={activoV}
						placeholder={activo.placeholder}
						error={errors.activo && touched.activo}
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
AddTipoTipoArea.propTypes = {
	formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};
