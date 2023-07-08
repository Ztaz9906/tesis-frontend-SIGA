import React from 'react'
import Table from '../../../Utils/Table';
const datos = [
    {
        nombre: 'Nombre de prueba',
        descripcion: 'Descripción de prueba',
        activo: true,
        nuevo: 'aki'
    },

];

export const IndexClassPlatos = () => {
    return (
        <>
            <div className='border-b-2 border-gray-300 p-1 flex flex-row justify-between'>
                <div>
                    <h2 className='text-gray-700 font-semibold text-lg'>Clasificacion de platos </h2>
                </div>
                <div className='flex flex-row justify-between'>
                    <button className='mx-5'><i className="fa-solid fa-circle-plus"></i></button>
                    <button className='mx-5'><i className="fa-solid fa-file-csv"></i></button>
                    <button className='mx-5'><i className="fa-regular fa-file-pdf"></i></button>
                </div>
            </div>
            <div className=' py-5 flex flex-row justify-start'>
                <input className=' focus:outline-none focus:border-gray-400 border border-gray-300 placeholder-gray-700 mr-3 w-2/3' type="text" placeholder='nombre' />
                <button className='bg-red-600 text-white text-xs w-24' type='submit'><i className="fa-solid fa-magnifying-glass "></i><span className='text-md ml-1'>Buscar</span></button>
            </div>

            <div className='flex flex-col bg-gray-200 border border-gray-300'>
                <div>
                    <button className='px-2 text-start border-b-2 border-gray-300 w-full '>
                        <i className="fa-solid fa-caret-down mx-1"></i>
                        Opciones de busqueda
                    </button>
                </div>
                <div className='flex flex-col border-gray-300 w-1/3 px-6 py-3'>
                    <label className=''>Activo</label>
                    <select className='bg-white text-gray-600 focus:outline-none focus:border-gray-400 border border-gray-300'>
                        <option className='text-black' value="1">--Seleccione--</option>
                        <option className='text-black' value="1">Valor 1</option>
                        <option className='text-black' value="1">Valor 2</option>
                        <option className='text-black' value="1">Valor 3</option>
                        <option className='text-black' value="1">Valor 4</option>
                    </select>

                </div>
            </div>

            <Table datos={datos}>
                <th>nombre</th>
                <th>nombre</th>
                <th>nombre</th>
                <th>opciones</th>
            </Table>

        </>
    )
}
