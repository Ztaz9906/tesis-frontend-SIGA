import React from "react";
import {useGetPersonaQuery} from "@/services/persona.service.js";
import FormField from "../../../../auxiliar/FormField";
import {MenuItem} from "@mui/material";

export default function SettingsEstructura({formData}) {
	const {formField, values, errors, touched} = formData;
	const {
		id_sub_director,
		id_tecnico_general,
		id_especialista_complejo,
		centro_costo,
	} = formField;
	const {
		centro_costo: centro_costoV,
		id_sub_director: id_sub_directorV,
		id_tecnico_general: id_tecnico_generalV,
		id_especialista_complejo: id_especialista_complejoV,
	} = values;

	const {data: data_persona} = useGetPersonaQuery(undefined, {
		refetchOnReconnect: true,
	});
	console.log(data_persona)
	return (
		<>
			<div className="p-5">
				<FormField
					select
					label={id_sub_director.label}
					name={id_sub_director.name}
					value={id_sub_directorV}
					placeholder={id_sub_director.placeholder}
					error={errors.id_sub_director && touched.id_sub_director}
				>
					<MenuItem value={""} selected disabled>
						--Seleccione--
					</MenuItem>
					{data_persona?.map((item) => (
						<MenuItem key={item.id} value={item.id}>
							{item.nombre_completo}
						</MenuItem>
					))}
				</FormField>
				<FormField
					select
					label={id_especialista_complejo.label}
					name={id_especialista_complejo.name}
					value={id_especialista_complejoV}
					placeholder={id_especialista_complejo.placeholder}
					error={
						errors.id_especialista_complejo && touched.id_especialista_complejo
					}
				>
					<MenuItem value={""} selected disabled>
						--Seleccione--
					</MenuItem>
					{data_persona?.map((item) => (
						<MenuItem key={item.id} value={item.id}>
							{item.nombre_completo}
						</MenuItem>
					))}
				</FormField>
				<FormField
					select
					label={id_tecnico_general.label}
					name={id_tecnico_general.name}
					value={id_tecnico_generalV}
					placeholder={id_tecnico_general.placeholder}
					error={errors.id_tecnico_general && touched.id_tecnico_general}
				>
					<MenuItem value={""} selected disabled>
						--Seleccione--
					</MenuItem>
					{data_persona?.map((item) => (
						<MenuItem key={item.id} value={item.id}>
							{item.nombre_completo}
						</MenuItem>
					))}
				</FormField>
				<FormField
					type={centro_costo.type}
					label={centro_costo.label}
					name={centro_costo.name}
					value={centro_costoV}
					placeholder={centro_costo.placeholder}
					error={errors.centro_costo && touched.centro_costo}
				/>
			</div>
		</>
	);
}
