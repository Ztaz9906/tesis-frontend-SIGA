import { useEffect, useState } from "react";
import NavBar from "./NavBar/Navbar";
import SideBar from "./SideBar/SideBar";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const location = useLocation();

  return (
    <div className="app-container flex flex-col min-h-screen">
      <div className="sticky top-0 z-50">
        <NavBar />
      </div>
      <div
        className={`${
          windowWidth < 640
            ? "flex-grow flex flex-col"
            : "flex-grow flex flex-row"
        }`}
      >
        <div
          className={`${windowWidth < 640 ? "w-full" : "w-96 bg-gray-300"} `}
        >
          {location.pathname.toLowerCase().includes("/configuracion") ? (
            <SideBar />
          ) : null}
        </div>
        <div className="flex flex-col w-full p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}