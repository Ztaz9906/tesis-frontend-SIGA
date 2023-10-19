import PropTypes from "prop-types";
import {useGetItemsQuery} from "@/services/generic.service.js";
import FormFieldAutoComplete from "@/components/auxiliar/FormFieldAutoComplete.jsx";
import FormField from "@/components/auxiliar/FormField.jsx";

export default function AddValoresConfiguraciionCobro({formData}) {
	const {formField, values, errors, touched} = formData;
	const {id_categoria, id_categoria_residente, id_tipo_cobro, id_evento, precio} = formField;
	const {precio: precioV} = values

	const {data: categoria} = useGetItemsQuery({endpoint: "categorias"}, undefined, {
		refetchOnReconnect: true,
	});
	const {data: residente} = useGetItemsQuery({endpoint: "categorias_residentes"}, undefined, {
		refetchOnReconnect: true,
	});
	const {data: tipo_cobro} = useGetItemsQuery({endpoint: "Cobro_TbNtipoCobro"}, undefined, {
		refetchOnReconnect: true,
	});
	const {data: evento} = useGetItemsQuery({endpoint: "Distribucion_TbNevento"}, undefined, {
		refetchOnReconnect: true,
	});

	return (
		<div className="p-4">
			<div className="flex flex-wrap -mx-3">
				<div className="w-full sm:w-1/3 px-3">
					<FormFieldAutoComplete
						label={id_categoria.label}
						name={id_categoria.name}
						options={categoria}
						valueKey="id_categoria"
						labelKey="nombre_categoria"
					/>
				</div>
				<div className="w-full sm:w-1/3 px-3">
					<FormFieldAutoComplete
						label={id_categoria_residente.label}
						name={id_categoria_residente.name}
						options={residente}
						valueKey="id_categoria_residente"
						labelKey="nombre_categoria_residente"
					/>
				</div>
				<div className="w-full sm:w-1/3 px-3">
					<FormFieldAutoComplete
						label={id_tipo_cobro.label}
						name={id_tipo_cobro.name}
						options={tipo_cobro}
						valueKey="id_tipo_cobro"
						labelKey="nombre_tipo_cobro"
					/>
				</div>
			</div>
			<div className="flex flex-wrap -mx-3">
				<div className="w-full sm:w-1/3 px-3">
					<FormFieldAutoComplete
						label={id_evento.label}
						name={id_evento.name}
						options={evento}
						valueKey="id_evento"
						labelKey="nombre_evento"
					/>
				</div>
				<div className="w-full sm:w-1/3 px-3">
					<FormField
						type={precio.type}
						label={precio.label}
						name={precio.name}
						value={precioV}
						placeholder={precio.placeholder}
						error={errors.precio && touched.precio}
					/>
				</div>
			</div>
		</div>
	);
}

// typechecking props for UserInfo
AddValoresConfiguraciionCobro.propTypes = {
	formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};
