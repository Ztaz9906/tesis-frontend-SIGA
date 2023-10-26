import {Form, Formik} from "formik";
import validations from "./schemas/validations";
import form from "./schemas/form";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {Button, Typography} from "@mui/material";
import initialValues from "./schemas/initialValues";
import AddTorpedo from "./components/torpedo.info.jsx";
import {
	useCreateTorpedoMutation,
	useEditTorpedoMutation,
	useLazyGetTorpedoByIdQuery,
} from "../service/torpedo.service.js";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {useSelector} from "react-redux";

const getModifiedFields = (originalData, newData) => {
	return Object.fromEntries(
		Object.entries(newData).filter(([key, value]) => {
			return originalData[key] !== value;
		})
	);
};

export default function Torpedo() {
	const navigate = useNavigate()
	const {id} = useParams();
	const {formId, formField} = form;
	const currentValidation = validations[0];
	const [
		createTorpedo,
		{
			isError: isErrorC,
			isLoading: isLoadingC,
			isSuccess: isSuccessC,
			error: errorC,
		},
	] = useCreateTorpedoMutation();

	const [
		editTorpedo,
		{
			isError: isErrorE,
			isLoading: isLoadingE,
			isSuccess: isSuccessE,
			error: errorE,
		},
	] = useEditTorpedoMutation();

	const [getTorpedoById, {data}] = useLazyGetTorpedoByIdQuery();

	useRedirectForm(
		isLoadingC,
		isSuccessC,
		isErrorC,
		errorC,
		"Torpedo creado",
		"/configuracion/cajero/torpedos"
	);
	useRedirectForm(
		isLoadingE,
		isSuccessE,
		isErrorE,
		errorE,
		"Torpedo editado",
		"/configuracion/cajero/torpedos"
	);
	const submitForm = async (values, actions) => {
		try {
			if (!id) {
				createTorpedo(values);
			} else {
				const modifiedFields = getModifiedFields(data, values);
				if (Object.keys(modifiedFields).length !== 0) {
					editTorpedo({id: id, ...modifiedFields});
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
						{!id ? "Registrar torpedo" : `Editar torpedo`}
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
								getTorpedoById(id)
									.unwrap()
									.then((res) => {
										setFieldValue(
											formField.id_provincia.name,
											res.id_provincia.id_provincia,
											true
										);
										setFieldValue(
											formField.id_pais.name,
											res.id_pais.id_pais,
											true
										);
										setFieldValue(
											formField.id_sexo.name,
											res.id_sexo.id_sexo,
											true
										);
										setFieldValue(
											formField.id_municipio.name,
											res.id_municipio.id_municipio,
											true
										);
										setFieldValue(formField.descripcion.name, res.descripcion, true);
										setFieldValue(
											formField.ci.name,
											res.ci,
											true
										);
										setFieldValue(formField.nombre_completo.name, res.nombre_completo, true);
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
										errors
									}}
								/>
								<div className="mt-6 w-full flex justify-between">
									<Button
										onClick={() => {
											navigate("/configuracion/cajero/torpedos");
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
