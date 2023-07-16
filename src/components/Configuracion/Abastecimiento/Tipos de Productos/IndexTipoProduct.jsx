import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import Select from '../../../auxiliar/Select';
import Title from '../../../auxiliar/SearchComponent';
import { Link } from 'react-router-dom';
import { getList, getListWithSearch, remove } from '../../../../services/services';
import { Field, Form, Formik, useFormik } from 'formik';

export const IndexTipoProducto = () => {
    // Estado para la paginación
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [showOption, setshowOption] = useState(true)
    const [data, setData] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const fetchData = async () => {
        try {
            const response = await getList('Abastecimiento_TbNtipoProducto')
            setData(response.data);
        } catch (err) {
            console.error('Failed to fetch data', err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Estás seguro de que quieres borrar esto?')) {
            await remove(id, 'Abastecimiento_TbNtipoProducto')
            // podrías querer refrescar los datos después de eliminar un elemento
            fetchData();
        }
    }
    const formik = useFormik({
        initialValues: {
            active: '',
        },
        onSubmit: values => {
            handleSearch(values.active);
        },
    });

    const handleSearch = async () => {
        // const searchTerm = formik.values.active; // Obtener el valor del campo de búsqueda
        const response = await getListWithSearch('false');
        setData(response.data);
        // console.log(searchTerm)
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Title title="Tipo de Productos" path={'/configuracion/tipo_productos/create'} />
            <Formik
                initialValues={{
                    active: '',
                }}
                onSubmit={(values) => handleSearch(values.active)}
            >
                <Form>
                    <div className='py-5 flex flex-row justify-start'>
                        <Field
                            className='focus:outline-none focus:border-gray-400 border border-gray-300 placeholder-gray-700 mr-3 w-2/3'
                            type="text"
                            name="active"
                            placeholder='buscar'
                        />
                        <button className='bg-red-600 text-white text-xs w-24' type='submit'>
                            <i className="fa-solid fa-magnifying-glass "></i>
                            <span className='text-md ml-1'>Buscar</span>
                        </button>
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
                            <Select label="Activo" options={['true', 'false']} onChange={formik.handleChange} name="active" value={formik.values.active} />
                        </div>
                    </div>
                </Form>
            </Formik>
            <div className='p-5'>
                <TableContainer component={Paper}>
                    <div className='flex flex-row justify-between px-3 items-center text-center'>
                        <h2 className='text-gray-700 font-semibold text-lg'>Lista tipos de productos </h2>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 30, 35, 40]}
                            component="div"
                            count={data.length}
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
                                <TableCell>Opciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <TableRow key={row.id_tipo_producto} className='hover:bg-gray-200'>
                                    <TableCell>{String(row.nombre_tipo_producto)}</TableCell>
                                    <TableCell>{String(row.descripcion_tipo_producto)}</TableCell>
                                    <TableCell>{row.activo ? "Sí" : "No"}</TableCell>
                                    <TableCell>
                                        <div className='flex flex-row text-center items-center'>
                                            <Link
                                                to={`/configuracion/tipo_productos/update/${row.id_tipo_producto}`}
                                                className={`mx-5 `}
                                            ><i className="fa-solid fa-pen"></i></Link>
                                            <button
                                                onClick={() => handleDelete(row.id_tipo_producto)}><i className="fa-solid fa-trash-can"></i></button>
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

