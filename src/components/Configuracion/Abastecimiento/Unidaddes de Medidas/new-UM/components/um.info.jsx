import PropTypes from "prop-types";
import {MenuItem} from "@mui/material";
import FormField from "../../../../../auxiliar/FormField";

export default function AddUM({formData}) {
	const {formField, values, errors, touched} = formData;
	const {
		activo,
		nombre_unidad_medida,
		descripcion_unidad_medida,
		siglas,
		clasificacion,
	} = formField;
	const {
		descripcion_unidad_medida: descripcion_unidad_medidaV,
		activo: activoV,
		nombre_unidad_medida: nombre_unidad_medidaV,
		siglas: siglasV,
		clasificacion: clasificacionV,
	} = values;

	return (
		<div className="p-4">
			<div className="flex flex-wrap -mx-3">
				<div className="w-full sm:w-1/2 px-3">
					<FormField
						type={nombre_unidad_medida.type}
						label={nombre_unidad_medida.label}
						name={nombre_unidad_medida.name}
						value={nombre_unidad_medidaV}
						placeholder={nombre_unidad_medida.placeholder}
						error={errors.nombre_unidad_medida && touched.nombre_unidad_medida}
					/>
				</div>
				<div className="w-full sm:w-1/2 px-3">
					<FormField
						type={siglas.type}
						label={siglas.label}
						name={siglas.name}
						value={siglasV}
						placeholder={siglas.placeholder}
						error={errors.siglas && touched.siglas}
					/>
				</div>
			</div>
			<div className="flex flex-wrap -mx-3">
				<div className="w-full px-3">
					<FormField
						multiline
						type={descripcion_unidad_medida.type}
						label={descripcion_unidad_medida.label}
						name={descripcion_unidad_medida.name}
						value={descripcion_unidad_medidaV}
						placeholder={descripcion_unidad_medida.placeholder}
						error={
							errors.descripcion_unidad_medida &&
							touched.descripcion_unidad_medida
						}
					/>
				</div>
			</div>
			<div className="flex flex-wrap -mx-3">
				<div className="w-full sm:w-1/2 px-3">
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
				<div className="w-full sm:w-1/2 px-3">
					<FormField
						select
						label={clasificacion.label}
						name={clasificacion.name}
						value={clasificacionV}
						placeholder={clasificacion.placeholder}
						error={errors.clasificacion && touched.clasificacion}
					>
						<MenuItem value={""} selected disabled>
							--Seleccione--
						</MenuItem>
						<MenuItem value={"masa"}>Masa</MenuItem>
						<MenuItem value={"volumen"}>Volumen</MenuItem>
					</FormField>
				</div>
			</div>
		</div>
	);
}

// typechecking props for UserInfo
AddUM.propTypes = {
	formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};
