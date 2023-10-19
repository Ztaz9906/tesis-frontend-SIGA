import PropTypes from "prop-types";
import {MenuItem} from "@mui/material";
import FormField from "../../../../../auxiliar/FormField";
import {
	useGetClasificacionEventosQuery
} from "@/components/Configuracion/Distribucion/Evento/service/calsificacion.evento.js";
import {useGetHorariosQuery} from "@/components/Configuracion/Distribucion/Horario/service/horario.service.js";
import FormFieldAutoComplete from "@/components/auxiliar/FormFieldAutoComplete.jsx";
import {useGetEventosQuery} from "@/components/Configuracion/Distribucion/Evento/service/evento.service.js";

export default function AddTorpedo({formData}) {
	const {formField, values, errors, touched} = formData;
	const {evento_padre, nombre_evento, descripcion_evento, activo, id_clasificacion_evento, id_horario} = formField;
	const {
		nombre_evento: nombre_eventoV,
		descripcion_evento: descripcion_eventoV,
		activo: activoV,
	} = values;

	const {data: calsificacion_evento} = useGetClasificacionEventosQuery(undefined, {
		refetchOnReconnect: true,
	});
	const {data: horarios} = useGetHorariosQuery(undefined, {
		refetchOnReconnect: true,
	});
	const {data: eventos} = useGetEventosQuery(undefined, {
		refetchOnReconnect: true,
	});
	return (
		<div className="p-4">
			<div className="flex flex-wrap -mx-3">
				<div className="w-full px-3">
					<FormField
						type={nombre_evento.type}
						label={nombre_evento.label}
						name={nombre_evento.name}
						value={nombre_eventoV}
						placeholder={nombre_evento.placeholder}
						error={errors.nombre_evento && touched.nombre_evento}
					/>
				</div>
			</div>
			<div className="flex flex-wrap -mx-3">
				<div className="w-full px-3">
					<FormField
						multiline
						type={descripcion_evento.type}
						label={descripcion_evento.label}
						name={descripcion_evento.name}
						value={descripcion_eventoV}
						placeholder={descripcion_evento.placeholder}
						error={errors.descripcion_evento && touched.descripcion_evento}
					/>
				</div>
			</div>
			<div className="flex flex-wrap -mx-3">
				<div className="w-full sm:w-1/2 px-3">
					<FormFieldAutoComplete
						label={id_horario.label}
						name={id_horario.name}
						options={horarios}
						valueKey="id_horario"
						labelKey="nombre_horario"
					/>
				</div>
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
			</div>
			<div className="flex flex-wrap -mx-3">
				<div className="w-full sm:w-1/2 px-3">
					<FormFieldAutoComplete
						label={evento_padre.label}
						name={evento_padre.name}
						options={eventos}
						valueKey="id_evento"
						labelKey="nombre_evento"
					/>
				</div>
				<div className="w-full sm:w-1/2 px-3">
					<FormFieldAutoComplete
						label={id_clasificacion_evento.label}
						name={id_clasificacion_evento.name}
						options={calsificacion_evento}
						valueKey="id_clasificacion_evento"
						labelKey="nombre_clasificacion_evento"
					/>
				</div>
			</div>
		</div>
	);
}

// typechecking props for UserInfo
AddTorpedo.propTypes = {
	formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};
