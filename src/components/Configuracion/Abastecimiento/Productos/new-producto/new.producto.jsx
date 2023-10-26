import {Form, Formik} from "formik";
import validations from "./schemas/validations";
import form from "./schemas/form";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {Button, Typography} from "@mui/material";
import initialValues from "./schemas/initialValues";
import {
	useCreateProductoMutation,
	useEditProductoMutation,
	useLazyGetProductoByIdQuery,
} from "../service/producto.service";
import {useRedirectForm} from "../../../../../hooks/useRedirectForm";
import {useSelector} from "react-redux";
import AddProducto from "./components/producto.info";

const getModifiedFields = (originalData, newData) => {
	return Object.fromEntries(
		Object.entries(newData).filter(([key, value]) => {
			return originalData[key] !== value;
		})
	);
};

export default function Producto() {
	const {id} = useParams();
	const {formId, formField} = form;
	const currentValidation = validations[0];
	const navigate = useNavigate();
	const [
		createProducto,
		{
			isError: isErrorC,
			isLoading: isLoadingC,
			isSuccess: isSuccessC,
			error: errorC,
		},
	] = useCreateProductoMutation();

	const [
		editProducto,
		{
			isError: isErrorE,
			isLoading: isLoadingE,
			isSuccess: isSuccessE,
			error: errorE,
		},
	] = useEditProductoMutation();

	const [getProductoById, {data}] = useLazyGetProductoByIdQuery();

	useRedirectForm(
		isLoadingC,
		isSuccessC,
		isErrorC,
		errorC,
		"Producto creado",
		"/configuracion/abastecimiento/productos"
	);
	useRedirectForm(
		isLoadingE,
		isSuccessE,
		isErrorE,
		errorE,
		"Producto editado",
		"/configuracion/abastecimiento/productos"
	);
	const submitForm = async (values, actions) => {
		try {
			if (!id) {
				createProducto(values);
			} else {
				const modifiedFields = getModifiedFields(data, values);
				if (Object.keys(modifiedFields).length !== 0) {
					editProducto({id: id, ...modifiedFields});
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
						{!id ? "Registrar producto" : `Editar producto`}
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
								getProductoById(id)
									.unwrap()
									.then((res) => {

										setFieldValue(
											formField.descripcion.name,
											res.descripcion,
											true
										);
										setFieldValue(
											formField.id_tipo_producto.name,
											res.id_tipo_producto.id_tipo_producto,
											true
										);
										setFieldValue(
											formField.id_unidad_medida.name,
											res.id_unidad_medida.id_unidad_medida,
											true
										);
										setFieldValue(
											formField.nombre_producto.name,
											res.nombre_producto,
											true
										);
										setFieldValue(
											formField.precio_cup.name,
											res.precio_cup,
											true
										);
									});
							}
						}, [id]);
						return (
							<Form id={formId} autoComplete="off">
								<AddProducto
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
											navigate("/configuracion/abastecimiento/productos");
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
