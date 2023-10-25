import {Form, Formik} from "formik";
import validations from "./schemas/validations";
import form from "./schemas/form";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {Button, Typography} from "@mui/material";
import initialValues from "./schemas/initialValues";
import {
	useCreateTipoProductoMutation,
	useEditTipoProductoMutation,
	useLazyGetTipoProductoByIdQuery,
} from "../service/tipo.producto.service";
import {useRedirectForm} from "../../../../../hooks/useRedirectForm";
import {useSelector} from "react-redux";
import AddTipoProducto from "./components/tipo.producto.info";

const getModifiedFields = (originalData, newData) => {
	return Object.fromEntries(
		Object.entries(newData).filter(([key, value]) => {
			return originalData[key] !== value;
		})
	);
};

export default function TipoProducto() {
	const {id} = useParams();
	const {formId, formField} = form;
	const currentValidation = validations[0];
	const navigate = useNavigate();
	const [
		createTipoProducto,
		{
			isError: isErrorC,
			isLoading: isLoadingC,
			isSuccess: isSuccessC,
			error: errorC,
		},
	] = useCreateTipoProductoMutation();

	const [
		editTipoProducto,
		{
			isError: isErrorE,
			isLoading: isLoadingE,
			isSuccess: isSuccessE,
			error: errorE,
		},
	] = useEditTipoProductoMutation();

	const [getTipoProductoById, {data}] = useLazyGetTipoProductoByIdQuery();

	useRedirectForm(
		isLoadingC,
		isSuccessC,
		isErrorC,
		errorC,
		"Tipo de producto creado",
		"/configuracion/abastecimiento/tipo_productos"
	);
	useRedirectForm(
		isLoadingE,
		isSuccessE,
		isErrorE,
		errorE,
		"Tipo de producto editado",
		"/configuracion/abastecimiento/tipo_productos"
	);
	const submitForm = async (values, actions) => {
		try {
			if (!id) {
				createTipoProducto(values);
			} else {
				const modifiedFields = getModifiedFields(data, values);
				if (Object.keys(modifiedFields).length !== 0) {
					editTipoProducto({id: id, ...modifiedFields});
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
						{!id ? "Registrar tipo de producto" : `Editar tipo de producto`}
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
								getTipoProductoById(id)
									.unwrap()
									.then((res) => {
										setFieldValue(formField.activo.name, res.activo, true);
										setFieldValue(
											formField.descripcion_tipo_producto.name,
											res.descripcion_tipo_producto,
											true
										);
										setFieldValue(
											formField.nombre_tipo_producto.name,
											res.nombre_tipo_producto,
											true
										);
									});
							}
						}, [id]);
						return (
							<Form id={formId} autoComplete="off">
								<AddTipoProducto
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
											navigate("/configuracion/abastecimiento/tipo_productos");
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
