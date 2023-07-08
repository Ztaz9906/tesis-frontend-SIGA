import { useEffect, useState } from "react";
import NavBar from "./components/NavBar/Navbar";
import SideBar from "./components/SideBar/SideBar";
import RoutesComponent from "./routes/Routes";
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Router>
      <div className="app-container flex flex-col min-h-screen">
        <div className="sticky top-0 z-50">
          <NavBar />
        </div>

        <div className={`${windowWidth < 640 ? "flex-grow flex flex-col" : "flex-grow flex flex-row"}`}>
          <div className={`${windowWidth < 640 ? "w-full" : "w-96 bg-gray-300"} `}>
            <SideBar />
          </div>
          <div className="flex flex-col w-full p-3">
            <RoutesComponent />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
