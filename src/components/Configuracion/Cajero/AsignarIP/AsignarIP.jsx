
import { useFormik } from 'formik'
import { useEffect, useState } from 'react';
import { create, getDetail, getList } from '../../../../services/services';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEditTarjetaMutation, useLazyGetTarjetaByIdQuery } from '../../../../services/tarjetas.service';

export const AsignarIP = () => {
    const { id } = useParams(); // Obtiene el id desde la URL
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({});
    const [tipoTarjeta, setTipoTarjeta] = useState([]);
    const [estadoTarjeta, setEstadoTarjeta] = useState([]);
    const [EditTarjetas, { isError: isErrorE, isLoading: isLoadingE, isSuccess: isSuccessE }] = useEditTarjetaMutation()
    const [getTarjetaById, { data, isError, isLoading, isSuccess }] = useLazyGetTarjetaByIdQuery()


    const fetchSelect = async () => {
        try {
            const response_um = await getList('Cajero_TbNestadoTarjeta');
            setEstadoTarjeta(response_um.data);
            const response_tp = await getList('Cajero_TbNtipoTarjeta');
            setTipoTarjeta(response_tp.data);
        } catch (err) {
            console.error('Failed to fetch data', err);
        }
    };

    useEffect(() => {
        fetchSelect();
    }, [id]);

    const formik = useFormik({
        initialValues: formValues,
        enableReinitialize: true,
        onSubmit: async values => {
            EditTarjetas({ id, ...values }).then(navigate('/configuracion/cajero/tarjetas'))
        },
    });
    useEffect(() => {
        if (id) {
            getTarjetaById(id)
                .unwrap()
                .then((res) => {
                    formik.setFieldValue("fecha_registro", res.fecha_registro);
                    formik.setFieldValue("fecha_modificacion", res.fecha_modificacion);
                });
        }
    }, []);
    return (
        <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
            <div className="flex flex-row justify-between mb-8">
                <div className="text-2xl font-semibold">Modificar Tarjeta</div>
                <button className="font-bold py-2 px-4 rounded"
                    onClick={() => navigate('/configuracion/cajero/asignar-ip')}
                >
                    <i className="fa-solid fa-list-ul"></i>
                </button>
            </div>
            <div className='flex flex-row border-y-2 border-gray-400 p-4 text-lg text-gray-700 justify-start gap-8 mb-4'>
                <div className='flex flex-col'>
                    <label htmlFor="">Nombre : </label>
                    <label htmlFor="">Siglas : </label>
                    <label htmlFor="">Descripcion : </label>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="">Categoria : </label>
                    <label htmlFor="">Puerta : </label>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="">Activo : </label>
                    <label htmlFor="">Capacidad : </label>
                </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
                {/* Estado de Tarjeta */}
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_estado_tarjeta">
                    IP <span className='text-red-600'>*</span>
                </label>
                <div className="flex mb-4 gap-3">
                    <select
                        id="id_estado_tarjeta"
                        name="id_estado_tarjeta"
                        onChange={formik.handleChange}
                        value={formik.values.id_estado_tarjeta}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value={''}>--Seleccione--</option>
                        {estadoTarjeta.map((estado) => (
                            <option value={estado.id_estado_tarjeta} key={estado.id_estado_tarjeta}>
                                {estado.nombre_estado_tarjeta}
                            </option>
                        ))}
                    </select>
                    <div className="flex justify-end">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" type="submit">
                            Asociar
                        </button>
                    </div>
                </div>
            </form>
            <div>Aqui va la tabla con la lista de ips</div>
        </div>
    )
}









