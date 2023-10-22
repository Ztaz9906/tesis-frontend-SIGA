import {useEffect} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Pen} from "lucide-react";
import {Form, Formik} from "formik";
import FormField from "@/components/auxiliar/FormField.jsx";
import form
	from "@/components/Configuracion/Reservacion/Configuraciones/tabs/components/PeriodoReservacion/schemas/form.js";
import initialValues
	from "@/components/Configuracion/Reservacion/Configuraciones/tabs/components/PeriodoReservacion/schemas/initialValues.js";
import {useSelector} from "react-redux";
import validations
	from "@/components/Configuracion/Reservacion/Configuraciones/tabs/components/PeriodoReservacion/schemas/validations.js";
import Tooltip from "@mui/material/Tooltip";
import {
	useLazyGetPeriodoReservacionByIdQuery
} from "@/components/Configuracion/Reservacion/Configuraciones/service/periodo.reservacion.service.js";

const getModifiedFields = (originalData, newData) => {
	return Object.fromEntries(
		Object.entries(newData).filter(([key, value]) => {
			return originalData[key] !== value;
		})
	);
};

const ModalPreiodoReservacion = ({id, title, edit}) => {
	const {formId, formField} = form;
	const currentValidation = validations[0];

	const [
		getPeridoReservacionById,
		{data: acceso}
	] = useLazyGetPeriodoReservacionByIdQuery();

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
				<Tooltip title={'Editar Perído de Reservación'}>
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
						const {periodo_reservacion: periodo_reservacionV} = values;
						const {periodo_reservacion} = formField;
						useEffect(() => {
							if (id) {
								getPeridoReservacionById(id)
									.unwrap()
									.then((res) => {
										setFieldValue(formField.periodo_reservacion.name, res.periodo_reservacion, true)
									});
							}
						}, [id]);
						return (
							<Form id={formId} className="flex flex-row items-start w-full gap-2" autoComplete="off">
								<div className="flex-grow">
									<FormField
										size="small"
										type={formField.periodo_reservacion.type}
										label={formField.periodo_reservacion.label}
										name={formField.periodo_reservacion.name}
										value={periodo_reservacionV}
										error={errors.periodo_reservacion && touched.periodo_reservacion}
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

export default ModalPreiodoReservacion;
