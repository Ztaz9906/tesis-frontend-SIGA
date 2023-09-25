import { useEffect, useState } from "react";
import ButtonSideBar from "./ButtonSideBar";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../redux/GlobalSlice";
import SidebarSection from "./SideBarSections";
import { sectionsMap } from "./Setions";

export default function SideBar() {
  const dispatch = useDispatch();
  const handleButtonClick = (tabName) => {
    dispatch(setActiveTab(tabName));
  };

  const {
    showAbastecimiento,
    showCajero,
    showFacturacion,
    showDistribucion,
    showReservacion,
    showConfiguracion,
    showSeguridad,
  } = useSelector((state) => state.global);

  const showSections = {
    Abastecimiento: showAbastecimiento,
    Cajero: showCajero,
    Facturacion: showFacturacion,
    Distribucion: showDistribucion,
    Reservacion: showReservacion,
    Configuracion: showConfiguracion,
    Seguridad: showSeguridad,
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderSection = (
    title,
    { icon, routes, computerViewHeight, movilViewHeight },
    index
  ) => (
    <div key={index}>
      <ButtonSideBar
        isOpen={showSections[title]}
        onClick={() => handleButtonClick(title)}
      >
        <i className={`fa-solid ${icon} p-1`}></i>
        {windowWidth < 640 ? "" : title}
      </ButtonSideBar>
      {windowWidth > 640 && (
        <SidebarSection
          isOpen={showSections[title]}
          title={title}
          routes={routes}
          computerViewHeight={computerViewHeight}
          movilViewHeight={movilViewHeight}
        />
      )}
    </div>
  );

  return (
    <>
      <div
        className={`flex ${
          windowWidth < 640 ? "flex-row" : "flex-col"
        } items-start border-t-2 border-red-600`}
      >
        <div
          className={`flex ${
            windowWidth < 640
              ? "flex-row border-b-2 border-gray-400"
              : "flex-col"
          } w-full text-sm`}
        >
          {Object.entries(sectionsMap).map(([title, config], index) =>
            renderSection(title, config, index)
          )}
        </div>
      </div>
      {windowWidth < 640 &&
        Object.entries(sectionsMap).map(([title, config], index) => (
          <SidebarSection
            key={index}
            isOpen={showSections[title]}
            title={title}
            routes={config.routes}
            computerViewHeight={config.computerViewHeight}
            movilViewHeight={config.movilViewHeight}
          />
        ))}
    </>
  );
}

// import * as React from "react";
// import { TreeView } from "@mui/x-tree-view/TreeView";
// import { TreeItem } from "@mui/x-tree-view/TreeItem";

// import { Link } from "react-router-dom";
// import { sectionsMap } from "./Setions";
// import { ShoppingCart, Settings, Shield } from "lucide-react";
// import { DotIcon } from "lucide-react";
// const sectionIcons = {
//   Abastecimiento: <ShoppingCart />,
//   Cajero: <ShoppingCart />,
//   Facturacion: <ShoppingCart />,
//   Distribucion: <ShoppingCart />,
//   Reservacion: <ShoppingCart />,
//   Configuracion: <Settings />,
//   Seguridad: <Shield />,
//   Test: <Shield />,
// };

// export default function SideBar() {
//   return (
//     <TreeView aria-label="sidebar" defaultExpanded={["1"]}>
//       {Object.entries(sectionsMap).map(([title, config], index) => (
//         <TreeItem
//           key={index}
//           nodeId={title}
//           label={title}
//           icon={sectionIcons[title]}
//         >
//           {config.routes.map((route, routeIndex) => (
//             <TreeItem
//               key={routeIndex}
//               nodeId={`${title}-${routeIndex}`}
//               label={
//                 <span className="flex">
//                   <DotIcon />
//                   <Link to={route.path}>{route.label}</Link>
//                 </span>
//               }
//             />
//           ))}
//         </TreeItem>
//       ))}
//     </TreeView>
//   );
// }
