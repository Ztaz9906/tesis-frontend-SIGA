import React, {useEffect} from "react";
import {Field, Form, Formik} from "formik";
import initialValues from "@/components/Configuracion/Seguridad/CargarExel/schema/initialValues.js";
import validations from "@/components/Configuracion/Seguridad/CargarExel/schema/validations.js";
import {useCreateUploadExcelMutation,} from "@/components/Configuracion/Seguridad/CargarExel/service/entrada.datos.js";
import form from "./schema/form";
import {Button, CircularProgress} from "@mui/material";
import FileInput from "@/components/auxiliar/FieldInput.jsx";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import useUser from "@/hooks/useUser.jsx";
import {useSnackbar} from "notistack";

export default function EntradaDatos() {
	const {formId, formField} = form;
	const currentValidation = validations[0];
	const {enqueueSnackbar} = useSnackbar();
	const [
		UploadFile,
		{
			isError: isErrorC,
			isLoading: isLoadingC,
			isSuccess: isSuccessC,
			error: errorC,
		},
	] = useCreateUploadExcelMutation();
	const [user] = useUser()

	function handleSubmit(values, actions) {
		const newValues = {
			file: values.file,
			institucion: user?.institucion?.id,
		};
		UploadFile(newValues)
	}

	useEffect(() => {
		if (isSuccessC) {
			enqueueSnackbar('Datos cargados correctamente', {
				variant: "success",
			});
		}
	}, [isSuccessC, enqueueSnackbar]);
	useRedirectForm(
		isErrorC,
		isLoadingC,
		isSuccessC,
		errorC,
		'Archivo Cargado correctamente'
	)
	return (
		<div className="flex flex-col gap-2">
			<div className="flex border-b border-gray-300 justify-between">
				<h2 className="text-gray-700 font-semibold text-lg justify-center al">
					Entrada de datos
				</h2>
			</div>
			<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={currentValidation}>
				{({values, errors, touched}) => {
					return (
						<Form id={formId} autoComplete="off">
							<Field name="file" component={FileInput}/>
							<div className="mt-6 w-full flex justify-between">
								<Button type="submit" variant="outlined" color="success">
									{isLoadingC ? (<CircularProgress size={20}/>) : 'Cargar ExCel'}
								</Button>
							</div>
						</Form>
					);
				}}
			</Formik>

		</div>
	);
}
