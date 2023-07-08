import { Link, useLocation } from "react-router-dom";

import { useState, useEffect, useRef } from "react";

export default function LinkBar() {
  const location = useLocation();
  const isActiveRoute = (route) => {
    return route === location.pathname;
  };
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);

    // Cleanup
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const links = (
    <>
      <li
        className={
          isOpen
            ? "transition-colors duration-200 block px-4 py-2 text-normal text-black rounded-lg hover:text-red-500"
            : "text-xs p-1"
        }
      >
        <Link
          to="/abastecimiento"
          className={`${
            isActiveRoute("/abastecimiento") ? "active-text" : ""
          } `}
        >
          Abastecimiento
        </Link>
      </li>
      <li
        className={
          isOpen
            ? "transition-colors duration-200 block px-4 py-2 text-normal text-black rounded-lg hover:text-red-500"
            : "text-xs p-1"
        }
      >
        <Link
          to="/reservacion"
          className={`${isActiveRoute("/reservacion") ? "active-text" : ""}`}
        >
          Reservación
        </Link>
      </li>
      <li
        className={
          isOpen
            ? "transition-colors duration-200 block px-4 py-2 text-normal text-black rounded-lg hover:text-red-500"
            : "text-xs p-1"
        }
      >
        <Link
          to="/distribucion"
          className={`${isActiveRoute("/distribucion") ? "active-text" : ""}`}
        >
          Distribución
        </Link>
      </li>
      <li
        className={
          isOpen
            ? "transition-colors duration-200 block px-4 py-2 text-normal text-black rounded-lg hover:text-red-500"
            : "text-xs p-1"
        }
      >
        <Link
          to="/cajero"
          className={`${isActiveRoute("/cajero") ? "active-text" : ""}`}
        >
          Cajero
        </Link>
      </li>
      <li
        className={
          isOpen
            ? "transition-colors duration-200 block px-4 py-2 text-normal text-black rounded-lg hover:text-red-500"
            : "text-xs p-1"
        }
      >
        <Link
          to="/faccturacion"
          className={`${isActiveRoute("/faccturacion") ? "active-text" : ""}`}
        >
          Faccturación
        </Link>
      </li>
      <li
        className={
          isOpen
            ? "transition-colors duration-200 block px-4 py-2 text-normal text-black rounded-lg hover:text-red-500"
            : "text-xs p-1"
        }
      >
        <Link
          to="/reportes"
          className={`${isActiveRoute("/reportes") ? "active-text" : ""}`}
        >
          Reportes
        </Link>
      </li>
    </>
  );

  return (
    <ul className="flex flex-row justify-between px-2">
      <div className="relative">
        <button className="sm:hidden block" onClick={handleClick}>
          {isOpen ? (
            <i className="fa-solid fa-ellipsis-vertical"></i>
          ) : (
            <i className="fa-solid fa-ellipsis"></i>
          )}
        </button>
        <div className={`hidden sm:flex sm:justify-between`}>{links}</div>
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute left-0 w-48 py-2 mt-2  bg-white text-xs border border-gray-300 shadow-xl md:hidden flex flex-col "
          >
            {links}
          </div>
        )}
      </div>

      <div className="flex flex-row">
        <li className="text-xs p-1">
          <Link
            to="/configuracion"
            className={`${isActiveRoute("/configuracion") ? "active" : ""}`}
          >
            Configuración
          </Link>
        </li>
        <li className="text-xs p-1">
          <Link
            to="/administracion"
            className={`${isActiveRoute("/administracion") ? "active" : ""}`}
          >
            Administración
          </Link>
        </li>
      </div>
    </ul>
  );
}
