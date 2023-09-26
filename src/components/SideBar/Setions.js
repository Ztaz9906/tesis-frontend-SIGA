
export const sectionsMap = {
  'Abastecimiento': {
    icon: 'fa-cart-shopping',
    routes: [
      { path: "/configuracion/clasificacion_platos", label: "Clasificacion Platos" },
      { path: "/configuracion/unidad_medida", label: "Unidades Medidas" },
      { path: "/configuracion/tipo_productos", label: "Tipos de Productos" },
      { path: "/configuracion/productos", label: "Productos" }
    ],
    computerViewHeight: 'h-32',
    movilViewHeight: 'h-52 w-48'
  },
  'Cajero': {
    icon: 'fa-sharp fa-solid fa-desktop',
    routes: [
      { path: "/configuracion/cajero/tipo_tarjeta", label: "Tipo de Tarjetas" },
      { path: "/configuracion/cajero/tarjetas", label: "Tarjetas" },
      { path: "/configuracion/cajero/asignar-ip", label: "Asignar IP a Puerta" },
      { path: "/configuracion/cajero/4", label: "configuracionnes" },
      { path: "/configuracion/cajero/5", label: "Torpedos" },
      { path: "/configuracion/cajero/6", label: "Solapin Perdido" }
    ],
    computerViewHeight: 'h-44',
    movilViewHeight: 'h-64 w-48'
  },
  'Facturacion': {
    icon: 'fa-solid fa-circle-dollar-to-slot',
    routes: [
      { path: "/configuracion/facturacion/1", label: "Reglas a excluir" }
    ],
    computerViewHeight: 'h-10',
    movilViewHeight: 'h-20 w-48'
  },
  'Distribucion': {
    icon: 'fa-solid fa-maximize',
    routes: [
      { path: "/configuracion/distribucion/categorias", label: "Categoria" },
      { path: "/configuracion/distribucion/estructuras", label: "Estructuras" },
      { path: "/configuracion/distribucion/2", label: "Eventos" },
      { path: "/configuracion/distribucion/horarios", label: "Horarios" },
      { path: "/configuracion/distribucion/4", label: "configuraciones" },
      { path: "/configuracion/distribucion/5", label: "configuracion de reglas" }
    ],
    computerViewHeight: 'h-44',
    movilViewHeight: 'h-48 w-48'
  },
  'Reservacion': {
    icon: 'fa-solid fa-calendar-days',
    routes: [
      { path: "/configuracion/reservacion/1", label: "configuraciones" },
      { path: "/configuracion/reservacion/2", label: "Asignar responsable de reservacion" }
    ],
    computerViewHeight: 'h-20',
    movilViewHeight: 'h-36 w-48'
  },
  'Configuracion': {
    icon: 'fa-solid fa-gear',
    routes: [
      { path: "/configuracion/configuracion/1", label: "Configuracion de comensales" },
      { path: "/configuracion/configuracion/2", label: "Comensales" },
      { path: "/configuracion/configuracion/3", label: "Configuracion del proceso" },
      { path: "/configuracion/configuracion/4", label: "Configuracion cobro" }
    ],
    computerViewHeight: 'h-36',
    movilViewHeight: 'h-56 w-48'
  },
  'Seguridad': {
    icon: 'fa-solid fa-shield',
    routes: [
      { path: "/configuracion/seguridad/instituciones", label: "Instituciones" },
      { path: "/configuracion/seguridad/2", label: "Roles y Permisos" },
      { path: "/configuracion/seguridad/3", label: "Usuarios" },
      { path: "/configuracion/seguridad/4", label: "Configuracion cobro" }
    ],
    computerViewHeight: 'h-32',
    movilViewHeight: 'h-56 w-48'
  },
  
};
