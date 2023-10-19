import PropTypes from "prop-types";
import {useGetItemsQuery} from "@/services/generic.service.js";
import FormFieldAutoComplete from "@/components/auxiliar/FormFieldAutoComplete.jsx";

export default function AddValoresConfiguraciionComensales({formData}) {
	const {formField} = formData;
	const {id_categoria, id_categoria_residente, id_estructura} = formField;

	const {data: categoria} = useGetItemsQuery({endpoint: "categorias"}, undefined, {
		refetchOnReconnect: true,
	});
	const {data: residente} = useGetItemsQuery({endpoint: "categorias_residentes"}, undefined, {
		refetchOnReconnect: true,
	});
	const {data: areas} = useGetItemsQuery({endpoint: "estructuras"}, undefined, {
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
						label={id_estructura.label}
						name={id_estructura.name}
						options={areas}
						valueKey="id_estructura"
						labelKey="nombre_estructura"
					/>
				</div>
			</div>
		</div>
	);
}

// typechecking props for UserInfo
AddValoresConfiguraciionComensales.propTypes = {
	formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};
