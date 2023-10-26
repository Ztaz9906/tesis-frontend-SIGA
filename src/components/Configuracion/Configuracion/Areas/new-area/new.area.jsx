import {Form, Formik} from "formik";
import validations from "./schemas/validations";
import form from "./schemas/form";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {Button, Typography} from "@mui/material";
import initialValues from "./schemas/initialValues";
import AddArea from "./components/tipo.area.info.jsx";
import {useCreateAreaMutation, useEditAreaMutation, useLazyGetAreaByIdQuery,} from "../service/areas.service.js";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {useSelector} from "react-redux";

const getModifiedFields = (originalData, newData) => {
	return Object.fromEntries(
		Object.entries(newData).filter(([key, value]) => {
			return originalData[key] !== value;
		})
	);
};

export default function Area() {
	const {id} = useParams();
	const {formId, formField} = form;
	const currentValidation = validations[0];
	const navigate = useNavigate();
	const [
		createArea,
		{
			isError: isErrorC,
			isLoading: isLoadingC,
			isSuccess: isSuccessC,
			error: errorC,
		},
	] = useCreateAreaMutation();

	const [
		editArea,
		{
			isError: isErrorE,
			isLoading: isLoadingE,
			isSuccess: isSuccessE,
			error: errorE,
		},
	] = useEditAreaMutation();

	const [getAreaById, {data}] = useLazyGetAreaByIdQuery();

	useRedirectForm(
		isLoadingC,
		isSuccessC,
		isErrorC,
		errorC,
		"Área creada",
		"/configuracion/configuracion/areas"
	);
	useRedirectForm(
		isLoadingE,
		isSuccessE,
		isErrorE,
		errorE,
		"Área editada",
		"/configuracion/configuracion/areas"
	);
	const submitForm = async (values, actions) => {
		try {
			if (!id) {
				createArea(values);
			} else {
				const modifiedFields = getModifiedFields(data, values);
				if (Object.keys(modifiedFields).length !== 0) {
					editArea({id: id, ...modifiedFields});
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
	const user = useSelector(state => state.user);
	return (
		<div className="flex justify-center items-center bg-gray-100 h-full">
			<div className="w-full lg:w-2/3 bg-white p-3 rounded shadow-xl">
				<div className="text-center mb-6">
					<Typography variant="h5" fontWeight="bold">
						{!id ? "Registrar área" : `Editar área`}
					</Typography>
				</div>
				<Formik
					initialValues={{
						...initialValues,
						id_institucion: user.institucion.id,
					}}
					validationSchema={currentValidation}
					onSubmit={handleSubmit}
				>
					{({values, errors, touched, setFieldValue}) => {
						useEffect(() => {
							if (id) {
								getAreaById(id)
									.unwrap()
									.then((res) => {
										setFieldValue(formField.id_tipo_estructura.name, res.id_tipo_estructura.id_tipo_estructura, true);
										setFieldValue(
											formField.activo.name,
											res.activo,
											true
										);
										setFieldValue(formField.codigo_area.name, res.codigo_area, true);
										setFieldValue(formField.codigo_externo.name, res.codigo_externo, true);
										setFieldValue(
											formField.nombre_estructura.name,
											res.nombre_estructura,
											true
										);
										setFieldValue(formField.estructura_consejo.name, res.estructura_consejo, true);
										setFieldValue(formField.estructura_credencial.name, res.estructura_credencial, true);

									});
							}
						}, [id]);
						return (
							<Form id={formId} autoComplete="off">
								<AddArea
									formData={{
										values,
										touched,
										formField,
										errors,
									}}
								/>
								<div className="mt-6 w-full flex justify-between">
									<Button
										onClick={() => {
											navigate("/configuracion/configuracion/areas");
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
