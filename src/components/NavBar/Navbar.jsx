import LinkBar from "./LinkBar";
import React, {useEffect, useState} from "react";
import UserSettings from "./UserSettings";

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

	return (
		<>
			<div className="flex flex-col">
				<div
					className={`flex flex-row bg-navar text-white 
      justify-between items-center h-16 w-full`}
				>
					<div className="flex w-1/4 items-center justify-start ml-[5%]">
						<img
							src="/xabal_siga-removebg-preview.png"
							alt="Logo"
							className="object-contain h-16"
						/>
						<h1 className="text-[0.7rem] text-black w-1/2 min-h-16 min-w-fit">
							Sistema de Gestión de Alimentación
						</h1>
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
