import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import SideBar from "./SideBar";
import {ListEndIcon} from "lucide-react";
import {sectionsMap} from "./Setions";

export default function MovilSideBar() {
	const [isOpen, setIsOpen] = React.useState(false);

	const toggleDrawer = (open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setIsOpen(open);
	};

	return (
		<div>
			<Button variant={'ghost'} onClick={toggleDrawer(true)}>
				<ListEndIcon size={20}/>
			</Button>
			<Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
				<Box
					sx={{width: 250}} // Definimos un ancho estándar para móviles
					role="presentation"
					onKeyDown={toggleDrawer(false)}
				>
					<SideBar sectionsMap={sectionsMap}/>
				</Box>
			</Drawer>
		</div>
	);
}
