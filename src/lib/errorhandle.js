export const ErrorTrue = (status) => {
  switch (status) {
    case 400:
      return true;

    case 401:
      return true;

    case 403:
      return true;

    case 404:
      return true;

    case 408:
      return true;

    case 500:
      return true;

    case 503:
      return true;

    default:
      return false;
  }
};

export const ErrorHandling = (status) => {
  switch (status) {
    case 400:
      return "El servidor no pudo interpretar la solicitud";

    case 401:
      return "Es necesario autenticarse";

    case 403:
      return "No tiene permiso";

    case 404:
      return "Información no encontrada";

    case 408:
      return "Tiempo de espera agotado";

    case 500:
      return "Error interno del servidor";

    case 503:
      return "El servidor está en mantenimiento o sobrecargado";

    default:
      break;
  }
};