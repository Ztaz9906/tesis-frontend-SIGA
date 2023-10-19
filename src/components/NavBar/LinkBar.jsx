import { Link, useLocation } from "react-router-dom";

export default function LinkBar() {
  const location = useLocation();
  const isActiveRoute = (route) => location.pathname.includes(route);

  return (
    <ul className="flex flex-row justify-end px-2">
      <div className="flex flex-row">
        <li className="text-xs p-1">
          <Link
            to="/configuracion"
            className={`${isActiveRoute("/configuracion") ? "active" : ""}`}
          >
            Configuración
          </Link>
        </li>
      </div>
    </ul>
  );
}
