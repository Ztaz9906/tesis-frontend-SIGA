
export const sectionsMap = {
  'Abastecimiento': {
    icon: 'fa-cart-shopping',
    routes: [
      { path: "/Configuracio/clasificacion_platos", label: "Clasificacion Platos" },
      { path: "/Configuracio/unidad_medida", label: "Unidades Medidas" },
      { path: "/Configuracio/tipo_productos", label: "Tipos de Productos" },
      { path: "/Configuracio/productos", label: "Productos" }
    ],
    computerViewHeight: 'h-32',
    movilViewHeight: 'h-52 w-48'
  },
  'Cajero': {
    icon: 'fa-sharp fa-solid fa-desktop',
    routes: [
      { path: "/Configuracio/cajero/1", label: "Tipo de Tarjetas" },
      { path: "/Configuracio/cajero/2", label: "Tarjetas" },
      { path: "/Configuracio/cajero/3", label: "Asignar IP a Puerta" },
      { path: "/Configuracio/cajero/4", label: "Configuraciones" },
      { path: "/Configuracio/cajero/5", label: "Torpedos" },
      { path: "/Configuracio/cajero/6", label: "Solapin Perdido" }
    ],
    computerViewHeight: 'h-44',
    movilViewHeight: 'h-64 w-48'
  },
  'Facturacion': {
    icon: 'fa-solid fa-circle-dollar-to-slot',
    routes: [
      { path: "/Configuracio/facturacion/1", label: "Reglas a excluir" }
    ],
    computerViewHeight: 'h-10',
    movilViewHeight: 'h-20 w-48'
  },
  'Distribucion': {
    icon: 'fa-solid fa-maximize',
    routes: [
      { path: "/Configuracio/distribucion/1", label: "Estructuras" },
      { path: "/Configuracio/distribucion/2", label: "Eventos" },
      { path: "/Configuracio/distribucion/3", label: "Horarios" },
      { path: "/Configuracio/distribucion/4", label: "Configuraciones" },
      { path: "/Configuracio/distribucion/5", label: "Configuracion de reglas" }
    ],
    computerViewHeight: 'h-40',
    movilViewHeight: 'h-48 w-48'
  },
  'Reservacion': {
    icon: 'fa-solid fa-calendar-days',
    routes: [
      { path: "/Configuracio/reservacion/1", label: "Configuraciones" },
      { path: "/Configuracio/reservacion/2", label: "Asignar responsable de reservacion" }
    ],
    computerViewHeight: 'h-20',
    movilViewHeight: 'h-36 w-48'
  },
  'Configuracion': {
    icon: 'fa-solid fa-gear',
    routes: [
      { path: "/Configuracio/configuracion/1", label: "Configuracion de comensales" },
      { path: "/Configuracio/configuracion/2", label: "Comensales" },
      { path: "/Configuracio/configuracion/3", label: "Configuracion del proceso" },
      { path: "/Configuracio/configuracion/4", label: "Configuracion cobro" }
    ],
    computerViewHeight: 'h-40',
    movilViewHeight: 'h-56 w-48'
  },
};
