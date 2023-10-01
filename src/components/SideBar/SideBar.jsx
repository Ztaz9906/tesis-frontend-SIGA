import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { ArrowDown } from "lucide-react";
import useUser from "../../services/config/user";

export default function SideBar({ sectionsMap }) {
  const location = useLocation();
  const [expandedAccordion, setExpandedAccordion] = useState(null);
  const [user] = useUser();
  const isActiveRoute = (route) => {
    return route === location.pathname;
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

  const activeModules = user?.institucion.active_modules.map((module) =>
    module.toLowerCase()
  ); // Convertimos todo a minúsculas

  const filteredSections = Object.entries(sectionsMap).filter(
    ([sectionTitle]) =>
      activeModules.includes(sectionTitle.toLowerCase()) ||
      sectionTitle.toLowerCase() === "seguridad"
  );

  return (
    <div>
      {filteredSections.map(([title, config], index) => (
        <Accordion
          key={index}
          expanded={expandedAccordion === `panel${index}`}
          onChange={handleAccordionChange(`panel${index}`)}
          style={{
            boxShadow: "none",
            backgroundColor: "#f5f5f5",
            marginBottom: 0,
            marginTop: 0,
          }} // Estilo para quitar separación entre acordeones
        >
          <AccordionSummary
            expandIcon={<ArrowDown size={16} />}
            style={{ minHeight: "45px" }}
          >
            <i className={`fa-solid ${config.icon} p-1`}></i>
            <Typography>{title}</Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{ backgroundColor: "#f5f5f5", padding: "8px 24px" }}
          >
            <div className="flex flex-col justify-between py-1 text-gray-500">
              {config.routes.map((route, routeIndex) => (
                <Link
                  key={routeIndex}
                  to={route.path}
                  className={`${
                    isActiveRoute(route.path) ? "active-text" : ""
                  } p-1 transition-colors duration-200 hover:text-red-500`}
                >
                  {route.label}
                </Link>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
