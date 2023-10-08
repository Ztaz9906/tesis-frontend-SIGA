import PropTypes from "prop-types";
import FormField from "../../../../../auxiliar/FormField";
import {useGetEstadoTarjetasQuery} from "@/components/Configuracion/Cajero/Tarjetas/service/estado.tarjeta.service.js";
import {useGetTipoTarjetasQuery} from "@/components/Configuracion/Cajero/TipoTarjetas/service/tipo.tarjeta.service.js";
import FormFieldAutoComplete from "@/components/auxiliar/FormFieldAutoComplete.jsx";
import {InputLabel} from "@mui/material";

export default function AddTipoTarjeta({formData}) {
    const {formField, values, errors, touched, location} = formData;
    const {
        id_estado_tarjeta,
        id_tipo_tarjeta,
        fecha_fin,
        fecha_inicio,
    } = formField;
    const {
        fecha_inicio: fecha_inicioV,
        fecha_fin: fecha_finV,
    } = values;
    const {data: estado_tarjeta} = useGetEstadoTarjetasQuery(undefined, {
        refetchOnReconnect: true,
    });
    const {data: tipo_tarjeta} = useGetTipoTarjetasQuery(undefined, {
        refetchOnReconnect: true,
    });
    return (
        <div className="p-4">
            {location.pathname.includes('update-estado') ? (
                <div className="flex flex-wrap -mx-3">
                    <div className="w-full  px-3">
                        <FormFieldAutoComplete
                            label={id_estado_tarjeta.label}
                            name={id_estado_tarjeta.name}
                            options={estado_tarjeta}
                            valueKey="id_estado_tarjeta"
                            labelKey="nombre_estado_tarjeta"
                        />
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex flex-wrap -mx-3">
                        <div className="w-full px-3">
                            {!fecha_inicioV && <InputLabel>Fecha de inicio</InputLabel>}
                            <FormField
                                type={fecha_inicio.type}
                                label={fecha_inicioV && fecha_inicio.label}
                                name={fecha_inicio.name}
                                value={fecha_inicioV}
                                placeholder={fecha_inicio.placeholder}
                                error={errors.fecha_inicio && touched.fecha_inicio}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3">
                        <div className="w-full px-3">
                            {!fecha_finV && <InputLabel>Fecha de fin</InputLabel>}

                            <FormField
                                type={fecha_fin.type}
                                label={fecha_finV && fecha_fin.label}
                                name={fecha_fin.name}
                                value={fecha_finV}
                                placeholder={fecha_fin.placeholder}
                                error={errors.fecha_fin && touched.fecha_fin}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3">
                        <div className="w-full sm:w-1/2 px-3">
                            <FormFieldAutoComplete
                                label={id_estado_tarjeta.label}
                                name={id_estado_tarjeta.name}
                                options={estado_tarjeta}
                                valueKey="id_estado_tarjeta"
                                labelKey="nombre_estado_tarjeta"
                            />
                        </div>
                        <div className="w-full sm:w-1/2 px-3">
                            <FormFieldAutoComplete
                                label={id_tipo_tarjeta.label}
                                name={id_tipo_tarjeta.name}
                                options={tipo_tarjeta}
                                valueKey="id_tipo_tarjeta"
                                labelKey="nombre_tipo_tarjeta"
                            />
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}

// typechecking props for UserInfo
AddTipoTarjeta.propTypes = {
    formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};
