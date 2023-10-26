import {Form, Formik} from "formik";
import validations from "./schemas/validations";
import form from "./schemas/form";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Tooltip, Typography} from "@mui/material";
import initialValues from "./schemas/initialValues";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {useSelector} from "react-redux";
import {
	useLazyGetEstructuraByIdQuery
} from "@/components/Configuracion/Distribucion/Estructura/service/estructura.service.js";
import FormField from "@/components/auxiliar/FormField.jsx";
import {SGTable} from "@/components/auxiliar/table.jsx";

import Delete from "@/components/auxiliar/delete.jsx";
import {
	useCreateAsignarIpMutation,
	useDeleteAsignarIpMutation,
	useEditAsignarIpMutation,
	useGetAsignarIpQuery,
	useLazyGetAsignarIpByIdQuery
} from "@/components/Configuracion/Cajero/AsignarIP/service/asignarip.service.js";
import {Edit2Icon, Trash, Undo2} from "lucide-react";
import MyTypography from "@/components/auxiliar/MyTypography.jsx";


const getModifiedFields = (originalData, newData) => {
	return Object.fromEntries(
		Object.entries(newData).filter(([key, value]) => {
			return originalData[key] !== value;
		})
	);
};

export default function AsignarIp() {
	const {id} = useParams();
	const {formId, formField} = form;
	const currentValidation = validations[0];
	const [estructura, setEstructura] = useState({});
	const [selectedIpId, setSelectedIpId] = useState();
	const [
		createAsignarIp,
		{
			isError: isErrorC,
			isLoading: isLoadingC,
			isSuccess: isSuccessC,
			error: errorC,
		},
	] = useCreateAsignarIpMutation();

	const [
		editAsignarIp,
		{
			isError: isErrorE,
			isLoading: isLoadingE,
			isSuccess: isSuccessE,
			error: errorE,
		},
	] = useEditAsignarIpMutation();
	const [
		deleteAsignarIp,
		{
			isError: isErrorD,
			isLoading: isLoadingD,
			isSuccess: isSuccessD,
			error: errorD,
		},
	] = useDeleteAsignarIpMutation();

	const {data, refetch} = useGetAsignarIpQuery({id_puerta: id}, {
		refetchOnReconnect: true,
	});
	const user = useSelector((state) => state.user);
	useEffect(() => {
		refetch()
	}, [user, refetch]);
	const [getAsignarIpById, {data: asinarIp}] = useLazyGetAsignarIpByIdQuery()
	const [getEstructuraById, {data: structure}] = useLazyGetEstructuraByIdQuery()

	useEffect(() => {
		getEstructuraById(id)
			.unwrap()
			.then((res) => {
				setEstructura(res);
			});
	}, [id]);

	useRedirectForm(
		isLoadingC,
		isSuccessC,
		isErrorC,
		errorC,
		"Ip asignado",
	);
	useRedirectForm(
		isLoadingE,
		isSuccessE,
		isErrorE,
		errorE,
		"Ip editado",
	);
	useRedirectForm(
		isLoadingD,
		isSuccessD,
		isErrorD,
		errorD,
		"IP eliminado"
	);
	const submitForm = async (values, actions) => {
		try {
			if (!selectedIpId) {
				createAsignarIp(values);
				actions.resetForm();
			} else {
				const modifiedFields = getModifiedFields(asinarIp, values);
				if (Object.keys(modifiedFields).length !== 0) {
					editAsignarIp({id: selectedIpId, ...modifiedFields});
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
	const datadef = {
		columns: [
			{
				id: "ip_puerta",
				accessorFn: (row) => row.ip_puerta,
				cell: (info) => info.getValue(),
				header: "IP",
				footer: (props) => props.column.id,
			},
			{
				id: "Opciones",
				accessorFn: (row) => (
					<div className="flex gap-2 justify-center items-center">
						<Tooltip title={'Editar IP'}>
							<Button
								variant={"ghost"}
								onClick={() => setSelectedIpId(row.id_ip_puerta)}
							>
								<Edit2Icon size={15}/>
							</Button>
						</Tooltip>
						<Delete
							title={`Borrar ${row.ip_puerta}`}
							message="¿Está seguro que desea eliminar este IP?"
							action={() => deleteAsignarIp(row.id_ip_puerta)}
						>
							<Tooltip title={'Eliminar'}>
								<Button variant={"ghost"} size={"icon"}>
									<Trash size={15}/>
								</Button>
							</Tooltip>
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
	return (
		<div className="flex flex-col  bg-gray-100 h-full p-5">
			<div className="flex flex-row justify-between items-center text-start mb-6">
				<Typography variant="h5" fontWeight="bold">
					{`Asignar IP a puerta`}
				</Typography>
				<Tooltip title={"Atrás"}>
					<Link to={'/configuracion/cajero/asignar-ip'}>
						<Undo2 size={16}/>
					</Link>
				</Tooltip>
			</div>
			{estructura && (
				<div className="flex flex-wrap justify-start items-start gap-4 p-5 border-y border-gray-300">
					<div className="flex flex-wrap justify-start items-center gap-16 p-5">
						<div className="gap-1">
							<MyTypography label="Nombre" data={estructura.name}/>
							<MyTypography label="Siglas" data={estructura.initials}/>
							<MyTypography label="Categoría"
							              data={estructura.category ? estructura.category.name : null}/>
						</div>
						<div className="gap-1">
							<MyTypography label="Estructura padre" data={estructura?.estructura_parent?.name}/>
							<MyTypography label="Capacidad" data={estructura.capacidad}/>
							<MyTypography label="Activo" data={estructura.active ? "Si" : "No"}/>
						</div>
						<div className="gap-1">
							<MyTypography label="Sub Director" data={estructura?.id_sub_director?.name}/>
							<MyTypography label="Técnico general" data={estructura.id_tecnico_general?.name}/>
							<MyTypography label="Centro de costo" data={estructura.centro_costo}/>
						</div>
					</div>
				</div>
			)}
			<Formik
				initialValues={{
					...initialValues,
					id_institucion: user.institucion.id,
					id_puerta: id,
				}}
				validationSchema={currentValidation}
				onSubmit={handleSubmit}
			>
				{({values, errors, touched, resetForm, setFieldValue}) => {
					const {ip_puerta: ip_puertaV} = values;
					const {ip_puerta} = formField;
					useEffect(() => {
						if (selectedIpId) {
							getAsignarIpById(selectedIpId)
								.unwrap()
								.then((res) => {
									setFieldValue(formField.ip_puerta.name, res.ip_puerta, true)
								});
						}
					}, [selectedIpId]);

					function handleCancelar() {
						setSelectedIpId(null)
						setFieldValue(formField.ip_puerta.name, '');
					}

					return (
						<div className="flex flex-row items-center w-full gap-4 p-2">
							<Form id={formId} className="flex flex-row items-start space-x-4 w-full"
							      autoComplete="off">
								<div className="flex-grow">
									<FormField
										size="small"
										type={formField.ip_puerta.type}
										label={formField.ip_puerta.label}
										name={formField.ip_puerta.name}
										value={ip_puertaV}
										error={errors.ip_puerta && touched.ip_puerta}
									/>
								</div>
								<div className={'flex gap-2'}>
									<Button type="submit" variant="outlined" color="success"
									        size="small">
										{selectedIpId ? 'Editar' : `Asociar`}
									</Button>
									{selectedIpId && (
										<Button variant="outlined" color="error" onClick={handleCancelar}
										        size="small">
											Cancelar
										</Button>
									)}
								</div>
							</Form>
						</div>
					);
				}}
			</Formik>
			<Typography variant="body2" fontWeight="bold">Lista de IP</Typography>
			<SGTable data={datadef} setFilter={false}/>
		</div>
	);

}
