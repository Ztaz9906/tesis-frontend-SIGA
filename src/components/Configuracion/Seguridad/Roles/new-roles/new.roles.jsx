import {Form, Formik} from "formik";
import validations from "./schemas/validations";
import form from "./schemas/form";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Typography} from "@mui/material";
import initialValues from "./schemas/initialValues";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {useCreateGrupoMutation, useEditGrupoMutation, useLazyGetGrupoByIdQuery,} from "../service/roles.service";
import AddGrupo from "./components/roles.info";
import {useSelector} from "react-redux";

const getModifiedFields = (originalData, newData) => {
	return Object.fromEntries(
		Object.entries(newData).filter(([key, value]) => {
			return originalData[key] !== value;
		})
	);
};

export default function Roles() {
	const [permisos, setPermisos] = useState([]);
	const {id} = useParams();
	const {formId, formField} = form;
	const currentValidation = validations[0];
	const navigate = useNavigate();
	const user = useSelector(state => state.user);
	const [
		createGrupo,
		{
			isError: isErrorC,
			isLoading: isLoadingC,
			isSuccess: isSuccessC,
			error: errorC,
		},
	] = useCreateGrupoMutation();

	const [
		editGrupo,
		{
			isError: isErrorE,
			isLoading: isLoadingE,
			isSuccess: isSuccessE,
			error: errorE,
		},
	] = useEditGrupoMutation();

	const [getGrupoById, {data}] = useLazyGetGrupoByIdQuery();
	useRedirectForm(
		isLoadingC,
		isSuccessC,
		isErrorC,
		errorC,
		"Rol creado",
		"/configuracion/seguridad/roles"
	);
	useRedirectForm(
		isLoadingE,
		isSuccessE,
		isErrorE,
		errorE,
		"Rol editado",
		"/configuracion/seguridad/roles"
	);
	const submitForm = async (values, actions) => {
		try {
			if (!id) {
				createGrupo(values);
			} else {
				const modifiedFields = getModifiedFields(data, values);
				if (Object.keys(modifiedFields).length !== 0) {
					editGrupo({id: id, ...modifiedFields});
				}
			}
		} catch (error) {
			console.error(error);
			actions.setSubmitting(true);
		}
	};

	const handleSubmit = (values, actions) => {
		const permisosUrls = permisos.map((permiso) => permiso.url);
		const combinedValues = {...values, permissions: permisosUrls};
		submitForm(combinedValues, actions);
	};

	return (
		<div className="flex justify-center items-center bg-gray-100 h-full">
			<div className="w-full lg:w-full bg-white p-3 rounded shadow-xl">
				<div className="text-center mb-6">
					<Typography variant="h5" fontWeight="bold">
						{!id ? "Registrar rol" : `Editar rol`}
					</Typography>
				</div>
				<Formik
					initialValues={{
						...initialValues,
						id_institucion: user.is_staff ? '' : user.institucion.id,
					}}
					validationSchema={currentValidation}
					onSubmit={handleSubmit}
				>
					{({values, errors, touched, setFieldValue}) => {
						useEffect(() => {
							if (id) {
								getGrupoById(id)
									.unwrap()
									.then((res) => {

										setFieldValue(formField.name.name, res.name, true);
										setPermisos(res.permissions);
									});
							}
						}, [id]);
						return (
							<Form id={formId} autoComplete="off">
								<AddGrupo
									formData={{
										values,
										touched,
										formField,
										errors,
										id,
										setFieldValue,
										setPermisos,
										permisos,
									}}
								/>
								<div className="mt-6 w-full flex justify-between">
									<Button
										onClick={() => {
											navigate("/configuracion/seguridad/roles");
										}}
										variant="outlined"
										color="error"
									>
										Cancelar
									</Button>
									<Button type="submit" variant="outlined" color="success">
										Aceptar
									</Button>
								</div>
							</Form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
}
