import {Form, Formik} from "formik";
import validations from "./schemas/validations";
import form from "./schemas/form";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {Button, Typography} from "@mui/material";
import initialValues from "./schemas/initialValues";
import {
	useCreateTipoAreaMutation,
	useEditTipoAreaMutation,
	useLazyGetTipoAreaByIdQuery,
} from "../service/tipo.areas.service.js";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {useSelector} from "react-redux";
import AddTipoArea from "./components/tipo.area.info.jsx";

const getModifiedFields = (originalData, newData) => {
	return Object.fromEntries(
		Object.entries(newData).filter(([key, value]) => {
			return originalData[key] !== value;
		})
	);
};

export default function TipoArea() {
	const {id} = useParams();
	const {formId, formField} = form;
	const currentValidation = validations[0];
	const navigate = useNavigate();
	const [
		createTipoArea,
		{
			isError: isErrorC,
			isLoading: isLoadingC,
			isSuccess: isSuccessC,
			error: errorC,
		},
	] = useCreateTipoAreaMutation();

	const [
		editTipoArea,
		{
			isError: isErrorE,
			isLoading: isLoadingE,
			isSuccess: isSuccessE,
			error: errorE,
		},
	] = useEditTipoAreaMutation();

	const [getTipoAreaById, {data}] = useLazyGetTipoAreaByIdQuery();

	useRedirectForm(
		isLoadingC,
		isSuccessC,
		isErrorC,
		errorC,
		"Tipo de área creada",
		"/configuracion/configuracion/tipo_areas"
	);
	useRedirectForm(
		isLoadingE,
		isSuccessE,
		isErrorE,
		errorE,
		"Tipo de área editada",
		"/configuracion/configuracion/tipo_areas"
	);
	const submitForm = async (values, actions) => {
		try {
			if (!id) {
				createTipoArea(values);
			} else {
				const modifiedFields = getModifiedFields(data, values);
				if (Object.keys(modifiedFields).length !== 0) {
					editTipoArea({id: id, ...modifiedFields});
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
						{!id ? "Registrar tipo de área" : `Editar tipo de área`}
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
								getTipoAreaById(id)
									.unwrap()
									.then((res) => {
										setFieldValue(formField.activo.name, res.activo, true);
										setFieldValue(
											formField.nombre_tipo_estructura.name,
											res.nombre_tipo_estructura,
											true
										);
										setFieldValue(
											formField.descripcion_tipo_estructura.name,
											res.descripcion_tipo_estructura,
											true
										);
									});
							}
						}, [id]);
						return (
							<Form id={formId} autoComplete="off">
								<AddTipoArea
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
											navigate("/configuracion/configuracion/tipo_areas");
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
