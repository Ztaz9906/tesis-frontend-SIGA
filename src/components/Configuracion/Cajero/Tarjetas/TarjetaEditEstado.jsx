
import { useFormik } from 'formik'
import { useEffect, useState } from 'react';
import { getDetail, getList, partialUpdate } from '../../../../services/services';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export const TarjetaEditEstado = () => {
    const { id } = useParams(); // Obtiene el id desde la URL
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        id_estado_tarjeta: 0,
    },
    );
    const [data, setData] = useState(null)
    const [estadoTarjeta, setEstadoTarjeta] = useState([]);
    const fetchData = async () => {
        if (id) {
            console.log(id);
            try {
                const response = await getDetail(id, 'Cajero_TbDtarjetaAlimentacion');
                console.log(response.data);
                setData(response.data);
            } catch (err) {
                console.error('Failed to fetch data', err);
            }
        }
    };
    const fetchSelect = async () => {
        try {
            const response_um = await getList('Cajero_TbNestadoTarjeta');
            setEstadoTarjeta(response_um.data);
            console.log(response_um.data)
        } catch (err) {
            console.error('Failed to fetch data', err);
        }
    };

    useEffect(() => {
        fetchData();
        fetchSelect();
        if (data) {
            setFormValues({
                id_estado_tarjeta: data.id_estado_tarjeta.id_estado_tarjeta,
            },)
        }
    }, [id]);
    console.log(formValues);
    const formik = useFormik({
        initialValues: formValues,
        enableReinitialize: true,
        onSubmit: async values => {
            try {
                console.log(values)
                await partialUpdate(id, values, 'Cajero_TbNtipoTarjeta');
                navigate('/configuracion/cajero/tarjetas')
            } catch (error) {
                console.error('Failed to create data', error);
            }
        },
    });
    return (
        <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
            <div className="flex flex-row justify-between mb-8">
                <div className="text-2xl font-semibold">Modificar Estado de Tarjeta</div>
                <button className="font-bold py-2 px-4 rounded">
                    <i className="fa-solid fa-list-ul"></i>
                </button>
            </div>
            {data && (<div className='flex flex-row border-y-2 border-gray-400 p-4 text-lg text-gray-700 justify-start gap-8'>
                <div className='flex flex-col'>
                    <label htmlFor="">Codigo : {data.codigo}</label>
                    <label htmlFor="">Estado : {data.id_estado_tarjeta.nombre_estado_tarjeta}</label>
                    <label htmlFor="">Numero de serie : {data.numero_serie}</label>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="">Fecha Registro : {data.fecha_registro}</label>
                    <label htmlFor="">Tipo de tarjeta : {data.id_tipo_tarjeta.nombre_tipo_tarjeta}</label>
                </div>
            </div>)}

            <form onSubmit={formik.handleSubmit}>
                {/* Estado de Tarjeta */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_estado_tarjeta">
                        Estado de Tarjeta
                    </label>
                    <select
                        id="id_estado_tarjeta"
                        name="id_estado_tarjeta"
                        onChange={(e) => {
                            if (e.target.name === 'id_estado_tarjeta') {
                                formik.setFieldValue('id_estado_tarjeta', parseInt(e.target.value, 10));
                            } else {
                                formik.handleChange(e);
                            }
                        }}
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

                </div>

                {/* Botones de Acción */}
                <div className="flex justify-end">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" type="submit">
                        Aceptar
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        type="button"
                        onClick={() => navigate('/configuracion/cajero/tarjetas')}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    )
}









