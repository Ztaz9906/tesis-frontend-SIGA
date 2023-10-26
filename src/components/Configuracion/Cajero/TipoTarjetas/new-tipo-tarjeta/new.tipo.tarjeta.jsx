import {Form, Formik} from "formik";
import validations from "./schemas/validations";
import form from "./schemas/form";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {Button, Typography} from "@mui/material";
import initialValues from "./schemas/initialValues";
import AddTipoTarjeta from "./components/tipo.tarjeta.info";
import {
	useCreateTipoTarjetaMutation,
	useEditTipoTarjetaMutation,
	useLazyGetTipoTarjetaByIdQuery,
} from "../service/tipo.tarjeta.service";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {useSelector} from "react-redux";

const getModifiedFields = (originalData, newData) => {
	return Object.fromEntries(
		Object.entries(newData).filter(([key, value]) => {
			return originalData[key] !== value;
		})
	);
};

export default function TipoTarjeta() {
	const {id} = useParams();
	const {formId, formField} = form;
	const currentValidation = validations[0];
	const navigate = useNavigate();
	const [
		createTipoTarjeta,
		{
			isError: isErrorC,
			isLoading: isLoadingC,
			isSuccess: isSuccessC,
			error: errorC,
		},
	] = useCreateTipoTarjetaMutation();

	const [
		editTipoTarjeta,
		{
			isError: isErrorE,
			isLoading: isLoadingE,
			isSuccess: isSuccessE,
			error: errorE,
		},
	] = useEditTipoTarjetaMutation();

	const [getTipoTarjetaById, {data}] = useLazyGetTipoTarjetaByIdQuery();

	useRedirectForm(
		isLoadingC,
		isSuccessC,
		isErrorC,
		errorC,
		"Tipo de tarjeta creada",
		"/configuracion/cajero/tipo_tarjetas"
	);
	useRedirectForm(
		isLoadingE,
		isSuccessE,
		isErrorE,
		errorE,
		"Tipo de tarjeta editada",
		"/configuracion/cajero/tipo_tarjetas"
	);
	const submitForm = async (values, actions) => {
		try {
			if (!id) {
				createTipoTarjeta(values);
			} else {
				const modifiedFields = getModifiedFields(data, values);
				if (Object.keys(modifiedFields).length !== 0) {
					editTipoTarjeta({id: id, ...modifiedFields});
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
						{!id ? "Registrar tipo de tarjeta" : `Editar tipo de tarjeta`}
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
								getTipoTarjetaById(id)
									.unwrap()
									.then((res) => {
										setFieldValue(formField.activo.name, res.activo, true);
										setFieldValue(
											formField.nombre_tipo_tarjeta.name,
											res.nombre_tipo_tarjeta,
											true
										);
										setFieldValue(formField.color.name, res.color, true);
										setFieldValue(
											formField.descripcion.name,
											res.descripcion,
											true
										);
									});
							}
						}, [id]);
						return (
							<Form id={formId} autoComplete="off">
								<AddTipoTarjeta
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
											navigate("/configuracion/cajero/tipo_tarjetas");
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
