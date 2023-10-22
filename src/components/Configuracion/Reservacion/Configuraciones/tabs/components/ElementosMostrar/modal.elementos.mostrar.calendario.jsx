import {useEffect} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Pen} from "lucide-react";
import {Form, Formik} from "formik";
import FormField from "@/components/auxiliar/FormField.jsx";
import form
	from "@/components/Configuracion/Reservacion/Configuraciones/tabs/components/ElementosMostrar/schemas/calendario/form.js";
import initialValues
	from "@/components/Configuracion/Reservacion/Configuraciones/tabs/components/ElementosMostrar/schemas/calendario/initialValues.js";
import validations
	from "@/components/Configuracion/Reservacion/Configuraciones/tabs/components/ElementosMostrar/schemas/calendario/validations.js";
import Tooltip from "@mui/material/Tooltip";
import {
	useLazyGetElementoMostrarByIdQuery,
} from "@/components/Configuracion/Reservacion/Configuraciones/service/elementos.mostrar.js";

const getModifiedFields = (originalData, newData) => {
	return Object.fromEntries(
		Object.entries(newData).filter(([key, value]) => {
			return originalData[key] !== value;
		})
	);
};

const ModalCalendario = ({id, title, edit}) => {
	const {formId, formField} = form;
	const currentValidation = validations[0];

	const [
		getElementoMostrarById,
		{data: acceso}
	] = useLazyGetElementoMostrarByIdQuery();

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
				<Tooltip title={'Editar reservación por platos'}>
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
					}}
					validationSchema={currentValidation}
					onSubmit={handleSubmit}
				>
					{({values, errors, touched, setFieldValue}) => {
						const {elementos_mostrar_calendario: elementos_mostrar_calendarioV} = values;
						const {elementos_mostrar_calendario} = formField;
						useEffect(() => {
							if (id) {
								getElementoMostrarById(id)
									.unwrap()
									.then((res) => {
										setFieldValue(formField.elementos_mostrar_calendario.name, res.elementos_mostrar_calendario, true)
									});
							}
						}, [id]);
						return (
							<Form id={formId} className="flex flex-row items-start w-full gap-2" autoComplete="off">
								<div className="flex-grow">
									<FormField
										size="small"
										type={formField.elementos_mostrar_calendario.type}
										label={formField.elementos_mostrar_calendario.label}
										name={formField.elementos_mostrar_calendario.name}
										value={elementos_mostrar_calendarioV}
										error={errors.elementos_mostrar_calendario && touched.elementos_mostrar_calendario}
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

export default ModalCalendario;
