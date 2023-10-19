import PropTypes from "prop-types";
import FormField from "../../../../../auxiliar/FormField";
import FormFieldAutoComplete from "@/components/auxiliar/FormFieldAutoComplete.jsx";
import {useGetTipoAreasQuery} from "@/components/Configuracion/Configuracion/TipoAreas/service/tipo.areas.service.js";
import {MenuItem} from "@mui/material";

export default function AddArea({formData}) {
	const {formField, values, errors, touched} = formData;
	const {
		activo,
		estructura_credencial,
		estructura_consejo,
		codigo_area,
		codigo_externo,
		nombre_estructura,
		id_tipo_estructura
	} = formField;
	const {
		activo: activoV,
		estructura_credencial: estructura_credencialV,
		estructura_consejo: estructura_consejoV,
		codigo_externo: codigo_externoV,
		codigo_area: codigo_areaV,
		nombre_estructura: nombre_estructuraV,
	} = values;
	const {data: tipo_areas} = useGetTipoAreasQuery(undefined, {
		refetchOnReconnect: true,
	});

	return (
		<div className="p-4">

			<div className="flex flex-wrap -mx-3">
				<div className="w-full px-3">
					<FormField
						type={nombre_estructura.type}
						label={nombre_estructura.label}
						name={nombre_estructura.name}
						value={nombre_estructuraV}
						placeholder={nombre_estructura.placeholder}
						error={errors.nombre_estructura && touched.nombre_estructura}
					/>
				</div>
			</div>
			<div className="flex flex-wrap -mx-3">
				<div className="w-full sm:w-1/2 px-3">
					<FormField
						type={codigo_area.type}
						label={codigo_area.label}
						name={codigo_area.name}
						value={codigo_areaV}
						placeholder={codigo_area.placeholder}
						error={errors.codigo_area && touched.codigo_area}
					/>
				</div>
				<div className="w-full sm:w-1/2 px-3">
					<FormField
						type={codigo_externo.type}
						label={codigo_externo.label}
						name={codigo_externo.name}
						value={codigo_externoV}
						placeholder={codigo_externo.placeholder}
						error={errors.codigo_externo && touched.codigo_externo}
					/>
				</div>
			</div>

			<div className="flex flex-wrap -mx-3">
				<div className="w-full sm:w-1/2 px-3">
					<FormField
						select
						label={estructura_credencial.label}
						name={estructura_credencial.name}
						value={estructura_credencialV}
						placeholder={estructura_credencial.placeholder}
						error={errors.estructura_credencial && touched.estructura_credencial}
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
						label={estructura_consejo.label}
						name={estructura_consejo.name}
						value={estructura_consejoV}
						placeholder={estructura_consejo.placeholder}
						error={errors.estructura_consejo && touched.estructura_consejo}
					>
						<MenuItem value={""} selected disabled>
							--Seleccione--
						</MenuItem>
						<MenuItem value={true}>Si</MenuItem>
						<MenuItem value={false}>No</MenuItem>
					</FormField>
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
					<FormFieldAutoComplete
						label={id_tipo_estructura.label}
						name={id_tipo_estructura.name}
						options={tipo_areas}
						valueKey="id_tipo_estructura"
						labelKey="nombre_tipo_estructura"
					/>
				</div>
			</div>

		</div>
	);
}

// typechecking props for UserInfo
AddArea.propTypes = {
	formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};
