import LinkBar from "./LinkBar";
import React, {useEffect, useState} from "react";
import UserSettings from "./UserSettings";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

const NavBar = () => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [windowWidth]);
	const user = useSelector(state => state.user);
	if (!user) {
		return <Navigate to="/"/>;
	}
	return (
		<>
			<div className="flex flex-col">
				<div
					className={`flex flex-row bg-navar text-white 
      justify-between items-center h-16 w-full`}
				>
					<div className="flex items-center justify-start ml-[5%]">
						<img
							src="/xabal_siga-removebg-preview.png"
							alt="Logo"
							className="object-contain h-16"
						/>
						<div
							className="flex flex-col justify-center font-semibold mt-4">
							<h1 className="text-[0.5rem] text-black">
								Sistema de Gestión
							</h1>
							<h1 className="text-[0.5rem] text-black">
								de Alimentación
							</h1>
						</div>
					</div>

					<div className="flex flex-row items-center">
						<UserSettings/>
					</div>
				</div>
				<div className="bg-black text-white border-t-2 border-yellow-400 h-6">
					<LinkBar/>
				</div>
			</div>
		</>
	);
};

export default NavBar;
