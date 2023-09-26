import { Avatar } from "@mui/material";
import DropDown from "./DropDown";
import LinkBar from "./LinkBar";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);
  const bg_navar = windowWidth > 785 ? "bg-navar" : "bg-navar_sm";

  return (
    <>
      <div className="flex flex-col">
        <div
          className={`flex flex-row ${bg_navar} text-white 
           justify-end items-center h-16 w-full`}
        >
          <div className="flex flex-row items-center">
            <DropDown />
            <Avatar />
          </div>
        </div>
        <div className=" bg-black text-white border-t-2 border-yellow-400 h-6">
          <LinkBar />
        </div>
      </div>
    </>
  );
};

export default NavBar;
