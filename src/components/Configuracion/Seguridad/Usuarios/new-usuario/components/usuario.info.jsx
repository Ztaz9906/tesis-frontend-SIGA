import PropTypes from "prop-types";
import FormField from "../../../../../auxiliar/FormField";
import FormFieldAutoComplete from "@/components/auxiliar/FormFieldAutoComplete.jsx";
import {useGetGruposQuery} from "@/components/Configuracion/Seguridad/Roles/service/roles.service.js";
import {
	useGetInstitucionesQuery
} from "@/components/Configuracion/Seguridad/Instituciones/service/institucion.service.js";


export default function AddUsuario({formData}) {
	const {data: roles} = useGetGruposQuery(undefined, {
		refetchOnReconnect: true,
	});
	const {data: instituciones} = useGetInstitucionesQuery(undefined, {
		refetchOnReconnect: true,
	});
	const {formField, values, errors, touched, id} = formData;
	const {username, email, institucion, groups, password, password_confirm} = formField;
	const {
		username: usernameV,
		email: emailV,
		password: passwordV,
		password_confirm: password_confirmV,
	} = values;

	return (
		<div className="p-4">
			<div className="flex flex-wrap -mx-3">
				<div className="w-full sm:w-1/2 px-3">
					<FormField
						type={username.type}
						label={username.label}
						name={username.name}
						value={usernameV}
						placeholder={username.placeholder}
						error={errors.username && touched.username}
					/>
				</div>
				<div className="w-full sm:w-1/2 px-3">
					<FormField
						type={email.type}
						label={email.label}
						name={email.name}
						value={emailV}
						placeholder={email.placeholder}
						error={errors.email && touched.email}
					/>
				</div>
			</div>
			<div className="flex flex-wrap -mx-3">
				<div className="w-full sm:w-1/2 px-3">
					<FormFieldAutoComplete
						label={institucion.label}
						name={institucion.name}
						options={instituciones}
						valueKey="url"
						labelKey="name"
					/>
				</div>
				<div className="w-full sm:w-1/2 px-3">
					<FormFieldAutoComplete
						multiple={true}
						label={groups.label}
						name={groups.name}
						options={roles}
						valueKey="url"
						labelKey="name"
					/>
				</div>
			</div>
			{!id && (
				<div className="flex flex-wrap -mx-3">
					<div className="w-full sm:w-1/2 px-3">
						<FormField
							type={password.type}
							label={password.label}
							name={password.name}
							value={passwordV}
							placeholder={password.placeholder}
							error={errors.password && touched.password}
						/>
					</div>
					<div className="w-full sm:w-1/2 px-3">
						<FormField
							type={password_confirm.type}
							label={password_confirm.label}
							name={password_confirm.name}
							value={password_confirmV}
							placeholder={password_confirm.placeholder}
							error={errors.password_confirm && touched.password_confirm}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

// typechecking props for UserInfo
AddUsuario.propTypes = {
	formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};
