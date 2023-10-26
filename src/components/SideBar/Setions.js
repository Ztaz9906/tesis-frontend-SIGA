export const sectionsMap = {
	'Abastecimiento': {
		title: 'Abastecimiento',
		icon: 'fa-cart-shopping',
		routes: [
			{path: "/configuracion/abastecimiento/clasificacion_platos", label: "Clasificación  de platos"},
			{path: "/configuracion/abastecimiento/unidad_medidas", label: "Unidades de medida"},
			{path: "/configuracion/abastecimiento/tipo_productos", label: "Tipos de producto"},
			{path: "/configuracion/abastecimiento/productos", label: "Productos"}
		],
	},
	'Cajero': {
		title: 'Cajero',
		icon: 'fa-sharp fa-solid fa-desktop',
		routes: [
			{path: "/configuracion/cajero/tipo_tarjetas", label: "Tipos de tarjeta"},
			{path: "/configuracion/cajero/tarjetas", label: "Tarjetas"},
			{path: "/configuracion/cajero/asignar-ip", label: "Asignar IP a puerta"},
			{path: "/configuracion/cajero/configuraccion-acceso", label: "Configuración de acceso"},
			{path: "/configuracion/cajero/torpedos", label: "Torpedos"},
			{path: "/configuracion/cajero/solapin-perdidos", label: "Solapín perdido"}
		],
	},
	'Facturacion': {
		title: 'Facturación',
		icon: 'fa-solid fa-circle-dollar-to-slot',
		routes: [
			{path: "/configuracion/facturacion/configuracion-cobro", label: "Configuración de cobro"}
		],
	},
	'Distribucion': {
		title: 'Distribución',
		icon: 'fa-solid fa-maximize',
		routes: [
			{path: "/configuracion/distribucion/categorias", label: "Categorías"},
			{path: "/configuracion/distribucion/estructuras", label: "Estructuras"},
			{path: "/configuracion/distribucion/eventos", label: "Eventos"},
			{path: "/configuracion/distribucion/horarios", label: "Horarios"},
		],
	},
	'Reservacion': {
		title: 'Reservación',
		icon: 'fa-solid fa-calendar-days',
		routes: [
			{path: "/configuracion/reservacion/configuracion-reservacion", label: "Configuración de reservación"},
			{
				path: "/configuracion/reservacion/configuracion-proceso-reservacion",
				label: "Configuración del proceso de reservación"
			},
			{path: "/configuracion/reservacion/responsable-areas", label: "Asignar responsable de reservación"}
		],
	},
	'Configuracion': {
		title: 'Configuración',
		icon: 'fa-solid fa-gear',
		routes: [
			{path: "/configuracion/configuracion/configuracion-comensales", label: "Configuración de comensales"},
			{path: "/configuracion/configuracion/2", label: "Comensales"},
			{path: "/configuracion/configuracion/tipo_areas", label: "Configuración del tipo de área"},
			{path: "/configuracion/configuracion/areas", label: "Configuración de área"}
		],
	},
	'Seguridad': {
		title: 'Seguridad',
		icon: 'fa-solid fa-shield',
		routes: [
			{path: "/configuracion/seguridad/instituciones", label: "Instituciones", staffOnly: true},
			{path: "/configuracion/seguridad/roles", label: "Roles y Permisos", staffOnly: true},
			{path: "/configuracion/seguridad/usuarios", label: "Usuarios"},
			{path: "/configuracion/seguridad/entrada-datos", label: "Entrada de datos"},
		],
	},

};
