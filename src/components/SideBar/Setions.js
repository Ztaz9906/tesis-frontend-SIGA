export const sectionsMap = {
	'Abastecimiento': {
		icon: 'fa-cart-shopping',
		routes: [
			{path: "/configuracion/abastecimiento/clasificacion_platos", label: "Clasificacion Platos"},
			{path: "/configuracion/abastecimiento/unidad_medidas", label: "Unidades Medidas"},
			{path: "/configuracion/abastecimiento/tipo_productos", label: "Tipos de Productos"},
			{path: "/configuracion/abastecimiento/productos", label: "Productos"}
		],
	},
	'Cajero': {
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
		icon: 'fa-solid fa-circle-dollar-to-slot',
		routes: [
			{path: "/configuracion/facturacion/1", label: "Reglas a excluir"}
		],
	},
	'Distribucion': {
		icon: 'fa-solid fa-maximize',
		routes: [
			{path: "/configuracion/distribucion/categorias", label: "Categoria"},
			{path: "/configuracion/distribucion/estructuras", label: "Estructuras"},
			{path: "/configuracion/distribucion/2", label: "Eventos"},
			{path: "/configuracion/distribucion/horarios", label: "Horarios"},
			{path: "/configuracion/distribucion/5", label: "configuracion de reglas"}
		],
	},
	'Reservacion': {
		icon: 'fa-solid fa-calendar-days',
		routes: [
			{path: "/configuracion/reservacion/configuracion-acceso", label: "Configuraciones"},
			{path: "/configuracion/reservacion/2", label: "Configuracion del proceso de reservacion"},
			{path: "/configuracion/reservacion/3", label: "Asignar responsable de reservacion"}
		],
	},
	'Configuracion': {
		icon: 'fa-solid fa-gear',
		routes: [
			{path: "/configuracion/configuracion/1", label: "Configuracion de comensales"},
			{path: "/configuracion/configuracion/2", label: "Comensales"},
			{path: "/configuracion/configuracion/4", label: "Configuracion cobro"}
		],
	},
	'Seguridad': {
		icon: 'fa-solid fa-shield',
		routes: [
			{path: "/configuracion/seguridad/instituciones", label: "Instituciones"},
			{path: "/configuracion/seguridad/roles", label: "Roles y Permisos"},
			{path: "/configuracion/seguridad/3", label: "Usuarios"},
			{path: "/configuracion/seguridad/4", label: "Configuracion cobro"}
		],
	},

};
