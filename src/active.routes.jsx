import {Outlet, Route, Routes} from 'react-router-dom';
import IndexConfiguracion from "./components/Configuracion/Cajero/Configuraciones/IndexConfiguracion";
import Torpedo from "./components/Configuracion/Cajero/Torpedos/new-asgnatura/new.torpedo.jsx";
import Index from "./components/Configuracion/Distribucion/Categoria";
import Categoria from "./components/Configuracion/Distribucion/Categoria/new-Categoria/new.categoria";
import IndexEstructura from "./components/Configuracion/Distribucion/Estructura";
import Estructura from "./components/Configuracion/Distribucion/Estructura/new-estructura/new.estructura";
import DetailEstructura from "./components/Configuracion/Distribucion/Estructura/new-estructura/detail.estructura";
import AddSettings from "./components/Configuracion/Distribucion/Estructura/new-estructura/settings";
import IndexHorarios from "./components/Configuracion/Distribucion/Horario";
import Horario from "./components/Configuracion/Distribucion/Horario/new-horario/new.horario";
import IndexInstituciones from "./components/Configuracion/Seguridad/Instituciones";
import Institucion from "./components/Configuracion/Seguridad/Instituciones/new-institucion/new.institucion";
import IndexRoles from "./components/Configuracion/Seguridad/Roles";
import Roles from "./components/Configuracion/Seguridad/Roles/new-roles/new.roles";
import IndexClassPlatos from "./components/Configuracion/Abastecimiento/Classificacion Platos";
import ClassPlatos
	from "./components/Configuracion/Abastecimiento/Classificacion Platos/new-Categoria/new.clasificacion.platos";
import UM from "./components/Configuracion/Abastecimiento/Unidaddes de Medidas/new-UM/new.um";
import IndexUM from "./components/Configuracion/Abastecimiento/Unidaddes de Medidas";
import TipoProducto
	from "./components/Configuracion/Abastecimiento/Tipos de Productos/new-tipo_producto/new.tipo.producto";
import IndexTipoProducto from "./components/Configuracion/Abastecimiento/Tipos de Productos";
import Producto from "./components/Configuracion/Abastecimiento/Productos/new-producto/new.producto";
import IndexProductos from "./components/Configuracion/Abastecimiento/Productos";
import IndexTipoTarjeta from "./components/Configuracion/Cajero/TipoTarjetas";
import TipoTarjeta from "./components/Configuracion/Cajero/TipoTarjetas/new-tipo-tarjeta/new.tipo.tarjeta";
import IndexTarjeta from "@/components/Configuracion/Cajero/Tarjetas/index.jsx";
import Tarjeta from "@/components/Configuracion/Cajero/Tarjetas/new-tarjeta/new.tarjeta.jsx";
import IndexAsignarIP from "@/components/Configuracion/Cajero/AsignarIP/IndexAsignarIP.jsx";
import AsignarIp from "@/components/Configuracion/Cajero/AsignarIP/new-asignarip/new.asignarip.jsx";
import IndexTorpedo from "./components/Configuracion/Cajero/Torpedos/index.jsx";
import IndexSolapinPerdido from "@/components/Configuracion/Cajero/SolapinPerdido/IndexSolapinPerdido.jsx";
import AddSolapinPerdido
	from "@/components/Configuracion/Cajero/SolapinPerdido/new-solapin-perdido/new.solapin.perdido.jsx";
import IndexConfiguracionReservacion from "@/components/Configuracion/Reservacion/Configuraciones/index.jsx";
import IndexConfiguracionProcesoReservacion
	from "@/components/Configuracion/Reservacion/ConfiguracionProceso/index.jsx";
import IndexEvento from "@/components/Configuracion/Distribucion/Evento/index.jsx";
import Evento from "@/components/Configuracion/Distribucion/Evento/new-evento/new.evento.jsx";
import Login from "@/components/Security/Login.jsx";
import Layout from "./components/layout";
import NotFound from "@/components/auxiliar/NotFound.jsx";
import UnAuthorized from "@/components/auxiliar/UnAuthorized.jsx";
import IndexUsuarioes from "@/components/Configuracion/Seguridad/Usuarios/index.jsx";
import Usuario from "@/components/Configuracion/Seguridad/Usuarios/new-usuario/new.usuario.jsx";
import IndexTipoEstrutura from "@/components/Configuracion/Configuracion/TipoAreas/index.jsx";
import IndexAreas from "@/components/Configuracion/Configuracion/Areas/index.jsx";
import TipoArea from "@/components/Configuracion/Configuracion/TipoAreas/new-tipo-area/new.tipo.estructura.jsx";
import Area from "@/components/Configuracion/Configuracion/Areas/new-area/new.area.jsx";
import IndexConfiguracionComensales from "@/components/Configuracion/Configuracion/ConfiguracionComensales/index.jsx";
import ConfiguracionComensal
	from "@/components/Configuracion/Configuracion/ConfiguracionComensales/new-configuracion-comensales/new.configuracion.comensal.jsx";
import AddComensal
	from "@/components/Configuracion/Configuracion/ConfiguracionComensales/add-comensal/add.comensal.jsx";
import ComensalesActivos from "@/components/Configuracion/Configuracion/ComensalesActivos/ComensalesActivos.jsx";
import IndexAsignarResponsablesReservacion from "@/components/Configuracion/Reservacion/AsignarResponsables/index.jsx";
import Responsable
	from "@/components/Configuracion/Reservacion/AsignarResponsables/new-responsable/new.responsable.jsx";
import AsociarPersonas
	from "@/components/Configuracion/Reservacion/AsignarResponsables/aociar-personas/asociar.personas.areas.jsx";
import Detalles from "@/components/Configuracion/Reservacion/AsignarResponsables/detalles/details.jsx";
import AsociarPersonaTarjeta from "@/components/Configuracion/Cajero/Tarjetas/asociar-persona/asociar.persona.jsx";
import EntradaDatos from "@/components/Configuracion/Seguridad/CargarExel/CargarExcel.jsx";
import IndexConfiguracionCobro from "@/components/Configuracion/Facturacion/ConfiguracionCobro/index.jsx";
import AgregarValoresConfigurcionCobro
	from "@/components/Configuracion/Facturacion/ConfiguracionCobro/new-valores/new.valores.cobro.jsx";
import {useSelector} from "react-redux";

const Placeholder = () => <div>Componente en construcción</div>;

const RUTAS_POR_MODULO = {
	abastecimiento: [
		{path: "clasificacion_platos", element: <IndexClassPlatos/>},
		{path: "clasificacion_platos/create", element: <ClassPlatos/>},
		{path: "clasificacion_platos/update/:id", element: <ClassPlatos/>},
		{path: "unidad_medidas", element: <IndexUM/>},
		{path: "unidad_medida/create", element: <UM/>},
		{path: "unidad_medida/update/:id", element: <UM/>},
		{path: "tipo_productos", element: <IndexTipoProducto/>},
		{path: "tipo_producto/create", element: <TipoProducto/>},
		{path: "tipo_producto/update/:id", element: <TipoProducto/>},
		{path: "productos", element: <IndexProductos/>},
		{path: "producto/create", element: <Producto/>},
		{path: "producto/update/:id", element: <Producto/>}
	],
	cajero: [
		{path: "tipo_tarjetas", element: <IndexTipoTarjeta/>},
		{path: "tipo_tarjeta/create", element: <TipoTarjeta/>},
		{path: "tipo_tarjeta/update/:id", element: <TipoTarjeta/>},
		{path: "tarjetas", element: <IndexTarjeta/>},
		{path: "tarjeta/create", element: <Tarjeta/>},
		{path: "tarjeta/update/:id", element: <Tarjeta/>},
		{path: "tarjeta/update-estado/:id", element: <Tarjeta/>},
		{path: "tarjeta/asociar-persona/:id", element: <AsociarPersonaTarjeta/>},
		{path: "asignar-ip", element: <IndexAsignarIP/>},
		{path: "asignar-ip/:id", element: <AsignarIp/>},
		{path: "configuraccion-acceso", element: <IndexConfiguracion/>},
		{path: "torpedos", element: <IndexTorpedo/>},
		{path: "torpedo/create", element: <Torpedo/>},
		{path: "torpedo/update/:id", element: <Torpedo/>},
		{path: "solapin-perdidos", element: <IndexSolapinPerdido/>},
		{path: "solapin_perdido/create", element: <AddSolapinPerdido/>}
	],
	facturacion: [
		{path: "configuracion-cobro", element: <IndexConfiguracionCobro/>},
		{path: "configuracion-cobro/agregar-valores/:id", element: <AgregarValoresConfigurcionCobro/>}

	],
	distribucion: [
		{path: "categorias", element: <Index/>},
		{path: "categorias/create", element: <Categoria/>},
		{path: "categorias/update/:id", element: <Categoria/>},
		{path: "estructuras", element: <IndexEstructura/>},
		{path: "estructura/create", element: <Estructura/>},
		{path: "estructura/update/:id", element: <Estructura/>},
		{path: "estructura/detail/:id", element: <DetailEstructura/>},
		{path: "estructura/configuracion/:id", element: <AddSettings/>},
		{path: "horarios", element: <IndexHorarios/>},
		{path: "horario/create", element: <Horario/>},
		{path: "horario/update/:id", element: <Horario/>},
		{path: "eventos", element: <IndexEvento/>},
		{path: "evento/create", element: <Evento/>},
		{path: "evento/update/:id", element: <Evento/>},
		{path: "5", element: <Placeholder/>}
	],
	reservacion: [
		{path: "configuracion-reservacion", element: <IndexConfiguracionReservacion/>},
		{path: "configuracion-proceso-reservacion", element: <IndexConfiguracionProcesoReservacion/>},
		{path: "responsable-areas", element: <IndexAsignarResponsablesReservacion/>},
		{path: "responsable-areas/details/:id", element: <Detalles/>},
		{path: "responsable-areas/asignar-responsable/:id", element: <Responsable/>},
		{path: "responsable-areas/asociar-personas/:id", element: <AsociarPersonas/>},
	],
	configuracion: [
		{path: "configuracion-comensales", element: <IndexConfiguracionComensales/>},
		{path: "configurar-comensales/agregar-valores/:id", element: <ConfiguracionComensal/>},
		{path: "configurar-comensales/asociar-personas/:id", element: <AddComensal/>},
		{path: "2", element: <ComensalesActivos/>},
		{path: "tipo_areas", element: <IndexTipoEstrutura/>},
		{path: "tipo_area/create", element: <TipoArea/>},
		{path: "tipo_area/update/:id", element: <TipoArea/>},
		{path: "areas", element: <IndexAreas/>},
		{path: "area/create", element: <Area/>},
		{path: "area/update/:id", element: <Area/>}
	],
	seguridad: [
		{path: "instituciones", element: <IndexInstituciones/>, staffOnly: true},
		{path: "institucion/create", element: <Institucion/>, staffOnly: true},
		{path: "institucion/update/:id", element: <Institucion/>, staffOnly: true},
		{path: "roles", element: <IndexRoles/>, staffOnly: true},
		{path: "roles/create", element: <Roles/>, staffOnly: true},
		{path: "roles/update/:id", element: <Roles/>, staffOnly: true},
		{path: "usuarios", element: <IndexUsuarioes/>},
		{path: "usuario/create", element: <Usuario/>},
		{path: "usuario/update/:id", element: <Usuario/>},
		{path: "entrada-datos", element: <EntradaDatos/>}


	]
};
export default function RutasDinamicas() {
	const user = useSelector(state => state.user);
	return (
		<Routes>
			<Route path="/" element={<Login/>}/>
			<Route element={<Layout/>}>
				<Route path="/configuracion" element={<Outlet/>}>
					{
						// Si el usuario es "is_staff", pintar todas las rutas
						user && user.institucion === null
							? null
							// Si no es "is_staff", pintar sólo rutas de módulos activos
							: user && user.institucion.active_modules.map(modulo =>
							RUTAS_POR_MODULO[modulo].map(ruta => (
								<Route key={ruta.path} path={modulo} element={<Outlet/>}>
									<Route path={ruta.path} element={ruta.element}/>
								</Route>
							))
						)
					}
					{RUTAS_POR_MODULO.seguridad.filter(ruta => !ruta.staffOnly || (ruta.staffOnly && user?.is_staff)).map(ruta => (
						<Route key={ruta.path} path="seguridad" element={<Outlet/>}>
							<Route path={ruta.path} element={ruta.element}/>
						</Route>
					))}
				</Route>
			</Route>
			<Route path="*" element={<NotFound/>}/>
			<Route path="sin-autorizacion" element={<UnAuthorized/>}/>
		</Routes>
	);
}
