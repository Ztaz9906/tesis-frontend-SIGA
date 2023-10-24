import {useSelector} from "react-redux";

const Footer = () => {

	const user = useSelector((state) => state.user);

	return (
		<footer className="flex flex-col justify-center items-center text-black border-b-4 border-red-600 bg-gray-200">
			<p className=" text-center">
				© {user.institucion.name}
			</p>
			<p className=" text-center">
				{new Date().getFullYear()} Sistema de Gestión de Alimentación Version 2.0
			</p>
		</footer>
	);
};

export default Footer;
