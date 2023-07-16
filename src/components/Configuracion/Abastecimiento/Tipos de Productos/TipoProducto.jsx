
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { create, getDetail, update } from '../../../../services/services';
import { useNavigate } from 'react-router-dom';

export const TipoProducto = ({ title }) => {
    const { id } = useParams(); // Obtiene el id desde la URL
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        nombre_tipo_producto: '',
        activo: false,
        descripcion_tipo_producto: '',
        id_institucion: 1, // Se pone 1 como id_institucion por defecto
    });
    const [data, setData] = useState(null)

    if (id) {
        const fetchData = async () => {
            try {
                const response = await getDetail(id, 'Abastecimiento_TbNtipoProducto');
                setData(response.data);

                // Configurar los valores del formulario aquí
                setFormValues({
                    nombre_tipo_producto: response.data ? response.data.nombre_tipo_producto : '',
                    activo: response.data ? response.data.activo : false,
                    descripcion_tipo_producto: response.data ? response.data.descripcion_tipo_producto : '',
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
                    await update(id, values, 'Abastecimiento_TbNtipoProducto');
                    navigate('/configuracion/tipo_productos')
                }
                else {
                    await create(values, 'Abastecimiento_TbNtipoProducto');
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
                    <div className="mb-4 flex justify-start items-center">
                        <div className="flex flex-wrap mr-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                Nombre<span className='text-red-600'>*</span>
                            </label>
                            <input
                                id="nombre"
                                name="nombre_tipo_producto"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.nombre_tipo_producto}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Nombre"
                            />
                        </div>
                        <div className="flex items-center justify-between">
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
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
                            Descripción
                        </label>
                        <textarea
                            id="descripcion"
                            name="descripcion_tipo_producto"
                            onChange={formik.handleChange}
                            value={formik.values.descripcion_tipo_producto}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Descripción"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" type="submit">
                            Aceptar
                        </button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                         type="button"
                            onClick={() => navigate('/configuracion/tipo_productos')}
                         >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}


