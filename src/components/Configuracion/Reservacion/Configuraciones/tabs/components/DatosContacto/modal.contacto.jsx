import {useEffect} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Pen} from "lucide-react";
import {Form, Formik} from "formik";
import FormField from "@/components/auxiliar/FormField.jsx";
import form from "@/components/Configuracion/Reservacion/Configuraciones/tabs/components/DatosContacto/schemas/form.js";
import initialValues
	from "@/components/Configuracion/Reservacion/Configuraciones/tabs/components/DatosContacto/schemas/initialValues.js";
import validations
	from "@/components/Configuracion/Reservacion/Configuraciones/tabs/components/DatosContacto/schemas/validations.js";
import Tooltip from "@mui/material/Tooltip";
import {
	useLazyGetContactoByIdQuery,
} from "@/components/Configuracion/Reservacion/Configuraciones/service/contacto.service.js";

const getModifiedFields = (originalData, newData) => {
	return Object.fromEntries(
		Object.entries(newData).filter(([key, value]) => {
			return originalData[key] !== value;
		})
	);
};

const ModalContacto = ({id, title, edit}) => {
	const {formId, formField} = form;
	const currentValidation = validations[0];

	const [
		getContactoById,
		{data: acceso}
	] = useLazyGetContactoByIdQuery();

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
				<Tooltip title={'Editar datos de contacto'}>
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
					initialValues={
						initialValues
					}
					validationSchema={currentValidation}
					onSubmit={handleSubmit}
				>
					{({values, errors, touched, setFieldValue}) => {
						const {direccion: direccionV, correo: correoV, telefono: telefonoV} = values;
						// eslint-disable-next-line react-hooks/rules-of-hooks
						useEffect(() => {
							if (id) {
								getContactoById(id)
									.unwrap()
									.then((res) => {
										setFieldValue(formField.direccion.name, res.direccion, true)
										setFieldValue(formField.correo.name, res.correo, true)
										setFieldValue(formField.telefono.name, res.telefono, true)
									});
							}
						}, [id]);
						return (
							<Form id={formId} className="flex flex-row items-start w-full gap-2" autoComplete="off">
								<div className="flex-grow">
									<FormField
										size="small"
										type={formField.telefono.type}
										label={formField.telefono.label}
										name={formField.telefono.name}
										value={telefonoV}
										error={errors.telefono && touched.telefono}
										style={{width: '100%'}}  // Asegurarte que el FormField se expanda al 100% del contenedor.
									/>
									<FormField
										size="small"
										type={formField.correo.type}
										label={formField.correo.label}
										name={formField.correo.name}
										value={correoV}
										error={errors.correo && touched.correo}
										style={{width: '100%'}}  // Asegurarte que el FormField se expanda al 100% del contenedor.
									/>
									<FormField
										size="small"
										type={formField.direccion.type}
										label={formField.direccion.label}
										name={formField.direccion.name}
										value={direccionV}
										error={errors.direccion && touched.direccion}
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

export default ModalContacto;
