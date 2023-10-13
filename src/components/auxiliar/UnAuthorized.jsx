import React from 'react';
import {Button, Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";

export default function UnAuthorized() {
	const navigate = useNavigate();

	const handleBack = () => {
		navigate('/configuracion');
	};

	return (
		<div className="flex items-center justify-center h-screen bg-gray-200">
			<div className="flex flex-col items-center p-6 rounded shadow-md bg-white text-center gap-2">
				<Typography variant="h1" className="text-red-500">
					401
				</Typography>
				<Typography variant="h4" className="mb-4">
					Sin Autorizacion
				</Typography>
				<Typography variant="subtitle1" className="mb-4">
					Lo sentimos, no esta autorizado para acceder a esta página que estás buscando.
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
