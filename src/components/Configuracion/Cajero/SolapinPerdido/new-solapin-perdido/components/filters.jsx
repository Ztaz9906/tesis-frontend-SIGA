import {useGetItemsQuery} from "@/services/generic.service.js";
import GenericFilter from "@/components/auxiliar/GenericFilter.jsx";

export default function FilterSolapinPerdido({filter}) {

	const {data: sexo} = useGetItemsQuery({endpoint: "sexos"}, undefined, {
		refetchOnReconnect: true,
	});
	const {data: pais} = useGetItemsQuery({endpoint: "paises"}, undefined, {
		refetchOnReconnect: true,
	});
	const {data: provincia} = useGetItemsQuery({endpoint: "provincias"}, undefined, {
		refetchOnReconnect: true,
	});
	const {data: municipio} = useGetItemsQuery({endpoint: "municipios"}, undefined, {
		refetchOnReconnect: true,
	});
	const sexoOptions = sexo?.map((sexo) => ({
		value: sexo.id_sexo.toString(),
		label: sexo.nombre_sexo,
	}));
	const paisOptions = pais?.map((pais) => ({
		value: pais.id_pais.toString(),
		label: pais.nombre_pais,
	}));
	const provinciaOptions = provincia?.map((provincia) => ({
		value: provincia.id_provincia.toString(),
		label: provincia.nombre_provincia,
	}));
	const municipioOptions = municipio?.map((municipio) => ({
		value: municipio.id_municipio.toString(),
		label: municipio.nombre_municipio,
	}));

	return (
		<>
			{sexoOptions && paisOptions && provinciaOptions && municipioOptions ? (
				<GenericFilter
					onFilter={filter}
					fieldsConfig={[
						{
							type: "text",
							name: "id_persona__nombre_completo",
							label: "Nombre exacto",
							placeholder: "Sensible a mayusculas y minusculas",
						},
						{
							type: "text",
							name: "id_persona__ci",
							label: "Carnet de Identidad",
							placeholder: "Inserte un carnet de identidad válido",
						},
						{
							type: "text",
							name: "id_persona__solapin",
							label: "Solapin",
							placeholder: "Sensible a mayusculas y minusculas",
						},
						{
							type: "text",
							name: "id_persona__username",
							label: "Nombre de Usuario",
							placeholder: "Sensible a mayusculas y minusculas",
						},
						{
							type: "select",
							name: "id_persona__id_sexo",
							label: "Sexo",
							options: [
								{value: "", label: "--Todos--"},
								...sexoOptions
							],
						},
						{
							type: "select",
							name: "id_persona__id_pais",
							label: "Pais",
							options: [
								{value: "", label: "--Todos--"},
								...paisOptions
							],
						},
						{
							type: "select",
							name: "id_persona__id_provincia",
							label: "Provincia",
							options: [
								{value: "", label: "--Todos--"},
								...provinciaOptions
							],
						},
						{
							type: "select",
							name: "id_persona__id_municipio",
							label: "Municipio",
							options: [
								{value: "", label: "--Todos--"},
								...municipioOptions
							],
						}
					]}
				/>
			) : null}
		</>
	)
}