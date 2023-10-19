import {useEffect, useRef, useState} from "react";

function useUser() {
	const [user, setUser] = useState(() => {
		const storageUser = sessionStorage.getItem("user");
		return JSON.parse(storageUser);
	});

	// Guarda el estado anterior de user
	const prevUserRef = useRef();
	useEffect(() => {
		prevUserRef.current = user;
	}, [user]);
	const prevUser = prevUserRef.current;

	useEffect(() => {
		// Observar cambios en el sessionStorage:
		const handleStorageChange = (e) => {
			if (e.key === "user") {
				const newUser = JSON.parse(e.newValue);

				// Aquí detectamos si hay un cambio en los módulos activos:
				if (prevUser && newUser && JSON.stringify(prevUser.institucion.active_modules) !== JSON.stringify(newUser.institucion.active_modules)) {
					// Aquí puedes ejecutar la lógica que desees cuando los módulos activos cambian
					// Por ejemplo, forzar una recarga de la página:
					window.location.reload();
				}

				setUser(newUser);
			}
		};

		// Agregamos el listener para el evento 'storage':
		window.addEventListener("storage", handleStorageChange);

		// Limpieza del efecto:
		return () => {
			window.removeEventListener("storage", handleStorageChange);
		};
	}, [prevUser]);

	const saveUser = (newUser) => {
		sessionStorage.setItem("user", JSON.stringify(newUser));
		setUser(newUser);
	};

	return [user, saveUser];
}

export default useUser;
