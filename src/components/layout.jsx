import {useEffect, useState} from "react";
import NavBar from "./NavBar/Navbar";
import SideBar from "./SideBar/SideBar";
import {Outlet, useLocation} from "react-router-dom";
import {sectionsMap} from "./SideBar/Setions";
import MovilSideBar from "./SideBar/Drawer";
import PrivateRoute from "@/route/privateRoutes.jsx";
import Footer from "@/components/Footer.jsx";
import {useSelector} from "react-redux";

export default function Layout() {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	const user = useSelector((state) => state.user)

	const location = useLocation();
	return (
		<div className="app-container flex flex-col min-h-screen">
			<div className="sticky top-0 z-50">
				<NavBar/>
			</div>
			<div
				className={`${
					windowWidth < 640
						? "flex-grow flex flex-col"
						: "flex-grow flex flex-row"
				}`}
			>
				<div
					className={`${windowWidth < 640 ? "w-full" : "w-96 bg-gray-50"} `}
				>
					{location.pathname.toLowerCase().includes("/configuracion") ? (
						<>
							{windowWidth < 640 ? (
								<MovilSideBar/>
							) : (
								<SideBar sectionsMap={sectionsMap}/>
							)}
						</>
					) : null}
				</div>
				<div className="flex flex-col w-full p-3">
					<PrivateRoute>
						<Outlet/>
					</PrivateRoute>
				</div>
			</div>
			{user && (<div className="sticky bottom-0 z-50"><Footer/></div>)}

		</div>
	);
}
