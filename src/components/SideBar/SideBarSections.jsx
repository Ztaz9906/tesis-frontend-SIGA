import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SidebarSection({ isOpen, title, routes, computerViewHeight, movilViewHeight }) {
    const open = isOpen;
    const location = useLocation();
    const isActiveRoute = (route) => {
        return route === location.pathname;
    };
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const sidebarClass = open
        ? windowWidth > 640
            ? `border-b-2 border-gray-400 ${computerViewHeight}`
            : `absolute border-b-2 border-gray-400 ${movilViewHeight} text-sm`
        : windowWidth < 640 ? 'h-0 w-0' : 'h-0';

    return (
        <div
            className={`transition-all duration-1000 ease-in-out overflow-hidden bg-white ${sidebarClass}`}
        >
            {windowWidth < 640 ? <h2 className="bg-gray-300 w-full text-black font-bold border-b-2 border-gray-400 text-center">{title}</h2> : null}
            <div className="flex flex-col justify-between mx-12 py-1  text-gray-500">
                {routes.map((route, index) => (
                    <Link
                        key={index}
                        to={route.path}
                        className={`${isActiveRoute(route.path) ? "active-text" : ""
                            } p-1 transition-colors duration-200 hover:text-red-500`}
                    >
                        {route.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}
