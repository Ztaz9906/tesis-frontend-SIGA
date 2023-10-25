import PropTypes from "prop-types";
import {Checkbox, InputLabel, ListItemText, MenuItem, Select,} from "@mui/material";
import FormField from "../../../../../auxiliar/FormField";
import {useGetDiasQuery} from "@/services/dias.service.js";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};
export default function AddHorario({formData}) {
	const {formField, values, errors, touched} = formData;
	const {nombre_horario, activo, hora_inicio, hora_fin, dias_semana} =
		formField;
	const {
		nombre_horario: nombre_horarioV,
		hora_inicio: hora_inicioV,
		activo: activoV,
		hora_fin: hora_finV,
		dias_semana: dias_semanaV,
	} = values;
	const {data} = useGetDiasQuery(undefined, {
		refetchOnReconnect: true,
	});

	return (
		<div className="p-4">
			<div className="flex flex-wrap -mx-3">
				<div className="w-full px-3">
					<FormField
						type={nombre_horario.type}
						label={nombre_horario.label}
						name={nombre_horario.name}
						value={nombre_horarioV}
						placeholder={nombre_horario.placeholder}
						error={errors.nombre_horario && touched.nombre_horario}
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
			<div className="flex flex-wrap -mx-3">
				<div className="w-full sm:w-1/2 px-3">
					<FormField
						type={hora_inicio.type}
						label={hora_inicioV === "" ? "" : hora_inicio.label}
						name={hora_inicio.name}
						value={hora_inicioV}
						placeholder={hora_inicio.placeholder}
						error={errors.hora_inicio && touched.hora_inicio}
					/>
				</div>
				<div className="w-full sm:w-1/2 px-3">
					<FormField
						type={hora_fin.type}
						label={hora_finV === "" ? "" : hora_fin.label}
						name={hora_fin.name}
						value={hora_finV}
						placeholder={hora_fin.placeholder}
						error={errors.hora_fin && touched.hora_fin}
					/>
				</div>
			</div>
			<div className="flex flex-wrap -mx-3">
				<div className="w-full px-3">
					<InputLabel id="dias_semanas">Días</InputLabel>
					<FormField
						labelId="dias_semanas"
						as={Select}
						multiple
						name={dias_semana.name}
						value={dias_semanaV}
						placeholder={dias_semana.placeholder}
						error={errors.dias_semana && touched.dias_semana}
						renderValue={(selected) => {
							const selectedNames = selected
								.map((id) => {
									const matchedDay = data.find(
										(day) => day.id_dia_semana === id
									);
									return matchedDay ? matchedDay.dia_semana : undefined;
								})
								.filter(Boolean);
							return selectedNames.join(", ");
						}}
						MenuProps={MenuProps}
					>
						<MenuItem value={""} selected disabled>
							--Seleccione--
						</MenuItem>
						{data?.map((item) => (
							<MenuItem key={item.id_dia_semana} value={item.id_dia_semana}>
								<Checkbox
									checked={dias_semanaV.indexOf(item.id_dia_semana) > -1}
								/>
								<ListItemText primary={item.dia_semana}/>
							</MenuItem>
						))}
					</FormField>
				</div>
			</div>
		</div>
	);
}

// typechecking props for UserInfo
AddHorario.propTypes = {
	formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};
