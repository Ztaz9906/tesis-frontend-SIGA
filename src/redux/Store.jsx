import {configureStore} from "@reduxjs/toolkit";

import {categoriaApi} from "../components/Configuracion/Distribucion/Categoria/service/categoria.service";
import {estructuraApi} from "../components/Configuracion/Distribucion/Estructura/service/estructura.service";
import {personaApi} from "../services/persona.service";
import {horarioApi} from "../components/Configuracion/Distribucion/Horario/service/horario.service";
import {diasApi} from "../services/dias.service";
import {institucionApi} from "../components/Configuracion/Seguridad/Instituciones/service/institucion.service";
import {loginLogOutApi} from "../services/login.service";
import {gruposApi} from "../components/Configuracion/Seguridad/Roles/service/roles.service";
import {permisosApi} from "../components/Configuracion/Seguridad/Roles/service/permisos.service";
import {
	classPlatosApi
} from "../components/Configuracion/Abastecimiento/Classificacion Platos/service/clasificacion.platos.service";
import {umedidaApi} from "../components/Configuracion/Abastecimiento/Unidaddes de Medidas/service/um.service";
import {
	tipoProductoApi
} from "../components/Configuracion/Abastecimiento/Tipos de Productos/service/tipo.producto.service";
import {productoApi} from "../components/Configuracion/Abastecimiento/Productos/service/producto.service";
import {tipotarjetaApi} from "../components/Configuracion/Cajero/TipoTarjetas/service/tipo.tarjeta.service";
import {estadotarjetaApi} from "@/components/Configuracion/Cajero/Tarjetas/service/estado.tarjeta.service.js";
import {tarjetaApi} from "@/components/Configuracion/Cajero/Tarjetas/service/tarjeta.service.js";
import {asignarIpApi} from "@/components/Configuracion/Cajero/AsignarIP/service/asignarip.service.js";
import {accesosApi} from "@/components/Configuracion/Cajero/Configuraciones/service/accesos.service.js";
import {genericApi} from "@/services/generic.service.js";
import {torpedoApi} from "@/components/Configuracion/Cajero/Torpedos/service/torpedo.service.js";
import {solapinPerdidoApi} from "@/components/Configuracion/Cajero/SolapinPerdido/service/solapin.perdido.service.js";
import {usuarioApi} from "@/components/Configuracion/Seguridad/Usuarios/service/usuario.service.js";
import {
	periodoReservacionApi
} from "@/components/Configuracion/Reservacion/Configuraciones/service/periodo.reservacion.service.js";
import {elementomostrarApi} from "@/components/Configuracion/Reservacion/Configuraciones/service/elementos.mostrar.js";
import {contactoApi} from "@/components/Configuracion/Reservacion/Configuraciones/service/contacto.service.js";
import {
	procesoReservacionApi
} from "@/components/Configuracion/Reservacion/ConfiguracionProceso/service/configuracion.proceso.reservacion.js";
import {eventoApi} from "@/components/Configuracion/Distribucion/Evento/service/evento.service.js";
import {clasificacioneventoApi} from "@/components/Configuracion/Distribucion/Evento/service/calsificacion.evento.js";
import {tipoAreasApi,} from "@/components/Configuracion/Configuracion/TipoAreas/service/tipo.areas.service.js";
import {areasApi,} from "@/components/Configuracion/Configuracion/Areas/service/areas.service.js";
import {
	configuracionComensalesApi
} from "@/components/Configuracion/Configuracion/ConfiguracionComensales/service/configuracion.comensales.service.js";
import {
	valoresconfiguracionComensalesApi
} from "@/components/Configuracion/Configuracion/ConfiguracionComensales/service/valores.configuracion.comensales.js";
import {
	responsableReservacionApi
} from "@/components/Configuracion/Reservacion/AsignarResponsables/service/responsable.reservacion.service.js";
import {
	asignaraPersonasAreasReservacionApi
} from "@/components/Configuracion/Reservacion/AsignarResponsables/service/areas.personas.reservacion.service.js";
import {asociarTarjetaApi} from "@/components/Configuracion/Cajero/Tarjetas/service/persona.tarjeta.service.js";
import {uploadExelApi} from "@/components/Configuracion/Seguridad/CargarExel/service/entrada.datos.js";
import {
	valoresconfiguracionCobroApi
} from "@/components/Configuracion/Facturacion/ConfiguracionCobro/servive/valores.configuracion.cobro.service.js";
import {
	configuracionCobroApi
} from "@/components/Configuracion/Facturacion/ConfiguracionCobro/servive/configuracion.cobro.service.js";
import userReducer from './userSlice.js';

export const store = configureStore({
	reducer: {
		user: userReducer,
		[genericApi.reducerPath]: genericApi.reducer,
		[categoriaApi.reducerPath]: categoriaApi.reducer,
		[estructuraApi.reducerPath]: estructuraApi.reducer,
		[personaApi.reducerPath]: personaApi.reducer,
		[horarioApi.reducerPath]: horarioApi.reducer,
		[diasApi.reducerPath]: diasApi.reducer,
		[institucionApi.reducerPath]: institucionApi.reducer,
		[loginLogOutApi.reducerPath]: loginLogOutApi.reducer,
		[gruposApi.reducerPath]: gruposApi.reducer,
		[permisosApi.reducerPath]: permisosApi.reducer,
		[classPlatosApi.reducerPath]: classPlatosApi.reducer,
		[umedidaApi.reducerPath]: umedidaApi.reducer,
		[tipoProductoApi.reducerPath]: tipoProductoApi.reducer,
		[productoApi.reducerPath]: productoApi.reducer,
		[tipotarjetaApi.reducerPath]: tipotarjetaApi.reducer,
		[estadotarjetaApi.reducerPath]: estadotarjetaApi.reducer,
		[tarjetaApi.reducerPath]: tarjetaApi.reducer,
		[asignarIpApi.reducerPath]: asignarIpApi.reducer,
		[accesosApi.reducerPath]: accesosApi.reducer,
		[torpedoApi.reducerPath]: torpedoApi.reducer,
		[solapinPerdidoApi.reducerPath]: solapinPerdidoApi.reducer,
		[usuarioApi.reducerPath]: usuarioApi.reducer,
		[periodoReservacionApi.reducerPath]: periodoReservacionApi.reducer,
		[elementomostrarApi.reducerPath]: elementomostrarApi.reducer,
		[contactoApi.reducerPath]: contactoApi.reducer,
		[procesoReservacionApi.reducerPath]: procesoReservacionApi.reducer,
		[eventoApi.reducerPath]: eventoApi.reducer,
		[clasificacioneventoApi.reducerPath]: clasificacioneventoApi.reducer,
		[tipoAreasApi.reducerPath]: tipoAreasApi.reducer,
		[areasApi.reducerPath]: areasApi.reducer,
		[configuracionComensalesApi.reducerPath]: configuracionComensalesApi.reducer,
		[valoresconfiguracionComensalesApi.reducerPath]: valoresconfiguracionComensalesApi.reducer,
		[responsableReservacionApi.reducerPath]: responsableReservacionApi.reducer,
		[asignaraPersonasAreasReservacionApi.reducerPath]: asignaraPersonasAreasReservacionApi.reducer,
		[asociarTarjetaApi.reducerPath]: asociarTarjetaApi.reducer,
		[uploadExelApi.reducerPath]: uploadExelApi.reducer,
		[valoresconfiguracionCobroApi.reducerPath]: valoresconfiguracionCobroApi.reducer,
		[configuracionCobroApi.reducerPath]: configuracionCobroApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({}).concat([
			genericApi.middleware,
			categoriaApi.middleware,
			estructuraApi.middleware,
			horarioApi.middleware,
			personaApi.middleware,
			diasApi.middleware,
			institucionApi.middleware,
			loginLogOutApi.middleware,
			gruposApi.middleware,
			permisosApi.middleware,
			classPlatosApi.middleware,
			umedidaApi.middleware,
			tipoProductoApi.middleware,
			productoApi.middleware,
			tipotarjetaApi.middleware,
			estadotarjetaApi.middleware,
			tarjetaApi.middleware,
			asignarIpApi.middleware,
			accesosApi.middleware,
			torpedoApi.middleware,
			solapinPerdidoApi.middleware,
			usuarioApi.middleware,
			periodoReservacionApi.middleware,
			elementomostrarApi.middleware,
			contactoApi.middleware,
			procesoReservacionApi.middleware,
			eventoApi.middleware,
			clasificacioneventoApi.middleware,
			tipoAreasApi.middleware,
			areasApi.middleware,
			configuracionComensalesApi.middleware,
			valoresconfiguracionComensalesApi.middleware,
			responsableReservacionApi.middleware,
			asignaraPersonasAreasReservacionApi.middleware,
			asociarTarjetaApi.middleware,
			uploadExelApi.middleware,
			valoresconfiguracionCobroApi.middleware,
			configuracionCobroApi.middleware,
		]),
});

export default store;
