import axios from "axios";
import jwt_decode from "jwt-decode";

//const baseUrl = process.env.REACT_APP_BACKEND_URL;
export const baseUrl = "http://localhost:8000/v1";

const client = axios.create({
	baseURL: baseUrl,
	headers: {
		"Content-Type": "application/json",
	},
});

client.interceptors.request.use(
	async (config) => {
		const re_login = "/login/";
		const re_refresh = "/refresh/";

		if (
			config?.url.search(re_login) === -1 &&
			config?.url.search(re_refresh) === -1
		) {
			let token = sessionStorage.getItem("token");

			const shouldRefresh = isRefreshNeeded(token);

			try {
				if (token && shouldRefresh.needRefresh) {
					if (shouldRefresh.valid === false) {
						token = await client.post("/api/token/refresh/", {
							refresh: sessionStorage.getItem("refresh"),
						});
					}
				}
			} catch (e) {
				sessionStorage.removeItem("token");
				sessionStorage.removeItem("refresh");
				sessionStorage.removeItem("user");
				sessionStorage.removeItem("institucion");

				window.location
					.replace(window.location.origin)
					.then(() => window.location.reload());
			}
			if (config.data instanceof FormData) {
				delete config.headers["Content-Type"];
			} else {
				config.headers["Content-Type"] = "application/json";
			}
			if (token) {
				if (typeof token === "object") {
					sessionStorage.setItem("token", token.data.access);
					sessionStorage.setItem("refresh", token.data.refresh);
					config.headers["Authorization"] = `Bearer ${token.data.access}`;
				} else {
					config.headers["Authorization"] = `Bearer ${token}`;
				}
			}
		}
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);

export function isRefreshNeeded(token) {
	if (!token) {
		return {valid: false, needRefresh: true};
	}

	const decoded = jwt_decode(token);

	if (!decoded) {
		return {valid: false, needRefresh: true};
	}
	if (decoded.exp && Date.now() >= decoded.exp * 1000) {
		return {valid: false, needRefresh: true};
	}
	return {valid: true, needRefresh: false};
}

/* export async function viewFile(url) {
  await client
    .get(url, { responseType: "blob" })
    .then((res) => {
      let _url = window.URL.createObjectURL(res.data);
      window.open(_url, "_blank").focus();
    })
    .catch((err) => {
      (err);
    });
} */

//export const omit = (prop, { [prop]: _, ...rest }) => rest;

export default client;
