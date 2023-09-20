
import { useFormik } from 'formik'
import { useEffect, useState } from 'react';
import { getList } from '../../../../services/services';
import { useNavigate } from 'react-router-dom';
import { useCreateTarjetaMutation } from '../../../../services/tarjetas.service';

export const Tarjeta = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        id_usuario_registro: 1, //Por defecto por le momento hasta q se implemente el inicio de session
        fecha_registro: '',
        fecha_modificacion: '',
        id_institucion: 1, // Se pone 1 como id_institucion por defecto
        id_tipo_tarjeta: '',
        id_estado_tarjeta: ''
    });
    const [CreateTarjetas, { isError: isErrorC, isLoading: isLoadingC, isSuccess: isSuccessC }] = useCreateTarjetaMutation()
    const [tipoTarjeta, setTipoTarjeta] = useState([]);
    const [estadoTarjeta, setEstadoTarjeta] = useState([]);

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
    }, []);
    const formik = useFormik({
        initialValues: formValues,
        enableReinitialize: true,
        onSubmit: async values => {
            CreateTarjetas(values)
            formik.resetForm();
        },
    });
    return (
        <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
            <div className="flex flex-row justify-between mb-8">
                <div className="text-2xl font-semibold">Registrar Tarjeta</div>
                <button className="font-bold py-2 px-4 rounded">
                    <i className="fa-solid fa-list-ul"></i>
                </button>
            </div>
            <form onSubmit={formik.handleSubmit}>
                {/* Fecha de Inicio */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_inicio">
                        Fecha de Inicio
                    </label>
                    <input
                        id="fecha_registro"
                        name="fecha_registro"
                        type="date"
                        onChange={formik.handleChange}
                        value={formik.values.fecha_registro}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* Fecha de Fin */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_fin">
                        Fecha de Fin
                    </label>
                    <input
                        id="fecha_modificacion"
                        name="fecha_modificacion"
                        type="date"
                        onChange={formik.handleChange}
                        value={formik.values.fecha_modificacion}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* Tipo de Tarjeta */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_tipo_tarjeta">
                        Tipo de Tarjeta
                    </label>
                    <select
                        id="id_tipo_tarjeta"
                        name="id_tipo_tarjeta"
                        onChange={formik.handleChange}
                        value={formik.values.id_tipo_tarjeta}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value={''}>--Seleccione--</option>
                        {tipoTarjeta.map((tipo) => (
                            <option value={tipo.id_tipo_tarjeta} key={tipo.id_tipo_tarjeta}>
                                {tipo.nombre_tipo_tarjeta}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Estado de Tarjeta */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_estado_tarjeta">
                        Estado de Tarjeta
                    </label>
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









