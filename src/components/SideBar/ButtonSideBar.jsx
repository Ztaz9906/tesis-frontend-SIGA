import { useEffect, useState } from "react";


export default function ButtonSideBar({
  isOpen,
  onClick,
  children,
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const Open = isOpen;
  return (
    <button
      className={`${windowWidth > 640 ? 'border-b-2 border-gray-400 w-full text-start' : 'w-auto'} text-start`}
      type="button"
      onClick={onClick}
    >
      <div className={`${windowWidth < 640 ? 'justify-start' : 'justify-between'} flex flex-row items-center p-1`}>
        <span className="font-bold text-gray-800">{children}</span>
        {!Open ? (
          <i className="fa-solid fa-plus"></i>
        ) : (
          <i className="fa-solid fa-minus"></i>
        )}
      </div>
    </button>
  );
}
