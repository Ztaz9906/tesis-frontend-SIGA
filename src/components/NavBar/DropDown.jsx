import { useEffect, useRef, useState } from "react";

export default function DropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="mr-4 text-black">
        Usuario <i className="fa-solid fa-caret-down"></i>
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 w-40 mt-2 py-2 bg-white shadow-xl text-xs border border-gray-300"
        >
          <a
            href="#"
            className="transition-colors duration-200 hover:text-red-500 block px-4 py-2 text-normal text-black rounded-lg "
          >
            Cerrar Sesion
          </a>
        </div>
      )}
    </div>
  );
}
