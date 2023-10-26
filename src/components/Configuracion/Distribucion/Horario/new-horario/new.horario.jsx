import {Form, Formik} from "formik";
import validations from "./schemas/validations";
import form from "./schemas/form";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {Button, Typography} from "@mui/material";
import initialValues from "./schemas/initialValues";
import {
	useCreateHorarioMutation,
	useEditHorarioMutation,
	useLazyGetHorarioByIdQuery,
} from "../service/horario.service";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import AddHorario from "./components/horario.info";
import {useSelector} from "react-redux";

const getModifiedFields = (originalData, newData) => {
	return Object.fromEntries(
		Object.entries(newData).filter(([key, value]) => {
			return originalData[key] !== value;
		})
	);
};

export default function Horario() {
	const user = useSelector(state => state.user);
	const {id} = useParams();
	const {formId, formField} = form;
	const currentValidation = validations[0];
	const navigate = useNavigate();
	const [
		createHorario,
		{
			isError: isErrorC,
			isLoading: isLoadingC,
			isSuccess: isSuccessC,
			error: errorC,
		},
	] = useCreateHorarioMutation();

	const [
		editHorario,
		{
			isError: isErrorE,
			isLoading: isLoadingE,
			isSuccess: isSuccessE,
			error: errorE,
		},
	] = useEditHorarioMutation();

	const [getHorarioById, {data}] = useLazyGetHorarioByIdQuery();

	useRedirectForm(
		isLoadingC,
		isSuccessC,
		isErrorC,
		errorC,
		"Horario creado",
		"/configuracion/distribucion/horarios"
	);
	useRedirectForm(
		isLoadingE,
		isSuccessE,
		isErrorE,
		errorE,
		"Horario editado",
		"/configuracion/distribucion/horarios"
	);
	const submitForm = async (values, actions) => {
		try {
			if (!id) {
				createHorario(values);
			} else {
				const modifiedFields = getModifiedFields(data, values);
				if (Object.keys(modifiedFields).length !== 0) {
					editHorario({id: id, ...modifiedFields});
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
						{!id ? "Registrar horario" : `Editar horario`}
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
								getHorarioById(id)
									.unwrap()
									.then((res) => {

										setFieldValue(formField.activo.name, res.activo, true);
										setFieldValue(
											formField.hora_inicio.name,
											res.hora_inicio,
											true
										);
										setFieldValue(
											formField.nombre_horario.name,
											res.nombre_horario,
											true
										);
										setFieldValue(formField.hora_fin.name, res.hora_fin, true);
										const dias_semana_values = res.dias_semana.map(
											(item) => item.id_dia_semana
										);
										setFieldValue(
											formField.dias_semana.name,
											res.dias_semana.map((item) => item.id_dia_semana),
											true
										);
									});
							}
						}, [id]);
						return (
							<Form id={formId} autoComplete="off">
								<AddHorario
									formData={{
										values,
										touched,
										formField,
										errors,
										setFieldValue,
									}}
								/>
								<div className="mt-6 w-full flex justify-between">
									<Button
										onClick={() => {
											navigate("/configuracion/distribucion/Horarios");
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
