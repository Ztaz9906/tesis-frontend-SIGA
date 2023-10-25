import {useFormik} from "formik";
import {useLoginMutation} from "@/services/login.service.js";
import {
	Backdrop,
	Button,
	CircularProgress,
	Fade,
	FormControl,
	IconButton,
	Input,
	InputAdornment,
	InputLabel,
	Typography
} from "@mui/material";
import {MdVisibility, MdVisibilityOff} from "react-icons/md";

import React from "react";
import {BiSolidLock} from "react-icons/bi";
import {User2} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";

export default function Login() {
	const [login, {isError, isLoading, isSuccess, error}] = useLoginMutation();
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		onSubmit: async (values) => {
			login(values).then(() => {
				if (isSuccess) {
					navigate('/configuracion')
				}
			});
		},
	});
	useRedirectForm(
		isLoading,
		isSuccess,
		null,
		null,
		"Usuario logeado",
		'/configuracion'
	);
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	return (
		<div className="flex items-center justify-center h-screen bg-gray-200">
			<Backdrop
				sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
				open={isLoading}
			>
				<CircularProgress color="inherit"/>
			</Backdrop>
			<div className="bg-white rounded-lg shadow-lg container mx-auto p-8 max-w-md border-2 border-gray-300">
				<>
					<div className="flex items-center justify-center">
						<div className="flex items-center justify-center">
							<img
								src="/xabal_siga.png"
								alt="Logo"
								className="object-contain w-1/2"
							/>
							<h1 className="flex h-1/2 text-sm font-semibold justify-center items-center mt-6">
								Sistema de Gestión de Alimentación
							</h1>
						</div>
					</div>
					<form onSubmit={formik.handleSubmit} className={'flex flex-col gap-3'}>

						{error && Object.values(error.data).flat().map((errorMsg, index) => {
							return (
								<div key={index} className="w-full text-center mt-3 mb-3">
									<Fade in={true} timeout={1000}>
										<Typography
											variant="subtitle1"
											className="bg-red-400 p-3 rounded text-white"
										>
											{errorMsg}
										</Typography>
									</Fade>
								</div>
							)
						})}

						<Typography variant="h5" component={'h5'} className={'text-center'}>
							Autenticación
						</Typography>

						<FormControl variant="outlined">
							<InputLabel
								htmlFor="username"
								style={{fontSize: '1.2rem'}}
							>
								Usuario
							</InputLabel>
							<Input
								id="username"
								name="username"
								type="text"
								onChange={formik.handleChange}
								value={formik.values.username}
								startAdornment={
									<InputAdornment position="start">
										<User2 size={20} color={'black'}/>
									</InputAdornment>
								}
							/>
						</FormControl>


						<FormControl variant="outlined">
							<InputLabel
								htmlFor="password"
								style={{fontSize: '1.2rem'}}
							>
								Contraseña
							</InputLabel>
							<Input
								id="password"
								type={showPassword ? 'text' : 'password'}
								name="password"
								onChange={formik.handleChange}
								value={formik.values.password}
								startAdornment={
									<InputAdornment position="start">
										<BiSolidLock size={20} color={'black'}/>
									</InputAdornment>
								}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
										>
											{showPassword ? <MdVisibilityOff color={'black'}/> :
												<MdVisibility color={'black'}/>}
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
						<Button
							type="submit"
							variant="contained"
							color={'error'}>{"Entrar"}
						</Button>
					</form>
				</>
			</div>
		</div>
	);
}
