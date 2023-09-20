import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Torpedo() {
  const [formValues, setFormValues] = useState({});
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: formValues,
    enableReinitialize: true,
    onSubmit: async (values) => {},
  });
  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
      <div className="py-8">
        <div className="flex flex-row justify-between mb-8">
          <div className="text-2xl font-semibold">Registrar Pesona Torpedo</div>
          <button className="font-bold py-2 px-4 rounded">
            <i className="fa-solid fa-list-ul"></i>
          </button>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4 flex flex-wrap">
            <div className="flex flex-wrap mr-6 w-1/2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                Nombre<span className="text-red-600">*</span>
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.nombre}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Nombre"
              />
            </div>
            <div className="flex flex-wrap w-1/2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="ci"
              >
                C.I.<span className="text-red-600">*</span>
              </label>
              <input
                id="ci"
                name="ci"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.ci}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="C.I."
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap">
            <div className="w-1/4 mr-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="sexo"
              >
                Sexo
              </label>
              <select
                id="sexo"
                name="sexo"
                onChange={formik.handleChange}
                value={formik.values.sexo}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
              </select>
            </div>
            <div className="w-1/4 mr-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="pais"
              >
                País
              </label>
              <select
                id="pais"
                name="pais"
                onChange={formik.handleChange}
                value={formik.values.pais}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {/* Asegúrate de añadir las opciones adecuadas */}
                <option value="opcion1">Opción 1</option>
                <option value="opcion2">Opción 2</option>
              </select>
            </div>
            <div className="w-1/4 mr-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="provincia"
              >
                Provincia
              </label>
              <select
                id="provincia"
                name="provincia"
                onChange={formik.handleChange}
                value={formik.values.provincia}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {/* Asegúrate de añadir las opciones adecuadas */}
                <option value="opcion1">Opción 1</option>
                <option value="opcion2">Opción 2</option>
              </select>
            </div>
            <div className="w-1/4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="municipio"
              >
                Municipio
              </label>
              <select
                id="municipio"
                name="municipio"
                onChange={formik.handleChange}
                value={formik.values.municipio}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {/* Asegúrate de añadir las opciones adecuadas */}
                <option value="opcion1">Opción 1</option>
                <option value="opcion2">Opción 2</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="descripcion"
            >
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              onChange={formik.handleChange}
              value={formik.values.descripcion}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Descripción"
            />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
              type="submit"
            >
              Aceptar
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => navigate("/configuracion/cajero/5")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
