import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import UserAvatar from "./UserAvatar";
import {useLogoutMutation} from "@/services/login.service.js";
import {useRedirectForm} from "../../hooks/useRedirectForm";
import ModalInstitucionSelecion
	from "@/components/Configuracion/AdministracionInstitucionesStaff/AdminSelecionInstitucion.jsx";
import {useSelector} from "react-redux";

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
						name={user.is_staff ? "Admin" : user?.persona ? user?.persona.nombre_completo : user?.username}
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
				{settings.filter((item) => item).map((setting, index) => (
					<MenuItem key={index} onClick={handleCloseUserMenu}>
						{setting}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}
