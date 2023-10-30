import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog.jsx";
import PropTypes from "prop-types";
import {
	useCreateConfiguracionCobroMutation
} from "@/components/Configuracion/Facturacion/ConfiguracionCobro/servive/configuracion.cobro.service.js";
import {Button} from "@/components/ui/button.jsx";
import {PlusCircle} from "lucide-react";
import Tooltip from "@mui/material/Tooltip";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";


export default function Modal({user}) {

	const [
		createConfiguracionCobro,
		{
			isError,
			isLoading,
			isSuccess,
			error,
		},
	] = useCreateConfiguracionCobroMutation()

	const getCurrentDate = () => {
		const date = new Date();
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	function handleDefault() {
		createConfiguracionCobro({
			'nombre_configuracion_cobro': 'Configuración por defecto',
			'descripcion': 'Proceso de configuración por defecto , añadir valores y activar para su uso',
			'activo': false,
			'fecha_registro': getCurrentDate(),
			'id_institucion': user.institucion.id,
		})
	}

	useRedirectForm(
		isLoading,
		isSuccess,
		isError,
		error,
		"Configuración por defecto añadida"
	);
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Tooltip title={'Agregar configuración por defecto'}>
					<Button variant={'ghost'}>
						<PlusCircle size={16}/>
					</Button>
				</Tooltip>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Añadir configuracion de cobro por defecto</AlertDialogTitle>
					<AlertDialogDescription>¿Está seguro q desea añadir una configuracion nueva por defecto , esta accion no
						se puede deshacer?</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction onClick={handleDefault}>Aceptar</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

Modal.propTypes = {
	user: PropTypes.object.isRequired,
};
