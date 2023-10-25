import {useState} from "react";

function useUser() {
	const [user, setUser] = useState(() => {
		const storageUser = sessionStorage.getItem("user");
		return JSON.parse(storageUser) || null;
	});

	const saveUser = (newUser) => {
		sessionStorage.setItem("user", JSON.stringify(newUser));
		setUser(newUser);
	};

	return [user, saveUser];
}

export default useUser;
