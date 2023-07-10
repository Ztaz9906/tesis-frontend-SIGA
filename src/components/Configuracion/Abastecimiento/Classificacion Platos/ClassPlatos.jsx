import React from 'react'

export const ClassPlatos = ({ title }) => {
    return (
        <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
            <div className="py-8">
                <div className="flex flex-row justify-between mb-8">
                    <div className="text-2xl font-semibold">{title}</div>
                    <button className="font-bold py-2 px-4 rounded">
                        <i className="fa-solid fa-list-ul"></i>
                    </button>
                </div>
                <form>
                    <div className="mb-4 flex justify-start items-center">
                        <div className="flex flex-wrap mr-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                Nombre<span className='text-red-600'>*</span>
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="nombre"
                                type="text"
                                placeholder="Nombre"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <input className="mr-2" id="activo" type="checkbox" />
                            <label className="block text-gray-700 text-sm font-bold" htmlFor="activo">
                                Activo
                            </label>

                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
                            Descripción
                        </label>
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="descripcion"
                            placeholder="Descripción"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" type="submit">
                            Aceptar
                        </button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" type="button">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

