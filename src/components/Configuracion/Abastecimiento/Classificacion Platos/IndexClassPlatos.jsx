import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import Select from '../../../auxiliar/Select';
import SearchComponent from '../../../auxiliar/SearchComponent';
import { Link } from 'react-router-dom';

const datos = [
    {
        nombre: 'Nombre de prueba',
        descripcion: 'Descripción de prueba',
        hecho: 'Descripción de hecho',

        activo: true,
    },
    {
        nombre: 'Nombre de prueba',
        descripcion: 'Descripción de prueba',
        hecho: 'Descripción de hecho',
        activo: true,
    },
    {
        nombre: 'Nombre de prueba',
        descripcion: 'Descripción de prueba',
        hecho: 'Descripción de hecho',
        activo: true,
    },
    {
        nombre: 'Nombre de prueba',
        descripcion: 'Descripción de prueba',
        hecho: 'Descripción de hecho',
        activo: true,
    },
    {
        nombre: 'Nombre de prueba',
        descripcion: 'Descripción de prueba',
        hecho: 'Descripción de hecho',
        activo: true,
    },
    {
        nombre: 'Nombre de prueba',
        descripcion: 'Descripción de prueba',
        hecho: 'Descripción de hecho',
        activo: true,
    },
    {
        nombre: 'Nombre de prueba',
        descripcion: 'Descripción de prueba',
        hecho: 'Descripción de hecho',
        activo: true,
    },
    {
        nombre: 'Nombre de prueba',
        descripcion: 'Descripción de prueba',
        hecho: 'Descripción de hecho',
        activo: true,
    },
    {
        nombre: 'Nombre de prueba',
        descripcion: 'Descripción de prueba',
        hecho: 'Descripción de hecho',
        activo: true,
    },
    {
        nombre: 'Nombre de prueba',
        descripcion: 'Descripción de prueba',
        hecho: 'Descripción de hecho',
        activo: true,
    },
    {
        nombre: 'Nombre de prueba',
        descripcion: 'Descripción de prueba',
        hecho: 'Descripción de hecho',
        activo: true,
    },
    {
        nombre: 'Nombre de prueba',
        descripcion: 'Descripción de prueba',
        hecho: 'Descripción de hecho',
        activo: true,
    },
    {
        nombre: 'Nombre de prueba',
        descripcion: 'Descripción de prueba',
        hecho: 'Descripción de hecho',
        activo: true,
    },
    {
        nombre: 'Nombre de prueba',
        descripcion: 'Descripción de prueba',
        hecho: 'Descripción de hecho',
        activo: true,
    },
    {
        nombre: 'Nombre de prueba',
        descripcion: 'Descripción de prueba',
        hecho: 'Descripción de hecho',
        activo: true,
    },
    {
        nombre: 'Nombre de prueba',
        descripcion: 'Descripción de prueba',
        hecho: 'Descripción de hecho',
        activo: true,
    },
    {
        nombre: 'Nombre de prueba',
        descripcion: 'Descripción de prueba',
        hecho: 'Descripción de hecho',
        activo: true,
    },
];

export const IndexClassPlatos = () => {
    // Estado para la paginación
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [showOption, setshowOption] = useState(false)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };



    return (
        <>
            <SearchComponent title="Clasificacion de platos" path={'/Configuracio/clasificacion_platos/create'} />
            <form action="">
                <div className=' py-5 flex flex-row justify-start'>
                    <input className=' focus:outline-none focus:border-gray-400 border border-gray-300 placeholder-gray-700 mr-3 w-2/3' type="text" placeholder='nombre' />
                    <button className='bg-red-600 text-white text-xs w-24' type='submit'><i className="fa-solid fa-magnifying-glass "></i><span className='text-md ml-1'>Buscar</span></button>
                </div>
                <div className='flex flex-col bg-gray-200 border border-gray-300'>
                    <div>
                        <button className='px-2 text-start border-b-2 border-gray-300 w-full '
                            onClick={() => setshowOption(!showOption)}
                            type='button'>
                            <i className="fa-solid fa-caret-down mx-1 text-red-700"></i>
                            Opciones de busqueda
                        </button>
                    </div>
                    <div className={`${showOption ? 'hidden' : 'flex flex-wrap justify-between '} border-gray-300  px-6 py-3`}>
                        <Select label="Sexo" options={['Valor 1', 'Valor 2', 'Valor 3', 'Valor 4']} />
                        <Select label="Activo" options={['Valor 1', 'Valor 2', 'Valor 3', 'Valor 4']} />
                        <Select label="Dinero" options={['Valor 1', 'Valor 2', 'Valor 3', 'Valor 4']} />
                        <Select label="Dinero" options={['Valor 1', 'Valor 2', 'Valor 3', 'Valor 4']} />
                        <Select label="Dinero" options={['Valor 1', 'Valor 2', 'Valor 3', 'Valor 4']} />
                    </div>
                </div>
            </form>
            <div className='p-5'>
                <TableContainer component={Paper}>
                    <div className='flex flex-row justify-between px-3 items-center text-center'>
                        <h2 className='text-gray-700 font-semibold text-lg'>Lista de clasificaciones de platos </h2>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 30, 35, 40]}
                            component="div"
                            count={datos.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            labelRowsPerPage='Registros por pagina'
                        /></div>
                    <Table>
                        <TableHead>
                            <TableRow className='bg-gray-300'>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Activo</TableCell>
                                <TableCell>Hecho</TableCell>
                                <TableCell>Opciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {datos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
                                <TableRow key={rowIndex} className='hover:bg-gray-200'>
                                    <TableCell>{String(row.nombre)}</TableCell>
                                    <TableCell>{String(row.descripcion)}</TableCell>
                                    <TableCell>{row.activo ? "Sí" : "No"}</TableCell>
                                    <TableCell>{String(row.hecho)}</TableCell>
                                    <TableCell>
                                        <div className='flex flex-row text-center items-center'>
                                            <Link
                                                to={`/Configuracio/clasificacion_platos/update/${rowIndex}`}
                                                className={`mx-5 `}
                                            ><i className="fa-solid fa-pen"></i></Link>
                                            <button><i className="fa-solid fa-trash-can"></i></button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>


                </TableContainer>
            </div>
        </>
    )
}

