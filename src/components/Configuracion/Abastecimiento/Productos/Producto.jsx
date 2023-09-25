
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { create, getDetail, getList, update } from '../../../../services/services';
import { useNavigate } from 'react-router-dom';

export const Producto = ({ title }) => {
    const { id } = useParams(); // Obtiene el id desde la URL
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        nombre_producto: '',
        descripcion: '',
        precio_cup: '',
        id_institucion: 1, // Se pone 1 como id_institucion por defecto
        id_unidad_medida: '',
        id_tipo_producto: ''
    });
    const [data, setData] = useState(null)
    const [unidadMedida, setUnidadMedida] = useState([]);
    const [tipoProducto, setTipoProducto] = useState([]);
    const fetchData = async () => {
        if (id) {
            try {
                const response = await getDetail(id, 'Asset_TbDproducto');
                setData(response.data);
                // Configurar los valores del formulario aquí
                setFormValues({
                    nombre_producto: response.data ? response.data.nombre_producto : '',
                    precio_cup: response.data ? response.data.precio_cup : 0,
                    descripcion: response.data ? response.data.descripcion : '',
                    id_institucion: 1,
                    id_unidad_medida: unidadMedida,
                    id_tipo_producto: tipoProducto
                });
            } catch (err) {
                console.error('Failed to fetch data', err);
            }
        }
    };

    const fetchSelect = async () => {
        try {
            const response_um = await getList('Abastecimiento_TbNunidadMedida');
            setUnidadMedida(response_um.data);
            const response_tp = await getList('Abastecimiento_TbNtipoProducto');
            setTipoProducto(response_tp.data);
        } catch (err) {
            console.error('Failed to fetch data', err);
        }
    };

    useEffect(() => {
        fetchSelect();
        fetchData();
    }, [id]);
    const formik = useFormik({
        initialValues: formValues,
        enableReinitialize: true,
        onSubmit: async values => {
            try {
                if (id) {
                    await update(id, values, 'Asset_TbDproducto');
                    navigate('/configuracion/productos')
                }
                else {
                    await create(values, 'Asset_TbDproducto');
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
                                name="nombre_producto"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.nombre_producto}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Nombre"
                            />
                        </div>
                        <div className="flex flex-wrap mr-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                Precio<span className='text-red-600'>*</span>
                            </label>
                            <input
                                id="precio"
                                name="precio_cup"
                                type="number"
                                onChange={formik.handleChange}
                                value={formik.values.precio_cup}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Precio"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
                            Descripción
                        </label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            onChange={formik.handleChange}
                            value={formik.values.descripcion}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Descripción"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unidad_medida">
                            Unidad de Medida
                        </label>
                        <select
                            id="unidad_medida"
                            name="id_unidad_medida"
                            onChange={formik.handleChange}
                            value={formik.values.id_unidad_medida}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            {!id ? <option value={''}>
                                --Seleccione--
                            </option> : null}
                            {unidadMedida.map((unidad) => (
                                <option value={unidad.id_unidad_medida} key={unidad.id_unidad_medida}>
                                    {unidad.nombre_unidad_medida}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tipo_producto">
                            Tipo de Producto
                        </label>
                        <select
                            id="tipo_producto"
                            name="id_tipo_producto"
                            onChange={formik.handleChange}
                            value={formik.values.id_tipo_producto}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            {!id ? <option value={''}>
                                --Seleccione--
                            </option> : null}
                            {tipoProducto.map((tipo) => (
                                <option value={tipo.id_tipo_producto} key={tipo.id_tipo_producto}>
                                    {tipo.nombre_tipo_producto}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" type="submit">
                            Aceptar
                        </button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            type="button"
                            onClick={() => navigate('/configuracion/productos')}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

