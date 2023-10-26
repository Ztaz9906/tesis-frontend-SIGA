import {Form, Formik} from "formik";
import validations from "./schemas/validations";
import form from "./schemas/form";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {Button, Typography} from "@mui/material";
import initialValues from "./schemas/initialValues";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {
	useCreateInstitucionMutation,
	useEditInstitucionMutation,
	useLazyGetInstitucionByIdQuery,
} from "../service/institucion.service";
import AddInstitucion from "./components/institucion.info";

const getModifiedFields = (originalData, newData) => {
	return Object.fromEntries(
		Object.entries(newData).filter(([key, value]) => {
			return originalData[key] !== value;
		})
	);
};

export default function Institucion() {
	const {id} = useParams();
	const {formId, formField} = form;
	const currentValidation = validations[0];
	const navigate = useNavigate();
	const [
		createInstitucion,
		{
			isError: isErrorC,
			isLoading: isLoadingC,
			isSuccess: isSuccessC,
			error: errorC,
		},
	] = useCreateInstitucionMutation();

	const [
		editInstitucion,
		{
			isError: isErrorE,
			isLoading: isLoadingE,
			isSuccess: isSuccessE,
			error: errorE,
		},
	] = useEditInstitucionMutation();

	const [getInstitucionById, {data}] = useLazyGetInstitucionByIdQuery();

	useRedirectForm(
		isLoadingC,
		isSuccessC,
		isErrorC,
		errorC,
		"Institucion creada",
		"/configuracion/seguridad/instituciones"
	);
	useRedirectForm(
		isLoadingE,
		isSuccessE,
		isErrorE,
		errorE,
		"Institucion editada",
		"/configuracion/seguridad/instituciones"
	);
	const submitForm = async (values, actions) => {
		try {
			if (!id) {
				createInstitucion(values);
			} else {
				const modifiedFields = getModifiedFields(data, values);
				if (Object.keys(modifiedFields).length !== 0) {
					editInstitucion({id: id, ...modifiedFields});
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
						{!id ? "Registrar institución" : `Editar institución`}
					</Typography>
				</div>
				<Formik
					initialValues={initialValues}
					validationSchema={currentValidation}
					onSubmit={handleSubmit}
				>
					{({values, errors, touched, setFieldValue}) => {
						useEffect(() => {
							if (id) {
								getInstitucionById(id)
									.unwrap()
									.then((res) => {
										setFieldValue(formField.active.name, res.active, true);
										setFieldValue(
											formField.description.name,
											res.description,
											true
										);
										setFieldValue(formField.name.name, res.name, true);
										setFieldValue(
											formField.active_modules.name,
											res.active_modules,
											true
										);
									});
							}
						}, [id]);
						return (
							<Form id={formId} autoComplete="off">
								<AddInstitucion
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
											navigate("/configuracion/seguridad/instituciones");
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
