import {Form, Formik} from "formik";

import validations from "./schemas/validations";
import form from "./schemas/form";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Typography} from "@mui/material";
import initialValues from "./schemas/initialValues";

import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {
	useCreateEstructuraMutation,
	useEditEstructuraMutation,
	useLazyGetEstructuraByIdQuery,
} from "../service/estructura.service";
import AddEstructura from "./components/estructura.info";
import EstructuraPadre from "./components/estructura.padre";
import {useSelector} from "react-redux";

const getModifiedFields = (originalData, newData) => {
	return Object.fromEntries(
		Object.entries(newData).filter(([key, value]) => {
			return originalData[key] !== value;
		})
	);
};

function getSteps() {
	return ["Registrar Estructura", "Seleccionar Padre"];
}

function getStepContent(stepIndex, formData) {
	switch (stepIndex) {
		case 0:
			return <AddEstructura formData={formData}/>;
		case 1:
			return <EstructuraPadre formData={formData}/>;
		default:
			return null;
	}
}

export default function Estructura() {
	const {id} = useParams();
	const {formId, formField} = form;
	const currentValidation = validations[0];
	const navigate = useNavigate();
	const [
		createEstructura,
		{
			isError: isErrorC,
			isLoading: isLoadingC,
			isSuccess: isSuccessC,
			error: errorC,
		},
	] = useCreateEstructuraMutation();
	const [
		editEstructura,
		{
			isError: isErrorE,
			isLoading: isLoadingE,
			isSuccess: isSuccessE,
			error: errorE,
		},
	] = useEditEstructuraMutation();
	const [getEstructuraById, {data}] = useLazyGetEstructuraByIdQuery();
	useRedirectForm(
		isLoadingC,
		isSuccessC,
		isErrorC,
		errorC,
		"Estructura Creada",
		"/configuracion/distribucion/estructuras"
	);
	useRedirectForm(
		isLoadingE,
		isSuccessE,
		isErrorE,
		errorE,
		"Estructura Editada",
		"/configuracion/distribucion/estructuras"
	);
	const steps = getSteps();
	const [activeStep, setActiveStep] = useState(0);
	const isLastStep = activeStep === steps.length - 1;
	const handleback = () => {
		setActiveStep(activeStep - 1);
	};

	const submitForm = async (values, actions) => {
		try {
			if (!id) {
				createEstructura(values);
			} else {
				const modifiedFields = getModifiedFields(data, values);
				if (Object.keys(modifiedFields).length !== 0) {
					editEstructura({id: id, ...modifiedFields});
				}
			}
		} catch (error) {
			console.error(error);
			actions.setSubmitting(true);
		}
	};

	const handleSubmit = (values, actions) => {
		if (isLastStep) {
			submitForm(values, actions);
		} else {
			setActiveStep(activeStep + 1);
			actions.setTouched({});
			actions.setSubmitting(false);
		}
	};
	const user = useSelector(state => state.user);

	return (
		<div className="flex justify-center items-center bg-gray-100 h-full">
			<div className="w-full lg:w-2/3 bg-white p-3 rounded shadow-xl">
				<div className="text-center mb-6">
					<Typography variant="h5" fontWeight="bold">
						{!id ? "Registrar estructura" : `Editar estructura`}
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
					{({values, errors, touched, setFieldValue, isValid}) => {
						useEffect(() => {
							if (id) {
								getEstructuraById(id)
									.unwrap()
									.then((res) => {
										(res);
										setFieldValue(formField.active.name, res.active, true);
										setFieldValue(
											formField.description.name,
											res.description,
											true
										);
										setFieldValue(formField.name.name, res.name, true);
										setFieldValue(
											formField.capacidad.name,
											res.capacidad,
											true
										);
										setFieldValue(formField.initials.name, res.initials, true);
										setFieldValue(
											formField.category.name,
											res.category.id,
											true
										);
										setFieldValue(
											formField.estructura_parent.name,
											res.estructura_parent?.id,
											true
										);
									});
							}
						}, [id]);
						return (
							<Form id={formId} autoComplete="off">
								{getStepContent(activeStep, {
									values,
									touched,
									formField,
									errors,
									setFieldValue,
									id,
								})}
								<div className="mt-6 w-full flex justify-between">
									<Button
										onClick={() => {
											activeStep === 0
												? navigate("/configuracion/distribucion/estructuras")
												: handleback();
										}}
										variant="outlined"
										color="error"
										type="button"
									>
										Cancelar
									</Button>
									<Button
										disabled={!id && !isValid}
										type="submit"
										variant="outlined"
										color="success"
									>
										{isLastStep ? "Aceptar" : "Siguiente"}
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
