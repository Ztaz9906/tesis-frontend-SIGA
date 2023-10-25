import client from "./axios";


const customFetchBase = async ({url, method, body, params, responseType = 'json'}) => {
	try {
		const responseConfig = {url, method, data: body, params, responseType};

		const result = await client(responseConfig);

		// Si el responseType es 'blob', se devolverá directamente la data
		// Si no, se seguirá devolviendo result.data (que asumimos es un objeto JSON)
		return {data: responseType === 'blob' ? result : result.data};
	} catch (axiosError) {
		const err = axiosError.response || {data: axiosError.message};
		return {
			error: {
				status: err.status,
				data: err.data,
			},
		};
	}
};

export default customFetchBase;