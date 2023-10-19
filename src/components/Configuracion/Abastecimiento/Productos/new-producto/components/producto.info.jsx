import PropTypes from "prop-types";
import FormField from "../../../../../auxiliar/FormField";
import {useGetUMQuery} from "../../../Unidaddes de Medidas/service/um.service";
import {useGetTipoProductoQuery} from "../../../Tipos de Productos/service/tipo.producto.service";
import FormFieldAutoComplete from "../../../../../auxiliar/FormFieldAutoComplete";

export default function AddProducto({formData}) {
    const {formField, values, errors, touched} = formData;
    const {
        nombre_producto,
        descripcion,
        precio_cup,
        id_tipo_producto,
        id_unidad_medida,
    } = formField;
    const {
        nombre_producto: nombre_productoV,
        descripcion: descripcionV,
        precio_cup: precio_cupV,
    } = values;
    const {data: tipo_producto} = useGetTipoProductoQuery(undefined, {
        refetchOnReconnect: true,
    });
    const {data: unidad_medidas} = useGetUMQuery(undefined, {
        refetchOnReconnect: true,
    });

    return (
        <div className="p-4">
            <div className="flex flex-wrap -mx-3">
                <div className="w-full sm:w-1/2 px-3">
                    <FormField
                        type={nombre_producto.type}
                        label={nombre_producto.label}
                        name={nombre_producto.name}
                        value={nombre_productoV}
                        placeholder={nombre_producto.placeholder}
                        error={errors.nombre_producto && touched.nombre_producto}
                    />
                </div>
                <div className="w-full sm:w-1/2 px-3">
                    <FormField
                        type={precio_cup.type}
                        label={precio_cup.label}
                        name={precio_cup.name}
                        value={precio_cupV}
                        placeholder={precio_cup.placeholder}
                        error={errors.precio_cup && touched.precio_cup}
                    />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                    <FormField
                        multiline
                        type={descripcion.type}
                        label={descripcion.label}
                        name={descripcion.name}
                        value={descripcionV}
                        placeholder={descripcion.placeholder}
                        error={errors.descripcion && touched.descripcion}
                    />
                </div>
            </div>

            <div className="flex flex-wrap -mx-3">
                <div className="w-full sm:w-1/2 px-3">
                    <FormFieldAutoComplete
                        label={id_tipo_producto.label}
                        name={id_tipo_producto.name}
                        options={tipo_producto}
                        valueKey="id_tipo_producto"
                        labelKey="nombre_tipo_producto"
                    />
                </div>
                <div className="w-full sm:w-1/2 px-3">
                    <FormFieldAutoComplete
                        label={id_unidad_medida.label}
                        name={id_unidad_medida.name}
                        options={unidad_medidas}
                        valueKey="id_unidad_medida"
                        labelKey="nombre_unidad_medida"
                    />
                </div>
            </div>
        </div>
    );
}

// typechecking props for UserInfo
AddProducto.propTypes = {
    formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};
