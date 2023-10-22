import React from 'react';
import {Button, Typography} from '@mui/material';
import {Navigate, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export default function NotFound() {
	const navigate = useNavigate();
	const user = useSelector(state => state.user);
	if (!user) {
		return <Navigate to="/"/>;
	}
	const handleBack = () => {
		navigate(-1);
	};

	return (
		<div className="flex items-center justify-center h-screen bg-gray-200">
			<div className="flex flex-col items-center p-6 rounded shadow-md bg-white text-center gap-2">
				<Typography variant="h1" className="text-red-500">
					404
				</Typography>
				<Typography variant="h4" className="mb-4">
					Página no encontrada
				</Typography>
				<Typography variant="subtitle1" className="mb-4">
					Lo sentimos, la página que estás buscando no existe.
				</Typography>
				<div className="space-x-4">
					<Button variant="outlined" color="primary" onClick={handleBack}>
						Ir atrás
					</Button>
					<Button variant="outlined" color="primary" onClick={() => navigate('/')}>
						Login
					</Button>
				</div>
			</div>
		</div>
	);
}
