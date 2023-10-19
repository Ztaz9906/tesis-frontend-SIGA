import {useSnackbar} from "notistack";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {ErrorHandling, ErrorTrue} from "../lib/errorhandle";

/**
 * Hook para el manejo de errores dentro de la app, así como el manejo de redirecciones una vez realizada
 * la query designada.
 *
 * @param {boolean} isLoading Variable de control de eventos de RTK Query.
 * @param {boolean} isSuccess Variable de control de eventos de RTK Query.
 * @param {boolean} isError Variable de control de eventos de RTK Query.
 * @param {object} error Objeto de error en caso de existir (este se manda el de RTK Query).
 * @param {string} successMessage Dato tipo string el cual se va a mostrar en la notificación una vez resuelta la petición.
 * @param {string} [customUrl] Dato de tipo string al cual se va a redireccionar una vez cumplida la query o mutación. Opcional si `redirect` es false.
 * @param {Function} handleClose Función para controlar los modals. Es requerida si `redirect` es false.
 * @param {boolean} [redirect=true] Variable para controlar si se hace una redirección. Si no se pasa, es true por default. Si se pasa, es necesario incluir `handleClose` cuando sea false.
 */

export const useRedirectForm = (
	isLoading,
	isSuccess,
	isError = false, // Valor por defecto en caso de que no se pase isError
	error = null,    // Valor por defecto en caso de que no se pase error
	successMessage,
	customUrl
) => {
	const navigate = useNavigate();
	const {enqueueSnackbar} = useSnackbar();

	useEffect(() => {
		if (isSuccess) {
			if (customUrl) navigate(customUrl);

			successMessage &&
			enqueueSnackbar(successMessage, {
				variant: "success",
			});
		}

		if (isError) {
			if (Array.isArray(error.data)) {
				error.data.map((el) =>
					typeof el === "object"
						? Object.entries(el).map(([k, v]) =>
							enqueueSnackbar(
								`${k.charAt(0).toUpperCase() + k.slice(1)}: ${v[0]}`,
								{
									variant: "error",
									autoHideDuration: 1500,
								}
							)
						)
						: enqueueSnackbar(el, {variant: "error", autoHideDuration: 1500})
				);
			} else if (typeof error.data === "object") {
				Object.entries(error.data).map(([key, value]) =>
					enqueueSnackbar(
						`${key.charAt(0).toUpperCase() + key.slice(1)}: ${
							typeof value === "string"
								? value
								: value.map((el) =>
									typeof el === "string"
										? el
										: Object.values(el).map((v) => v)
								)
						}`,
						{
							variant: "error",
						}
					)
				);
			} else if (ErrorTrue(error.status)) {
				enqueueSnackbar(ErrorHandling(error.status), {variant: "error"});
			}
		}
	}, [isLoading]);
};
