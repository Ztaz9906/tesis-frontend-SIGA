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
} from "../ui/alert-dialog";
import PropTypes from "prop-types";
import {useCallback} from "react";

export default function Delete({title, message, action, children}) {
	const execute = useCallback(() => {
		if (action) action();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{message}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction onClick={execute}>Aceptar</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

Delete.propTypes = {
	title: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	action: PropTypes.func.isRequired,
};
