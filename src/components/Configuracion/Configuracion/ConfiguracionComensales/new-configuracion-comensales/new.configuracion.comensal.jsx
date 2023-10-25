import {Form, Formik} from "formik";
import validations from "./schemas/validations";
import form from "./schemas/form";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Typography} from "@mui/material";
import {initialValuesForm1} from "./schemas/initialValues";
import {useSelector} from "react-redux";
import AddConfiguraciionComensales from "./components/configuracion.comensal.info.jsx";
import {
	useEditConfiguracionComensalesMutation,
	useLazyGetConfiguracionComensalesByIdQuery
} from "@/components/Configuracion/Configuracion/ConfiguracionComensales/service/configuracion.comensales.service.js";
import AddValoresConfiguraciionComensales
	from "@/components/Configuracion/Configuracion/ConfiguracionComensales/new-configuracion-comensales/components/valores.configuracion.comensales.jsx";
import {SGTable} from "@/components/auxiliar/table.jsx";
import {Trash} from "lucide-react";
import Delete from "@/components/auxiliar/delete.jsx";
import {
	useCreateValoresConfiguracionComensalesMutation,
	useDeleteValoresConfiguracionComensalesMutation,
	useGetValoresConfiguracionComensalesQuery,
} from "@/components/Configuracion/Configuracion/ConfiguracionComensales/service/valores.configuracion.comensales.js";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";

const getModifiedFields = (originalData, newData) => {
	return Object.fromEntries(
		Object.entries(newData).filter(([key, value]) => {
			return originalData[key] !== value;
		})
	);
};

export default function ConfiguracionComensal() {
	const {id} = useParams();
	const {form1Id, formField} = form;
	const currentValidationForm1 = validations[0];
	const navigate = useNavigate();
	const [IdValores, setIdValores] = useState()
	const [redirect, setRedirect] = useState(true)
	useEffect(() => {
		if (!redirect) {
			navigate(`/configuracion/configuracion/configuracion-comensales`)
		}
	}, [redirect])
	const [getConfiguracionComensales, {data: congiguracion}] = useLazyGetConfiguracionComensalesByIdQuery();
	const [
		CreateValoresConfiguracionComensales,
		{
			isError: isErrorC,
			isLoading: isLoadingC,
			isSuccess: isSuccessC,
			error: errorC,
		},
	] = useCreateValoresConfiguracionComensalesMutation();
	useRedirectForm(
		isLoadingC,
		isSuccessC,
		isErrorC,
		errorC,
		"Valor de configuración asociado",
	);

	const [
		DeleteValoresConfiguracionComensales,
		{
			isError: isErrorD,
			isLoading: isLoadingD,
			isSuccess: isSuccessD,
			error: errorD,
		},
	] = useDeleteValoresConfiguracionComensalesMutation();
	useRedirectForm(
		isLoadingD,
		isSuccessD,
		isErrorD,
		errorD,
		"Valor de configuración eliminado",
	);
	const {data} = useGetValoresConfiguracionComensalesQuery({id_configuracion_persona: IdValores}, {
		refetchOnReconnect: true,
	});
	const [
		EditConfiguracionComensales,
		{
			isError: isErrorE,
			isLoading: isLoadingE,
			isSuccess: isSuccessE,
			error: errorE,
		},
	] = useEditConfiguracionComensalesMutation();
	useRedirectForm(
		isLoadingE,
		isSuccessE,
		isErrorE,
		errorE,
		"Valores de la configuración de comensales agregados",
		'/configuracion/configuracion/configuracion-comensales'
	);
	const submitForm = async (values) => {
		const modifiedFields = getModifiedFields(congiguracion, values);
		if (Object.keys(modifiedFields).length !== 0) {
			EditConfiguracionComensales({id: id, ...modifiedFields});
		}
	};

	const handleSubmit = (values, actions) => {
		submitForm(values, actions);
	};

	const user = useSelector(state => state.user);


	const datadef = {
		columns: [
			{
				id: "id_categoria",
				accessorFn: (row) => row.id_categoria.nombre_categoria,
				cell: (info) => info.getValue(),
				header: "Nombre",
				footer: (props) => props.column.id,
			},
			{
				id: "id_categoria_residente",
				accessorFn: (row) => row.id_categoria_residente.nombre_categoria_residente,
				cell: (info) => info.getValue(),
				header: "Descripción",
				footer: (props) => props.column.id,
			},
			{
				id: "id_estructura",
				accessorFn: (row) => row.id_estructura.nombre_estructura,
				cell: (info) => info.getValue(),
				header: "Áreas",
				footer: (props) => props.column.id,
			},
			{
				id: "Opciones",
				accessorFn: (row) => (
					<div className="flex gap-2 justify-center items-center">
						<Delete
							title={`Borrar el ID:${row.id_calores_configuracion_persona}`}
							message="¿Está seguro que desea eliminar este valor de la configuración?"
							action={() => DeleteValoresConfiguracionComensales(row.id_calores_configuracion_persona)}
						>
							<Button variant={"ghost"} size={"icon"}>
								<Trash size={15}/>
							</Button>
						</Delete>
					</div>
				),
				cell: (info) => info.getValue(),
				header: "Opciones",
				footer: (props) => props.column.id,
			},
		],
		rows: data ?? [],
	};
	const handleAsociar = (values, actions) => {

		const {descripcion, activo, ...rest} = values

		CreateValoresConfiguracionComensales({
			id_configuracion_persona: IdValores,
			...rest
		})
	}
	return (
		<div className="flex flex-col bg-gray-100">

			<div className="text-center mb-6">
				<Typography variant="h5" fontWeight="bold">
					{!id ? "Registrar configuración de comensales" : `Editar configuración de comensales`}
				</Typography>
			</div>
			<Formik
				initialValues={{
					...initialValuesForm1,
					activo: true,
					id_institucion: user.institucion.id,
				}}
				validationSchema={currentValidationForm1}
				onSubmit={handleSubmit}
			>
				{({values, errors, touched, setFieldValue}) => {
					useEffect(() => {
						if (id) {
							getConfiguracionComensales(id)
								.unwrap()
								.then((res) => {
									setFieldValue(formField.descripcion.name, res.descripcion, true);
									setIdValores(res.id_configuracion_persona);
									setRedirect(res.activo);
								});
						}
					}, [id]);
					return (
						<div className={'flex flex-col p-3'}>
							<Form id={form1Id} autoComplete="off">
								<AddConfiguraciionComensales
									formData={{
										values,
										touched,
										formField,
										errors,
									}}
								/>
								<AddValoresConfiguraciionComensales
									formData={{
										formField,
									}}
								/>
								<Button onClick={() => {
									handleAsociar(values)
								}} variant="outlined" color="success">
									Asociar
								</Button>
								<SGTable data={datadef} setFilter={false} setPagination={false}/>
								<div className="mt-6 w-full flex justify-start gap-2">
									<Button
										onClick={() => {
											navigate("/configuracion/configuracion/configuracion-comensales");
										}}
										variant="outlined"
										color="error"
									>
										Cancelar
									</Button>
									<Button type={'submit'} variant="outlined" color="success">
										Aceptar
									</Button>
								</div>
							</Form>
						</div>
					);
				}}
			</Formik>
		</div>
	);
}
