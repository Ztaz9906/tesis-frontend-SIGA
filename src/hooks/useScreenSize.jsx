// hooks/useScreenSize.js

import { useState, useEffect } from "react";

function useScreenSize() {
  const [screenSize, setScreenSize] = useState("lg");

  useEffect(() => {
    const handleResize = () => {
      const mediaQueryMd = window.matchMedia("(min-width: 768px)");
      const mediaQueryLg = window.matchMedia("(min-width: 1024px)");

      if (mediaQueryLg.matches) {
        setScreenSize("lg");
      } else if (mediaQueryMd.matches) {
        setScreenSize("md");
      } else {
        setScreenSize("sm");
      }
    };

    // Ejecutar inmediatamente para definir el tamaño inicial
    handleResize();

    // Asociar handleResize al evento resize del objeto window
    window.addEventListener("resize", handleResize);

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
}

export default useScreenSize;
