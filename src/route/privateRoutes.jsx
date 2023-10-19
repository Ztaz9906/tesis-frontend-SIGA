import {Navigate, useLocation} from 'react-router-dom';
import useUser from "@/hooks/useUser.jsx";

export default function PrivateRoute({children}) {
	const [user] = useUser();
	const location = useLocation();
	if (!user) {
		return <Navigate to="/"/>;
	}
	if (user && !user.is_staff) {
		if (location.pathname === "/configuracion/seguridad/instituciones" || location.pathname === "/configuracion/seguridad/institucion/create" || location.pathname === "/configuracion/seguridad/institucion/update/:id") {
			return <Navigate to="sin-autorizacion"/>
		}
	}
	return (<div>
		RutaPrivatizada
		{children}
	</div>);
}
