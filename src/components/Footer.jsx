const Footer = () => {
  return (
    <footer className="flex items-center bg-footer text-black h-12">
      <p className=" text-center">
        Todos los derechos reservados. {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
