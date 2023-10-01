import { useState, useEffect } from 'react';

function useUser() {
    const [user, setUser] = useState(() => {
        const storageUser = sessionStorage.getItem("user");
        return JSON.parse(storageUser);
    });

    useEffect(() => {
        // Observar cambios en el sessionStorage:
        const handleStorageChange = (e) => {
            if (e.key === "user") {
                setUser(JSON.parse(e.newValue));
            }
        };

        // Agregamos el listener para el evento 'storage':
        window.addEventListener('storage', handleStorageChange);

        // Limpieza del efecto:
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const saveUser = (newUser) => {
        sessionStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
    };

    return [user, saveUser];
}

export default useUser;
