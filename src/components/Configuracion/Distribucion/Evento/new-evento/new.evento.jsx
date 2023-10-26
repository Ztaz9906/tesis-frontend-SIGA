import {Form, Formik} from "formik";
import validations from "./schemas/validations";
import form from "./schemas/form";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {Button, Typography} from "@mui/material";
import initialValues from "./schemas/initialValues";
import AddTorpedo from "./components/evento.info.jsx";
import {useCreateEventoMutation, useEditEventoMutation, useLazyGetEventoByIdQuery,} from "../service/evento.service.js";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {useSelector} from "react-redux";

const getModifiedFields = (originalData, newData) => {
	return Object.fromEntries(
		Object.entries(newData).filter(([key, value]) => {
			return originalData[key] !== value;
		})
	);
};

export default function Evento() {
	const {id} = useParams();
	const {formId, formField} = form;
	const currentValidation = validations[0];
	const navigate = useNavigate();
	const [
		createEvento,
		{
			isError: isErrorC,
			isLoading: isLoadingC,
			isSuccess: isSuccessC,
			error: errorC,
		},
	] = useCreateEventoMutation();

	const [
		editEvento,
		{
			isError: isErrorE,
			isLoading: isLoadingE,
			isSuccess: isSuccessE,
			error: errorE,
		},
	] = useEditEventoMutation();

	const [getEventoById, {data}] = useLazyGetEventoByIdQuery();

	useRedirectForm(
		isLoadingC,
		isSuccessC,
		isErrorC,
		errorC,
		"Evento creado",
		"/configuracion/distribucion/eventos"
	);
	useRedirectForm(
		isLoadingE,
		isSuccessE,
		isErrorE,
		errorE,
		"Evento editado",
		"/configuracion/distribucion/eventos"
	);
	const submitForm = async (values, actions) => {
		try {
			if (!id) {
				createEvento(values);
			} else {
				const modifiedFields = getModifiedFields(data, values);
				if (Object.keys(modifiedFields).length !== 0) {
					editEvento({id: id, ...modifiedFields});
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
						{!id ? "Registrar evento" : `Editar evento`}
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
								getEventoById(id)
									.unwrap()
									.then((res) => {

										setFieldValue(formField.activo.name, res.activo, true);
										setFieldValue(
											formField.descripcion_evento.name,
											res.descripcion_evento,
											true
										);
										setFieldValue(formField.nombre_evento.name, res.nombre_evento, true);
										setFieldValue(formField.activo.name, res.activo, true);
										setFieldValue(formField.id_horario.name, res.id_horario.id_horario, true);
										setFieldValue(formField.id_clasificacion_evento.name, res.id_clasificacion_evento.id_clasificacion_evento, true);
									});
							}
						}, [id]);
						return (
							<Form id={formId} autoComplete="off">
								<AddTorpedo
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
											navigate("/configuracion/distribucion/eventos");
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
