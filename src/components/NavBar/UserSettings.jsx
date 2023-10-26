import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import UserAvatar from "./UserAvatar";
import {useLogoutMutation} from "@/services/login.service.js";
import {useRedirectForm} from "../../hooks/useRedirectForm";
import ModalInstitucionSelecion
	from "@/components/Configuracion/AdministracionInstitucionesStaff/AdminSelecionInstitucion.jsx";
import {useSelector} from "react-redux";
import {LogOut} from "lucide-react";

export default function UserSettings() {
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const user = useSelector(state => state.user);

	const [logout, {isError, isLoading, isSuccess, error}] =
		useLogoutMutation();
	const settings = [
		(user && user.is_staff) ? <ModalInstitucionSelecion/> : null,
		<span key={'logout'} className="text-sm" onClick={() => logout()}>
      Desconectarse
      </span>

	];
	useRedirectForm(
		isLoading,
		isSuccess,
		isError,
		error,
		"Usuario desconectado",
		"/"
	);
	return (
		<div
			className="flex flex-row items-center gap-1 p-1
    "
		>
			<Typography className="text-black text-sm">

				{user.is_staff ? 'Admin' : user?.persona ? user?.persona.nombre_completo : user?.username}
			</Typography>
			<Tooltip title="Abrir opciones de usuario">
				<IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
					<UserAvatar
						name={user?.persona ? user?.persona.nombre_completo : user?.username}
					/>
				</IconButton>
			</Tooltip>
			<Menu
				sx={{mt: "45px"}}
				id="menu-appbar"
				anchorEl={anchorElUser}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={Boolean(anchorElUser)}
				onClose={handleCloseUserMenu}
			>
				<div className="w-full p-1">
					{user && user.is_staff && (
						<div className="w-full hover:bg-gray-200 cursor-pointer" onClick={handleCloseUserMenu}>
							<ModalInstitucionSelecion/>
						</div>
					)}
					<div
						className="flex justify-start items-center text-center w-full text-sm hover:bg-gray-200 cursor-pointer gap-1"
						onClick={() => {
							logout();
							handleCloseUserMenu();
						}}
					>
						<span><LogOut size={16}/></span>
						Desconectarse
					</div>
				</div>
			</Menu>
		</div>
	);
}
