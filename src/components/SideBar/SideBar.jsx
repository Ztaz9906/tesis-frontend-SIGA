import React, {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import {ArrowDown} from "lucide-react";
import {useSelector} from "react-redux";

export default function SideBar({sectionsMap}) {
	const location = useLocation();
	const [expandedAccordion, setExpandedAccordion] = useState(null);
	const user = useSelector(state => state.user);
	const isActiveRoute = (route) => {
		return route === location.pathname;
	};

	const handleAccordionChange = (panel) => (event, isExpanded) => {
		setExpandedAccordion(isExpanded ? panel : false);
	};

	let filteredSections = [];
	if (user) {
		if (user.is_staff) {
			if (user.institucion) {
				const activeModules = user?.institucion.active_modules.map((module) =>
					module.toLowerCase()
				);
				filteredSections = Object.entries(sectionsMap).filter(
					([sectionTitle]) =>
						activeModules.includes(sectionTitle.toLowerCase()) ||
						sectionTitle.toLowerCase() === "seguridad"
				);
			} else {
				null;
			}
		} else {
			const activeModules = user?.institucion.active_modules.map((module) =>
				module.toLowerCase()
			);
			filteredSections = Object.entries(sectionsMap).filter(
				([sectionTitle]) =>
					activeModules.includes(sectionTitle.toLowerCase()) ||
					sectionTitle.toLowerCase() === "seguridad"
			);
		}
	}

	return (
		<div>
			{user && user.institucion && filteredSections ? (
				filteredSections.map(([title, config], index) => (
					<Accordion
						key={index}
						expanded={expandedAccordion === `panel${index}`}
						onChange={handleAccordionChange(`panel${index}`)}
						style={{
							boxShadow: "none",
							backgroundColor: "#f5f5f5",
							marginBottom: 0,
							marginTop: 0,
						}}
					>
						<AccordionSummary
							expandIcon={<ArrowDown size={16}/>}
							style={{minHeight: "45px"}}
						>
							<i className={`fa-solid ${config.icon} p-1`}></i>
							<Typography>{config.title}</Typography>
						</AccordionSummary>
						<AccordionDetails
							style={{backgroundColor: "#f5f5f5", padding: "8px 24px"}}
						>
							<div className="flex flex-col justify-between py-1 text-gray-500">
								{config.routes
									.filter(route => !route.staffOnly || (route.staffOnly && user.is_staff))
									.map((route, routeIndex) => (
										<Link
											key={routeIndex}
											to={route.path}
											className={`${isActiveRoute(route.path) ? "active-text" : ""} p-1 transition-colors duration-200 hover:text-red-500`}
										>
											{route.label}
										</Link>
									))}
							</div>
						</AccordionDetails>
					</Accordion>
				))
			) : (
				<h1>Debes seleccionar una institucion para administrar</h1>
			)}

		</div>
	);
}
