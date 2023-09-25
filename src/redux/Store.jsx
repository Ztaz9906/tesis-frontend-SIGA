import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./GlobalSlice";
import authReducer from "./AuthSlice";
import { tarjetasApi } from "../services/tarjetas.service";
import { AsignarIpApi } from "../services/asignarip.service";
import { categoriaApi } from "../components/Configuracion/Distribucion/Categoria/service/categoria.service";
import { estructuraApi } from "../components/Configuracion/Distribucion/Estructura/service/estructura.service";
import { personaApi } from "../services/persona.service";
import { horarioApi } from "../components/Configuracion/Distribucion/Horario/service/horario.service";

export const store = configureStore({
  reducer: {
    [tarjetasApi.reducerPath]: tarjetasApi.reducer,
    [AsignarIpApi.reducerPath]: AsignarIpApi.reducer,
    [categoriaApi.reducerPath]: categoriaApi.reducer,
    [estructuraApi.reducerPath]: estructuraApi.reducer,
    [personaApi.reducerPath]: personaApi.reducer,
    [horarioApi.reducerPath]: horarioApi.reducer,

    global: globalReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      tarjetasApi.middleware,
      AsignarIpApi.middleware,
      categoriaApi.middleware,
      estructuraApi.middleware,
      horarioApi.middleware,
      personaApi.middleware,
    ]),
});

export default store;
