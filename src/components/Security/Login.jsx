import {useFormik} from "formik";
import {useLoginMutation} from "../../services/login.service";
import {useRedirectForm} from "../../hooks/useRedirectForm";

export default function Login() {
	const [login, {isError, isLoading, isSuccess, error}] = useLoginMutation();
	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		onSubmit: async (values) => {
			login(values);
		},
	});
	useRedirectForm(
		isLoading,
		isSuccess,
		isError,
		error,
		"Usuario autenticado",
		"/configuracion"
	);
	return (
		<div className="flex items-center justify-center h-screen bg-gray-200">
			<div className="bg-white rounded-lg shadow-lg container mx-auto p-8 max-w-md border-2 border-gray-300">
				<div className="py-8">
					<div className="flex justify-center mb-6">
						<img
							src={"/xabal_siga.png"}
							alt="Logo"
							className="object-contain"
						/>
					</div>
					<div className="text-center mb-6">
						<h1 className="text-xl font-semibold">Sistema de Gestión de Alimentación</h1>
						<p className="text-sm text-gray-600">Universidad de las Ciencias Informáticas</p>
					</div>
					<form onSubmit={formik.handleSubmit}>
						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="username"
							>
								Usuario
							</label>
							<input
								id="username"
								name="username"
								type="text"
								onChange={formik.handleChange}
								value={formik.values.username}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								placeholder="Usuario"
							/>
						</div>
						<div className="mb-6">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="password"
							>
								Contraseña
							</label>
							<input
								id="password"
								name="password"
								type="password"
								onChange={formik.handleChange}
								value={formik.values.password}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								placeholder="Contraseña"
							/>
						</div>
						<div className="flex justify-center mb-4">
							<button
								className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
								type="submit"
							>
								{isLoading ? "Cargando..." : "Entrar"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
