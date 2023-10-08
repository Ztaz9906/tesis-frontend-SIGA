import PropTypes from "prop-types";
import FormField from "../../../../../auxiliar/FormField";
import FormFieldAutoComplete from "@/components/auxiliar/FormFieldAutoComplete.jsx";
import {useGetItemsQuery} from "@/services/generic.service.js";

export default function AddTorpedo({formData}) {
    const {formField, values, errors, touched} = formData;
    const {
        nombre_completo,
        ci,
        descripcion,
        id_sexo,
        id_municipio,
        id_pais,
        id_provincia
    } = formField;
    const {nombre_completo: nombre_completoV, ci: ciV, descripcion: descripcionV} = values;
    const {data: sexo} = useGetItemsQuery({endpoint: "sexos"}, undefined, {
        refetchOnReconnect: true,
    });
    const {data: pais} = useGetItemsQuery({endpoint: "paises"}, undefined, {
        refetchOnReconnect: true,
    });
    const {data: provincia} = useGetItemsQuery({endpoint: "provincias"}, undefined, {
        refetchOnReconnect: true,
    });
    const {data: municipio} = useGetItemsQuery({endpoint: "municipios"}, undefined, {
        refetchOnReconnect: true,
    });
    return (
        <div className="p-4">
            <div className="flex flex-wrap -mx-3">
                <div className="w-full sm:w-1/2 px-3">
                    <FormField
                        type={nombre_completo.type}
                        label={nombre_completo.label}
                        name={nombre_completo.name}
                        value={nombre_completoV}
                        placeholder={nombre_completo.placeholder}
                        error={errors.nombre_completo && touched.nombre_completo}
                    />
                </div>
                <div className="w-full sm:w-1/2 px-3">
                    <FormField
                        type={ci.type}
                        label={ci.label}
                        name={ci.name}
                        value={ciV}
                        placeholder={ci.placeholder}
                        error={errors.ci && touched.ci}
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
                        label={id_sexo.label}
                        name={id_sexo.name}
                        options={sexo}
                        valueKey="id_sexo"
                        labelKey="nombre_sexo"
                    />
                </div>
                <div className="w-full sm:w-1/2 px-3">
                    <FormFieldAutoComplete
                        label={id_municipio.label}
                        name={id_municipio.name}
                        options={municipio}
                        valueKey="id_municipio"
                        labelKey="nombre_municipio"
                    />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full sm:w-1/2 px-3">
                    <FormFieldAutoComplete
                        label={id_pais.label}
                        name={id_pais.name}
                        options={pais}
                        valueKey="id_pais"
                        labelKey="nombre_pais"
                    />
                </div>
                <div className="w-full sm:w-1/2 px-3">
                    <FormFieldAutoComplete
                        label={id_provincia.label}
                        name={id_provincia.name}
                        options={provincia}
                        valueKey="id_provincia"
                        labelKey="nombre_provincia"
                    />
                </div>
            </div>
        </div>
    );
}

// typechecking props for UserInfo
AddTorpedo.propTypes = {
    formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};
