import { useFormik } from "formik";
import { useLoginMutation } from "../../services/login.service";
import { useRedirectForm } from "../../hooks/useRedirectForm";

export default function Login() {
  const [login, { isError, isLoading, isSuccess, error }] = useLoginMutation();
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
      <div className="bg-white rounded-lg shadow-lg container mx-auto px-4 sm:px-8 max-w-md">
        <div className="py-8">
          <div className="flex justify-center">
            <img
              src={"/logo_login.png"}
              alt="Logo"
              className="mb-8 w-32 h-32 object-contain"
            />
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.username}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Username"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Password"
              />
            </div>
            <div className="flex justify-center mb-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                {isLoading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
