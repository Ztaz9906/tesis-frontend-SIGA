import {useEffect} from "react";
import {Button} from "@mui/material";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {Form, Formik} from "formik";
import form from "@/components/Configuracion/Seguridad/Usuarios/new-usuario/schemas/form.js";
import {
	useEditUsuarioMutation,
	useLazyGetUsuarioByIdQuery
} from "@/components/Configuracion/Seguridad/Usuarios/service/usuario.service.js";
import {
	useGetInstitucionesQuery
} from "@/components/Configuracion/Seguridad/Instituciones/service/institucion.service.js";
import FormFieldAutoComplete from "@/components/auxiliar/FormFieldAutoComplete.jsx";
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from "@/redux/userSlice.js";
import {useNavigate} from "react-router-dom";

const getModifiedFields = (originalData, newData) => {
	return Object.fromEntries(
		Object.entries(newData).filter(([key, value]) => {
			return originalData[key] !== value;
		})
	);
};

export default function SelectInstitucion({setOpen}) {
	const userRedux = useSelector(state => state.user);
	const {formId, formField} = form;
	const id = userRedux.id
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const {
		formField: {institucion},
	} = form;
	const [
		editUsuario,
		{
			isError: isErrorE,
			isLoading: isLoadingE,
			isSuccess: isSuccessE,
			error: errorE,
		},
	] = useEditUsuarioMutation();

	const [getUsuarioById, {data}] = useLazyGetUsuarioByIdQuery();

	useRedirectForm(
		isLoadingE,
		isSuccessE,
		isErrorE,
		errorE,
		"Institucion selecionada",
	);
	const submitForm = async (values, actions) => {
		try {
			const modifiedFields = getModifiedFields(data, values);
			if (Object.keys(modifiedFields).length !== 0) {
				editUsuario({id: id, ...modifiedFields}).then((res) => {
					if (res.data) {
						getUsuarioById(res.data.id + '?timestamp=' + new Date().getTime()).then((res) => {
							dispatch(setUser(res.data));
							navigate('/configuracion')
						})
					}
					setOpen(false)
				});
			}
		} catch (error) {
			console.error(error);
			actions.setSubmitting(true);
		}
	};

	const handleSubmit = (values, actions) => {
		submitForm(values, actions);
	};
	const {data: instituciones} = useGetInstitucionesQuery(undefined, {
		refetchOnReconnect: true,
	});

	return (
		<Formik
			initialValues={
				{[institucion.name]: "",}
			}
			onSubmit={handleSubmit}
		>
			{({setFieldValue}) => {
				useEffect(() => {
					if (id) {
						getUsuarioById(id)
							.unwrap()
							.then((res) => {
								setFieldValue(
									formField.institucion.name,
									res.institucion?.url,
									true
								);
							});
					}
				}, [id]);
				return (
					<Form id={formId} autoComplete="off">
						<FormFieldAutoComplete
							label={institucion.label}
							name={institucion.name}
							options={instituciones}
							valueKey="url"
							labelKey="name"
						/>
						<Button type="submit" variant="outlined" color="success">
							Seleccionar
						</Button>
					</Form>
				);
			}}
		</Formik>
	);
}
