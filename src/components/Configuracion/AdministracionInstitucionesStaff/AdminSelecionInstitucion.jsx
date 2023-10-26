import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import SelectInstitucion from "@/components/Configuracion/AdministracionInstitucionesStaff/selectInstitucion.jsx";
import {Building2} from "lucide-react";

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
};

export default function ModalInstitucionSelecion() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			<span
				className=" flex justify-start items-center text-center text-sm gap-1"
				onClick={handleOpen}
			>
			<span><Building2 size={16}/></span>
      Selecionar institución
      </span>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				slots={{backdrop: Backdrop}}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={open}>
					<Box sx={style}>
						<Typography id="transition-modal-title" variant="h6" component="h2">
							Seleciona una institución para administrar
						</Typography>
						<SelectInstitucion setOpen={setOpen}/>
					</Box>
				</Fade>
			</Modal>
		</>
	);
}