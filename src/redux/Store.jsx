import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./GlobalSlice";
import { tarjetasApi } from "../services/tarjetas.service";
import { AsignarIpApi } from "../services/asignarip.service";
import { categoriaApi } from "../components/Configuracion/Distribucion/Categoria/service/categoria.service";
import { estructuraApi } from "../components/Configuracion/Distribucion/Estructura/service/estructura.service";
import { personaApi } from "../services/persona.service";
import { horarioApi } from "../components/Configuracion/Distribucion/Horario/service/horario.service";
import { diasApi } from "../services/dias.service";
import { institucionApi } from "../components/Configuracion/Seguridad/Instituciones/service/institucion.service";
import { loginLogOutApi } from "../services/login.service";
import { gruposApi } from "../components/Configuracion/Seguridad/Roles/service/roles.service";
import { permisosApi } from "../components/Configuracion/Seguridad/Roles/service/permisos.service";
import { classPlatosApi } from "../components/Configuracion/Abastecimiento/Classificacion Platos/service/clasificacion.platos.service";
import { umedidaApi } from "../components/Configuracion/Abastecimiento/Unidaddes de Medidas/service/um.service";
import { tipoProductoApi } from "../components/Configuracion/Abastecimiento/Tipos de Productos/service/tipo.producto.service";
import { productoApi } from "../components/Configuracion/Abastecimiento/Productos/service/producto.service";
import { tipotarjetaApi } from "../components/Configuracion/Cajero/TipoTarjetas/service/tipo.tarjeta.service";

export const store = configureStore({
  reducer: {
    [tarjetasApi.reducerPath]: tarjetasApi.reducer,
    [AsignarIpApi.reducerPath]: AsignarIpApi.reducer,
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
    global: globalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      tarjetasApi.middleware,
      AsignarIpApi.middleware,
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
    ]),
});

export default store;
