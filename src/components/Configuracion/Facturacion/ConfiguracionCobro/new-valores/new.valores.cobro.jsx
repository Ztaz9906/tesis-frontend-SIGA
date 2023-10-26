import {Form, Formik} from "formik";
import {validacionConfiguracionCobro, validacionValoresConfiguracion} from "./schemas/validations";
import form from "./schemas/form";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {Button, Typography} from "@mui/material";
import {initialValuesForm1, initialValuesForm2} from "./schemas/initialValues";
import {useSelector} from "react-redux";
import {SGTable} from "@/components/auxiliar/table.jsx";
import {Trash} from "lucide-react";
import Delete from "@/components/auxiliar/delete.jsx";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {
	useCreateValoresConfiguracionCobroMutation,
	useDeleteValoresConfiguracionCobroMutation,
	useGetValoresConfiguracionCobrosQuery,
} from "@/components/Configuracion/Facturacion/ConfiguracionCobro/servive/valores.configuracion.cobro.service.js";
import AddConfiguraciionCobro
	from "@/components/Configuracion/Facturacion/ConfiguracionCobro/new-valores/components/configuracion.cobro.info.jsx";
import AddValoresConfiguraciionCobro
	from "@/components/Configuracion/Facturacion/ConfiguracionCobro/new-valores/components/valores.configuracion.comensales.jsx";
import {
	useEditConfiguracionCobroMutation,
	useLazyGetConfiguracionCobroByIdQuery
} from "@/components/Configuracion/Facturacion/ConfiguracionCobro/servive/configuracion.cobro.service.js";

const getModifiedFields = (originalData, newData) => {
	return Object.fromEntries(
		Object.entries(newData).filter(([key, value]) => {
			return originalData[key] !== value;
		})
	);
};

export default function AgregarValoresConfigurcionCobro() {
	const {id} = useParams();
	const {form1Id, formField} = form;
	const navigate = useNavigate();

	const [getConfiguracionCobro, {data: congiguracion}] = useLazyGetConfiguracionCobroByIdQuery();
	const [
		CreateValoresConfiguracionCobro,
		{
			isError: isErrorC,
			isLoading: isLoadingC,
			isSuccess: isSuccessC,
			error: errorC,
		},
	] = useCreateValoresConfiguracionCobroMutation();
	useRedirectForm(
		isLoadingC,
		isSuccessC,
		isErrorC,
		errorC,
		"Valor de configuración asociado",
	);

	const [
		DeleteValoresConfiguracionCobro,
		{
			isError: isErrorD,
			isLoading: isLoadingD,
			isSuccess: isSuccessD,
			error: errorD,
		},
	] = useDeleteValoresConfiguracionCobroMutation();
	useRedirectForm(
		isLoadingD,
		isSuccessD,
		isErrorD,
		errorD,
		"Valor de configuración eliminado",
	);
	const {data} = useGetValoresConfiguracionCobrosQuery({id_configuracion_cobro: id}, {
		refetchOnReconnect: true,
	});
	const [
		EditConfiguracionCobro,
		{
			isError: isErrorE,
			isLoading: isLoadingE,
			isSuccess: isSuccessE,
			error: errorE,
		},
	] = useEditConfiguracionCobroMutation();
	useRedirectForm(
		isLoadingE,
		isSuccessE,
		isErrorE,
		errorE,
		"Valores de la configuración de cobro agregados",
		'/configuracion/facturacion/configuracion-cobro'
	);
	const submitForm = async (values) => {
		const modifiedFields = getModifiedFields(congiguracion, values);
		if (Object.keys(modifiedFields).length !== 0) {
			EditConfiguracionCobro({id: id, ...modifiedFields});
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
				accessorFn: (row) => row.id_categoria?.nombre_categoria,
				cell: (info) => info.getValue(),
				header: "Nombre",
				footer: (props) => props.column.id,
			},
			{
				id: "id_categoria_residente",
				accessorFn: (row) => row.id_categoria_residente?.nombre_categoria_residente,
				cell: (info) => info.getValue(),
				header: "Descripción",
				footer: (props) => props.column.id,
			},
			{
				id: "id_tipo_cobro",
				accessorFn: (row) => row.id_tipo_cobro?.nombre_tipo_cobro,
				cell: (info) => info.getValue(),
				header: "Tipo de cobro",
				footer: (props) => props.column.id,
			},
			{
				id: "id_evento",
				accessorFn: (row) => row.id_evento?.nombre_evento,
				cell: (info) => info.getValue(),
				header: "Evento",
				footer: (props) => props.column.id,
			},
			{
				id: "precio",
				accessorFn: (row) => row.precio,
				cell: (info) => info.getValue() + ' ' + ' CUP',
				header: "Precio",
				footer: (props) => props.column.id,
			},
			{
				id: "Opciones",
				accessorFn: (row) => (
					<div className="flex gap-2 justify-center items-center">
						<Delete
							title={`Borrar el ID:${row.id_valores_configuracion_cobro}`}
							message="¿Está seguro que desea eliminar este valor de la configuración?"
							action={() => DeleteValoresConfiguracionCobro(row.id_valores_configuracion_cobro)}
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

		const {descripcion, nombre_configuracion_cobro, ...rest} = values

		CreateValoresConfiguracionCobro({
			id_configuracion_cobro: id,
			...values
		}).then(() => {
			actions.resetForm()
		})
	}
	return (
		<div className="flex flex-col bg-gray-100">

			<div className="text-center mb-6">
				<Typography variant="h5" fontWeight="bold">
					{`Valores de configuración de cobro`}
				</Typography>
			</div>
			<Formik
				initialValues={{
					...initialValuesForm1,
					id_institucion: user.institucion.id,
				}}
				validationSchema={validacionConfiguracionCobro}
				onSubmit={handleSubmit}
			>
				{({values, errors, touched, setFieldValue}) => {
					useEffect(() => {
						if (id) {
							getConfiguracionCobro(id)
								.unwrap()
								.then((res) => {
									setFieldValue(formField.descripcion.name, res.descripcion, true);
									setFieldValue(formField.nombre_configuracion_cobro.name, res.nombre_configuracion_cobro, true);
								});
						}
					}, [id]);
					return (
						<div className={'flex flex-col p-3'}>
							<Form id={form1Id} autoComplete="off">
								<AddConfiguraciionCobro
									formData={{
										values,
										touched,
										formField,
										errors,
									}}
								/>

								<div className="mt-6 w-full flex justify-start gap-2">
									<Button
										onClick={() => {
											navigate("/configuracion/facturacion/configuracion-cobro");
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
			<Formik
				initialValues={{
					...initialValuesForm2,
					id_institucion: user.institucion.id,
				}}
				validationSchema={validacionValoresConfiguracion}
				onSubmit={handleAsociar}
			>
				{({values, errors, touched}) => {
					return (
						<Form id={'form2Id'} autoComplete="off">
							<AddValoresConfiguraciionCobro
								formData={{
									formField,
									values,
									touched,
									errors,
								}}
							/>
							<Button type={'submit'} variant="outlined" color="success">
								Asociar
							</Button>
						</Form>
					);
				}}
			</Formik>
			<SGTable data={datadef} setFilter={false} setPagination={false}/>
		</div>
	);
}
