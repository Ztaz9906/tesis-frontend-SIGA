export const sectionsMap = {
	'Abastecimiento': {
		title: 'Abastecimiento',
		icon: 'fa-cart-shopping',
		routes: [
			{path: "/configuracion/abastecimiento/clasificacion_platos", label: "Clasificacion Platos"},
			{path: "/configuracion/abastecimiento/unidad_medidas", label: "Unidades Medidas"},
			{path: "/configuracion/abastecimiento/tipo_productos", label: "Tipos de Productos"},
			{path: "/configuracion/abastecimiento/productos", label: "Productos"}
		],
	},
	'Cajero': {
		title: 'Cajero',
		icon: 'fa-sharp fa-solid fa-desktop',
		routes: [
			{path: "/configuracion/cajero/tipo_tarjetas", label: "Tipo de Tarjetas"},
			{path: "/configuracion/cajero/tarjetas", label: "Tarjetas"},
			{path: "/configuracion/cajero/asignar-ip", label: "Asignar IP a Puerta"},
			{path: "/configuracion/cajero/configuraccion-acceso", label: "Configuracion de acceso"},
			{path: "/configuracion/cajero/torpedos", label: "Torpedos"},
			{path: "/configuracion/cajero/solapin-perdidos", label: "Solapin Perdido"}
		],
	},
	'Facturacion': {
		title: 'Facturación',
		icon: 'fa-solid fa-circle-dollar-to-slot',
		routes: [
			{path: "/configuracion/facturacion/configuracion-cobro", label: "Configuracion del cobro"}
		],
	},
	'Distribucion': {
		title: 'Distribución',
		icon: 'fa-solid fa-maximize',
		routes: [
			{path: "/configuracion/distribucion/categorias", label: "Categoria"},
			{path: "/configuracion/distribucion/estructuras", label: "Estructuras"},
			{path: "/configuracion/distribucion/eventos", label: "Eventos"},
			{path: "/configuracion/distribucion/horarios", label: "Horarios"},
		],
	},
	'Reservacion': {
		title: 'Reservación',
		icon: 'fa-solid fa-calendar-days',
		routes: [
			{path: "/configuracion/reservacion/configuracion-reservacion", label: "Configuraciones de reservacion"},
			{
				path: "/configuracion/reservacion/configuracion-proceso-reservacion",
				label: "Configuracion del proceso de reservacion"
			},
			{path: "/configuracion/reservacion/responsable-areas", label: "Asignar responsable de reservacion"}
		],
	},
	'Configuracion': {
		title: 'Configuración',
		icon: 'fa-solid fa-gear',
		routes: [
			{path: "/configuracion/configuracion/configuracion-comensales", label: "Configuracion de comensales"},
			{path: "/configuracion/configuracion/2", label: "Comensales"},
			{path: "/configuracion/configuracion/tipo_areas", label: "Configuracion del Tipo de Areas"},
			{path: "/configuracion/configuracion/areas", label: "Configuracion de Areas"}
		],
	},
	'Seguridad': {
		title: 'Seguridad',
		icon: 'fa-solid fa-shield',
		routes: [
			{path: "/configuracion/seguridad/instituciones", label: "Instituciones"},
			{path: "/configuracion/seguridad/roles", label: "Roles y Permisos"},
			{path: "/configuracion/seguridad/usuarios", label: "Usuarios"},
			{path: "/configuracion/seguridad/entrada-datos", label: "Entrada de datos"},
		],
	},

};
