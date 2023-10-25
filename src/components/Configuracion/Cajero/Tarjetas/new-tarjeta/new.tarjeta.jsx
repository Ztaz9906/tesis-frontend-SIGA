import {Form, Formik} from "formik";
import validations from "./schemas/validations";
import form from "./schemas/form";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {Button, Typography} from "@mui/material";
import initialValues from "./schemas/initialValues";
import AddTarjeta from "./components/tipo.tarjeta.info";
import {
	useCreateTarjetaMutation,
	useEditTarjetaMutation,
	useLazyGetTarjetaByIdQuery,
} from "../service/tarjeta.service.js";
import {useRedirectForm} from "../../../../../hooks/useRedirectForm";
import {useSelector} from "react-redux";

const getModifiedFields = (originalData, newData) => {
	return Object.fromEntries(
		Object.entries(newData).filter(([key, value]) => {
			return originalData[key] !== value;
		})
	);
};

export default function Tarjeta() {
	const location = useLocation()
	const {id} = useParams();
	const {formId, formField} = form;
	const currentValidation = validations[0];
	const navigate = useNavigate();
	const [
		createTarjeta,
		{
			isError: isErrorC,
			isLoading: isLoadingC,
			isSuccess: isSuccessC,
			error: errorC,
		},
	] = useCreateTarjetaMutation();

	const [
		editTarjeta,
		{
			isError: isErrorE,
			isLoading: isLoadingE,
			isSuccess: isSuccessE,
			error: errorE,
		},
	] = useEditTarjetaMutation();

	const [getTarjetaById, {data}] = useLazyGetTarjetaByIdQuery();

	useRedirectForm(
		isLoadingC,
		isSuccessC,
		isErrorC,
		errorC,
		"Tarjeta creada",
		"/configuracion/cajero/tarjetas"
	);
	useRedirectForm(
		isLoadingE,
		isSuccessE,
		isErrorE,
		errorE,
		"Tarjeta editada",
		"/configuracion/cajero/tarjetas"
	);
	const submitForm = async (values, actions) => {
		try {
			if (!id) {
				createTarjeta(values);
			} else {
				const modifiedFields = getModifiedFields(data, values);
				if (Object.keys(modifiedFields).length !== 0) {
					editTarjeta({id: id, ...modifiedFields});
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
						{!id ? "Registrar tarjeta" : location.pathname.includes('update-estado') ? `Editar estado de tarjeta` : `Editar tarjeta`}
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
								getTarjetaById(id)
									.unwrap()
									.then((res) => {
										setFieldValue(formField.id_tipo_tarjeta.name, res.id_tipo_tarjeta.id_tipo_tarjeta, true);
										setFieldValue(
											formField.id_estado_tarjeta.name,
											res.id_estado_tarjeta.id_estado_tarjeta,
											true
										);
										setFieldValue(formField.fecha_fin.name, res.fecha_fin, true);
										setFieldValue(
											formField.fecha_inicio.name,
											res.fecha_inicio,
											true
										);
									});
							}
						}, [id]);
						return (
							<Form id={formId} autoComplete="off">
								<AddTarjeta
									formData={{
										values,
										touched,
										formField,
										errors,
										location,
									}}
								/>
								<div className="mt-6 w-full flex justify-between">
									<Button
										onClick={() => {
											navigate("/configuracion/cajero/tarjetas");
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
