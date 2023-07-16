import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { create, getDetail, update } from '../../../../services/services';
import { useNavigate } from 'react-router-dom';

export const UnidadMedida = ({ title }) => {
    const navigate = useNavigate();
    const { id } = useParams(); // Obtiene el id desde la URL
    const [formValues, setFormValues] = useState({
        nombre_unidad_medida: '',
        activo: false,
        descripcion_unidad_medida: '',
        siglas: '',
        clasificacion: '',
        id_institucion: 1, // Se pone 1 como id_institucion por defecto
    });
    const [data, setData] = useState(null)

    if (id) {
        const fetchData = async () => {
            try {
                const response = await getDetail(id, 'Abastecimiento_TbNunidadMedida');
                setData(response.data);

                // Configurar los valores del formulario aquí
                setFormValues({
                    nombre_unidad_medida: response.data ? response.data.nombre_unidad_medida : '',
                    activo: response.data ? response.data.activo : false,
                    descripcion_unidad_medida: response.data ? response.data.descripcion_unidad_medida : '',
                    siglas: response.data ? response.data.siglas : '',
                    clasificacion: response.data ? response.data.clasificacion : '',
                    id_institucion: 1,
                });
            } catch (err) {
                console.error('Failed to fetch data', err);
            }
        };
        useEffect(() => {
            fetchData();
        }, [id]);
    }

    const formik = useFormik({
        initialValues: formValues,
        enableReinitialize: true,
        onSubmit: async values => {
            try {
                if (id) {
                    await update(id, values, 'Abastecimiento_TbNunidadMedida');
                    navigate('/configuracion/unidad_medida')
                }
                else {
                    await create(values, 'Abastecimiento_TbNunidadMedida');
                    formik.resetForm();
                }
            } catch (error) {
                console.error('Failed to create data', error);
            }
        },
    });

    return (
        <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
            <div className="py-8">
                <div className="flex flex-row justify-between mb-8">
                    <div className="text-2xl font-semibold">{title}</div>
                    <button className="font-bold py-2 px-4 rounded">
                        <i className="fa-solid fa-list-ul"></i>
                    </button>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre_unidad_medida">
                            Nombre de la unidad de medida<span className='text-red-600'>*</span>
                        </label>
                        <input
                            id="nombre_unidad_medida"
                            name="nombre_unidad_medida"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.nombre_unidad_medida}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Nombre de la unidad de medida"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion_unidad_medida">
                            Descripción de la unidad de medida
                        </label>
                        <textarea
                            id="descripcion_unidad_medida"
                            name="descripcion_unidad_medida"
                            onChange={formik.handleChange}
                            value={formik.values.descripcion_unidad_medida}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Descripción de la unidad de medida"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="siglas">
                            Siglas<span className='text-red-600'>*</span>
                        </label>
                        <input
                            id="siglas"
                            name="siglas"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.siglas}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Siglas"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clasificacion">
                            Clasificación<span className='text-red-600'>*</span>
                        </label>
                        <select
                            id="clasificacion"
                            name="clasificacion"
                            onChange={formik.handleChange}
                            value={formik.values.clasificacion}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="" disabled>Seleccione una opción</option>
                            <option value="Masa">Masa</option>
                            <option value="Volumen">Volumen</option>
                        </select>
                    </div>

                    <div className="mb-4 flex items-center justify-start">
                        <input
                            id="activo"
                            name="activo"
                            type="checkbox"
                            onChange={formik.handleChange}
                            checked={formik.values.activo}
                            className="mr-2"
                        />
                        <label className="block text-gray-700 text-sm font-bold" htmlFor="activo">
                            Activo
                        </label>
                    </div>

                    <div className="flex justify-end">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" type="submit"
                        >
                            Aceptar
                        </button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" type="button"
                            onClick={() => navigate('/configuracion/unidad_medida')}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
