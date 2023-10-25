/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// formik components
import {Form, Formik} from "formik";

import validations from "./schemas/validations";
import form from "./schemas/form";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {Button, Typography} from "@mui/material";
import initialValues from "./schemas/initialValues";
import {
	useCreateClassPlatosMutation,
	useEditClassPlatosMutation,
	useLazyGetClassPlatosByIdQuery,
} from "../service/clasificacion.platos.service";
import {useRedirectForm} from "../../../../../hooks/useRedirectForm";
import {useSelector} from "react-redux";
import AddClassPlatos from "./components/clasificacion.platos.info";

const getModifiedFields = (originalData, newData) => {
	return Object.fromEntries(
		Object.entries(newData).filter(([key, value]) => {
			return originalData[key] !== value;
		})
	);
};

export default function ClassPlatos() {
	const {id} = useParams();
	const {formId, formField} = form;
	const currentValidation = validations[0];
	const navigate = useNavigate();
	const [
		createClassPlatos,
		{
			isError: isErrorC,
			isLoading: isLoadingC,
			isSuccess: isSuccessC,
			error: errorC,
		},
	] = useCreateClassPlatosMutation();

	const [
		editClassPlatos,
		{
			isError: isErrorE,
			isLoading: isLoadingE,
			isSuccess: isSuccessE,
			error: errorE,
		},
	] = useEditClassPlatosMutation();

	const [getClassPlatosById, {data}] = useLazyGetClassPlatosByIdQuery();
  
	useRedirectForm(
		isLoadingC,
		isSuccessC,
		isErrorC,
		errorC,
		"Clasificación de platos creada",
		"/configuracion/abastecimiento/clasificacion_platos"
	);
	useRedirectForm(
		isLoadingE,
		isSuccessE,
		isErrorE,
		errorE,
		"Clasificación de platos editada",
		"/configuracion/abastecimiento/clasificacion_platos"
	);
	const submitForm = async (values, actions) => {
		try {
			if (!id) {
				createClassPlatos(values);
			} else {
				const modifiedFields = getModifiedFields(data, values);
				if (Object.keys(modifiedFields).length !== 0) {
					editClassPlatos({id: id, ...modifiedFields});
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
						{!id
							? "Registrar clasificación de platos"
							: `Editar clasificación de platos`}
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
								getClassPlatosById(id)
									.unwrap()
									.then((res) => {
										setFieldValue(formField.activo.name, res.activo, true);
										setFieldValue(
											formField.descripcion_clasificacion_plato.name,
											res.descripcion_clasificacion_plato,
											true
										);
										setFieldValue(
											formField.nombre_clasificacion_plato.name,
											res.nombre_clasificacion_plato,
											true
										);
									});
							}
						}, [id]);
						return (
							<Form id={formId} autoComplete="off">
								<AddClassPlatos
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
											navigate(
												"/configuracion/abastecimiento/clasificacion_platos"
											);
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