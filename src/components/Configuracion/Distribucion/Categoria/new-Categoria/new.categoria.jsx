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

// @mui material components

// Material Dashboard 2 PRO React components
// NewAsignatura page components
// NewAsignatura layout schemas for form and form feilds
import validations from "./schemas/validations";
import form from "./schemas/form";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {Button, Typography} from "@mui/material";
import initialValues from "./schemas/initialValues";
import AddTorpedo from "./components/categoria.info";
import {
	useCreateCategoriaMutation,
	useEditCategoriaMutation,
	useLazyGetCategoriaByIdQuery,
} from "../service/categoria.service";
import {useRedirectForm} from "../../../../../hooks/useRedirectForm";
import {useSelector} from "react-redux";

const getModifiedFields = (originalData, newData) => {
	return Object.fromEntries(
		Object.entries(newData).filter(([key, value]) => {
			return originalData[key] !== value;
		})
	);
};

export default function Categoria() {
	const {id} = useParams();
	const {formId, formField} = form;
	const currentValidation = validations[0];
	const navigate = useNavigate();
	const [
		createCategoria,
		{
			isError: isErrorC,
			isLoading: isLoadingC,
			isSuccess: isSuccessC,
			error: errorC,
		},
	] = useCreateCategoriaMutation();

	const [
		editCategoria,
		{
			isError: isErrorE,
			isLoading: isLoadingE,
			isSuccess: isSuccessE,
			error: errorE,
		},
	] = useEditCategoriaMutation();

	const [getCategoriaById, {data}] = useLazyGetCategoriaByIdQuery();

  useRedirectForm(
    isLoadingC,
    isSuccessC,
    isErrorC,
    errorC,
    "Categoría creada",
    "/configuracion/distribucion/categorias"
  );
  useRedirectForm(
    isLoadingE,
    isSuccessE,
    isErrorE,
    errorE,
    "Categoría editada",
    "/configuracion/distribucion/categorias"
  );
  const submitForm = async (values, actions) => {
    try {
      if (!id) {
        createCategoria(values);
      } else {
        const modifiedFields = getModifiedFields(data, values);
        if (Object.keys(modifiedFields).length !== 0) {
          editCategoria({ id: id, ...modifiedFields });
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
						{!id ? "Registrar categoría" : `Editar categoría`}
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
								getCategoriaById(id)
									.unwrap()
									.then((res) => {
										setFieldValue(formField.active.name, res.active, true);
										setFieldValue(
											formField.description.name,
											res.description,
											true
										);
										setFieldValue(formField.name.name, res.name, true);
										setFieldValue(formField.color.name, res.color, true);
										setFieldValue(formField.base.name, res.base, true);
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
											navigate("/configuracion/distribucion/categorias");
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
