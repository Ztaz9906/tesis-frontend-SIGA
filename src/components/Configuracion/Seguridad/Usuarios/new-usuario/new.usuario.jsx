import {Form, Formik} from "formik";
import validations from "./schemas/validations";
import form from "./schemas/form";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Typography} from "@mui/material";
import initialValues, {initialValuesEdit} from "./schemas/initialValues";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {
	useCreateUsuarioMutation,
	useEditUsuarioMutation,
	useLazyGetUsuarioByIdQuery,
} from "../service/usuario.service.js";
import AddUsuario from "./components/usuario.info.jsx";

const getModifiedFields = (originalData, newData) => {
	return Object.fromEntries(
		Object.entries(newData).filter(([key, value]) => {
			return originalData[key] !== value;
		})
	);
};

export default function Usuario() {
	const {id} = useParams();
	const {formId, formField} = form;
	const [validation, setvalidation] = useState(validations[0])
	const [currentInitialValues, setCurrentInitialValues] = useState(initialValues)

	useEffect(() => {
		if (id) {
			setvalidation(validations[1])
			setCurrentInitialValues(initialValuesEdit)
		} else {
			setvalidation(validations[0])
			setCurrentInitialValues(initialValues[0])
		}
	}, [id]);
	const navigate = useNavigate();


	const [
		createUsuario,
		{
			isError: isErrorC,
			isLoading: isLoadingC,
			isSuccess: isSuccessC,
			error: errorC,
		},
	] = useCreateUsuarioMutation();

	const [
		editUsuario,
		{
			isError: isErrorE,
			isLoading: isLoadingE,
			isSuccess: isSuccessE,
			error: errorE,
		},
	] = useEditUsuarioMutation();

	const [getUsuarioById, {data}] = useLazyGetUsuarioByIdQuery();

	useRedirectForm(
		isLoadingC,
		isSuccessC,
		isErrorC,
		errorC,
		"Usuario creado",
		"/configuracion/seguridad/usuarios"
	);
	useRedirectForm(
		isLoadingE,
		isSuccessE,
		isErrorE,
		errorE,
		"Usuario editado",
		"/configuracion/seguridad/usuarios"
	);
	const submitForm = async (values, actions) => {
		try {
			if (!id) {
				createUsuario(values);
			} else {
				const {password, password_confirm, ...rest} = values;
				const modifiedFields = getModifiedFields(data, rest);
				if (Object.keys(modifiedFields).length !== 0) {
					editUsuario({id: id, ...modifiedFields});
				}
			}
		} catch (error) {
			console.error(error);
			actions.setSubmitting(true);
		}
	};

	const handleSubmit = (values, actions) => {
		submitForm(values, actions);
	};

	return (
		<div className="flex justify-center items-center bg-gray-100 h-full">
			<div className="w-full lg:w-2/3 bg-white p-3 rounded shadow-xl">
				<div className="text-center mb-6">
					<Typography variant="h5" fontWeight="bold">
						{!id ? "Registrar usuario" : `Editar usuario`}
					</Typography>
				</div>
				<Formik
					initialValues={currentInitialValues}
					validationSchema={validation}
					onSubmit={handleSubmit}
				>
					{({values, errors, touched, setFieldValue}) => {
						useEffect(() => {
							if (id) {
								getUsuarioById(id)
									.unwrap()
									.then((res) => {

										setFieldValue(formField.username.name, res.username, true);
										setFieldValue(
											formField.email.name,
											res.email,
											true
										);
										const urls = res.groups.map(group => group.url);
										setFieldValue(formField.groups.name, urls);
										setFieldValue(
											formField.institucion.name,
											res.institucion.url,
											true
										);
									});
							}
						}, [id]);
						return (
							<Form id={formId} autoComplete="off">
								<AddUsuario
									formData={{
										values,
										touched,
										formField,
										errors,
										setFieldValue,
										id
									}}
								/>
								<div className="mt-6 w-full flex justify-between">
									<Button
										onClick={() => {
											navigate("/configuracion/seguridad/usuarios");
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
