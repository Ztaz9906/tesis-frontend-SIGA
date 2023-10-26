import {Form, Formik} from "formik";

import {SettingsValidations} from "./schemas/validations";
import form from "./schemas/form";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button} from "@mui/material";

import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {useEditEstructuraMutation, useLazyGetEstructuraByIdQuery,} from "../service/estructura.service";

import SettingsEstructura from "./configurar.estructura";
import {List} from "lucide-react";
import {initialValuesSettings} from "./schemas/initialValues";

const getModifiedFields = (originalData, newData) => {
	return Object.fromEntries(
		Object.entries(newData).filter(([key, value]) => {
			return originalData[key] !== value;
		})
	);
};

export default function AddSettings() {
	const {id} = useParams();
	const {formId, formField} = form;
	const currentValidation = SettingsValidations[0];
	const navigate = useNavigate();
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
		isLoadingE,
		isSuccessE,
		isErrorE,
		errorE,
		"Estructura Configurada",
		"/configuracion/distribucion/estructuras"
	);

	const [estructura, setEstructura] = useState({});

	const submitForm = async (values, actions) => {
		try {
			const modifiedFields = getModifiedFields(data, values);
			if (Object.keys(modifiedFields).length !== 0) {
				editEstructura({id: id, ...modifiedFields});
			}
		} catch (error) {
			console.error(error);
			actions.setSubmitting(true);
		}
	};

	const handleSubmit = (values, actions) => {

		submitForm(values, actions);
		actions.setTouched({});
		actions.setSubmitting(false);
	};

	return (
		<div className="flex flex-col bg-gray-100 h-full">
			<div className="flex border-b border-gray-300 justify-between">
				<h2 className="text-gray-700 font-semibold text-lg justify-center al">
					Configurar estructura
				</h2>
				<Link
					to={"/configuracion/distribucion/estructuras"}
					className={`mx-5 `}
				>
					<List size={15}/>
				</Link>
			</div>
			{estructura && (
				<div
					className="flex flex-wrap justify-start items-center gap-16 p-5 text-sm text-gray-500 border-b border-gray-300">
					<div className="gap-1">
						<p className="font-semibold">
							<span className="font-bold">Nombre:</span> {estructura.name}
						</p>
						<p className="font-semibold">
							<span className="font-bold">Siglas:</span> {estructura.initials}
						</p>
						<p className="font-semibold">
							<span className="font-bold">Categoría:</span>
							{estructura.category ? estructura?.category.name : "---"}
						</p>
					</div>
					<div className="gap-1">
						<p className="font-semibold">
							<span className="font-bold">Estructura padre:</span>
							{estructura?.estructura_parent
								? estructura?.estructura_parent.name
								: "---"}
						</p>
						<p className="font-semibold">
							<span className="font-bold">Capacidad:</span>
							{estructura.capacidad ? estructura.capacidad : "---"}
						</p>
						<p className="font-semibold">
							<span className="font-bold">Activo:</span>
							{estructura.active ? "Si" : "No"}
						</p>
					</div>
					{/* This block appears to be repeated. Remove or adjust as necessary */}
					<div className="gap-1">
						<p className="font-semibold">
							<span className="font-bold">Sub Director:</span>
							{estructura?.id_sub_director
								? estructura?.id_sub_director.name
								: "---"}
						</p>
						<p className="font-semibold">
							<span className="font-bold">Técnico general:</span>
							{estructura.id_tecnico_general
								? estructura.id_tecnico_general.name
								: "---"}
						</p>
						<p className="">
							<span className="font-bold">Centro de costo:</span>
							{estructura.centro_costo ? estructura.centro_costo : "---"}
						</p>
					</div>
				</div>
			)}
			<Formik
				initialValues={initialValuesSettings}
				validationSchema={currentValidation}
				onSubmit={handleSubmit}
			>
				{({values, errors, touched, setFieldValue, isValid}) => {
					useEffect(() => {
						if (id) {
							getEstructuraById(id)
								.unwrap()
								.then((res) => {
									setEstructura(res);
									setFieldValue(
										formField.centro_costo.name,
										res.centro_costo,
										true
									);
									setFieldValue(
										formField.id_tecnico_general.name,
										res.id_tecnico_general ? res.id_tecnico_general.id : '',
										true
									);
									setFieldValue(
										formField.id_especialista_complejo.name,
										res.id_especialista_complejo ? res.id_especialista_complejo.id : '',
										true
									);
									setFieldValue(
										formField.id_sub_director.name,
										res.id_sub_director ? res.id_sub_director.id : '',
										true
									);
								});
						}
					}, [id]);
					return (
						<Form id={formId} autoComplete="off">
							<SettingsEstructura
								formData={{
									values,
									touched,
									formField,
									errors,
									setFieldValue,
									id,
								}}
							/>
							<div className="mt-6 w-full flex justify-end gap-1">
								<Button
									onClick={() => {
										navigate("/configuracion/distribucion/estructuras");
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
									Aceptar
								</Button>
							</div>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
}
