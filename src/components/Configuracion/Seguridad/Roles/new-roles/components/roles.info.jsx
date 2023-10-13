import PropTypes from "prop-types";
import FormField from "../../../../../auxiliar/FormField";
import {useGetPermisosQuery} from "../../service/permisos.service";
import TransferList from "./transfer_list.index";

export default function AddGrupo({formData}) {
	const {formField, values, errors, touched, setPermisos, id, permisos} =
		formData;
	const {name} = formField;
	const {name: nameV} = values;
	const {data} = useGetPermisosQuery(undefined, {
		refetchOnReconnect: true,
	});

	return (
		<>
			<div className="flex flex-wrap">
				<div className="w-full px-3">
					<FormField
						type={name.type}
						label={name.label}
						name={name.name}
						value={nameV}
						placeholder={name.placeholder}
						error={errors.name && touched.name}
					/>
				</div>
			</div>
			<TransferList
				data={data}
				rightData={permisos}
				generalTitle={"Permisos"}
				setSubmittingData={(selectedPerms) => setPermisos(selectedPerms)}
				edit={id ? true : false}
			/>
		</>
	);
}

// typechecking props for UserInfo
AddGrupo.propTypes = {
	formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};
