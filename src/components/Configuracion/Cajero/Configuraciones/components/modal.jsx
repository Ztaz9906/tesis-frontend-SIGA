import React, {useEffect} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "../../../../ui/dialog.jsx";
import {Button} from "../../../../ui/button.jsx";
import {Pen} from "lucide-react";
import {useLazyGetAccesoByIdQuery} from "@/components/Configuracion/Cajero/Configuraciones/service/accesos.service.js";
import {Form, Formik} from "formik";
import FormField from "@/components/auxiliar/FormField.jsx";
import form from "@/components/Configuracion/Cajero/Configuraciones/components/schemas/form.js";
import initialValues from "@/components/Configuracion/Cajero/Configuraciones/components/schemas/initialValues.js";
import {useSelector} from "react-redux";
import validations from "@/components/Configuracion/Cajero/Configuraciones/components/schemas/validations.js";
import Tooltip from "@mui/material/Tooltip";

const getModifiedFields = (originalData, newData) => {
	return Object.fromEntries(
		Object.entries(newData).filter(([key, value]) => {
			return originalData[key] !== value;
		})
	);
};

const Modal = ({id, title, edit}) => {
	const {formId, formField} = form;
	const currentValidation = validations[0];

	const [
		getAccesoById,
		{data: acceso}
	] = useLazyGetAccesoByIdQuery();

	const user = useSelector(state => state.user);
	const submitForm = async (values, actions) => {
		try {
			const modifiedFields = getModifiedFields(acceso, values);
			if (Object.keys(modifiedFields).length !== 0) {
				edit({id: id, ...modifiedFields});
			}
		} catch (error) {
			console.error(error);
			actions.setSubmitting(true);
		}
	};
	const handleSubmit = (values, actions) => {
		submitForm(values, actions);
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Tooltip title={'Editar Accesos'}>
					<Button variant="ghost" size="icon">
						<Pen size={15}/>
					</Button>
				</Tooltip>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<Formik
					initialValues={{
						...initialValues,
						id_institucion: user.institucion.id,
						id_puerta: id,
					}}
					validationSchema={currentValidation}
					onSubmit={handleSubmit}
				>
					{({values, errors, touched, setFieldValue}) => {
						const {cantidad_acceso: cantidad_accesoV} = values;
						const {cantidad_acceso} = formField;
						useEffect(() => {
							if (id) {
								getAccesoById(id)
									.unwrap()
									.then((res) => {
										setFieldValue(formField.cantidad_acceso.name, res.cantidad_acceso, true)
									});
							}
						}, [id]);
						return (
							<Form id={formId} className="flex flex-row items-start w-full gap-2" autoComplete="off">
								<div className="flex-grow">
									<FormField
										size="small"
										type={formField.cantidad_acceso.type}
										label={formField.cantidad_acceso.label}
										name={formField.cantidad_acceso.name}
										value={cantidad_accesoV}
										error={errors.cantidad_acceso && touched.cantidad_acceso}
										onKeyPress={e => {
											if (!/[0-9]/.test(e.key)) {
												e.preventDefault();
											}
										}}
										style={{width: '100%'}}  // Asegurarte que el FormField se expanda al 100% del contenedor.
									/>
								</div>
								{/* El botón no tiene flex-grow, por lo que no crecerá y se quedará a la derecha */}
								<Button type="submit" variant={'aceptar'}>Editar</Button>
							</Form>
						)
					}}
				</Formik>
			</DialogContent>
		</Dialog>
	);
};

export default Modal;
