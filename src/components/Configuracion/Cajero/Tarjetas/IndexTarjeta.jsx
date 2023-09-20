import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import Select from '../../../auxiliar/Select';
import Title from '../../../auxiliar/SearchComponent';
import { Link } from 'react-router-dom';
import { getList, getListWithSearch, remove } from '../../../../services/services';
import { Field, Form, Formik, useFormik } from 'formik';
import { useDeleteTarjetaMutation, useGetTarjetasQuery } from '../../../../services/tarjetas.service';
import Swal from 'sweetalert2';

export const IndexTarjeta = () => {
    // Estado para la paginación
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [showOption, setshowOption] = useState(true)
    const { data, isError, isLoading, isSuccess } = useGetTarjetasQuery(undefined, {
        refetchOnReconnect: true
    })
    const [deleteTarjetas, { isError: isErrorD, isLoading: isLoadingD, isSuccess: isSuccessD }] = useDeleteTarjetaMutation()
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleDelete = async (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: `¡Si eliminas esta acción no se podrá revertir!`,
            icon: "warning",
            reverseButtons: true,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Eliminar",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTarjetas(id);
            }
        });
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

    }
    console.log(data)
    return (
        <>
            <Title title="Tarjetas" path={'/configuracion/cajero/tarjetas/create'} />
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
                        <h2 className='text-gray-700 font-semibold text-lg'>Lista de Tarjetas </h2>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 30, 35, 40]}
                            component="div"
                            count={data?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            labelRowsPerPage='Registros por pagina'
                        /></div>
                    <Table>
                        <TableHead>
                            <TableRow className='bg-gray-300'>
                                <TableCell>Numero de serie</TableCell>
                                <TableCell>Código</TableCell>
                                <TableCell>Tipo de Tarjeta</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Opciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <TableRow key={row.id_tarjeta_alimentacion} className='hover:bg-gray-200'>
                                    <TableCell>{row.numero_serie}</TableCell>
                                    <TableCell>{row.codigo}</TableCell>
                                    <TableCell>{row.id_tipo_tarjeta ? row.id_tipo_tarjeta.nombre_tipo_tarjeta : 'N/A'}</TableCell>
                                    <TableCell>{row.id_estado_tarjeta ? row.id_estado_tarjeta.nombre_estado_tarjeta : 'N/A'}</TableCell>
                                    <TableCell>
                                        <div className='flex flex-row text-center items-center'>
                                            <Link
                                                to={`/configuracion/cajero/tarjetas/update/${row.id_tarjeta_alimentacion}`}
                                                className={`mx-5 `}
                                            ><i className="fa-solid fa-pen"></i></Link>
                                            <Link
                                                to={`/configuracion/cajero/tarjetas/update-estado/${row.id_tarjeta_alimentacion}`}
                                                className={`mx-5 `}
                                            ><i className="fa-solid fa-pen"></i></Link>
                                            <button
                                                onClick={() => handleDelete(row.id_tarjeta_alimentacion)}><i className="fa-solid fa-trash-can"></i></button>
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

