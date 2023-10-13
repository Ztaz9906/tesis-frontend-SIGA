import useUser from "@/hooks/useUser.jsx";
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
		{path: "1", element: <Placeholder/>}
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
		{path: "3", element: <Placeholder/>}
	],
	configuracion: [
		{path: "1", element: <Placeholder/>},
		{path: "2", element: <Placeholder/>},
		{path: "4", element: <Placeholder/>}
	],
	seguridad: [
		{path: "instituciones", element: <IndexInstituciones/>},
		{path: "institucion/create", element: <Institucion/>},
		{path: "institucion/update/:id", element: <Institucion/>},
		{path: "roles", element: <IndexRoles/>},
		{path: "roles/create", element: <Roles/>},
		{path: "roles/update/:id", element: <Roles/>},
		{path: "usuarios", element: <IndexUsuarioes/>},
		{path: "usuario/create", element: <Usuario/>},
		{path: "usuario/update/:id", element: <Usuario/>}

	]
};
export default function RutasDinamicas() {
	const [user] = useUser();

	return (
		<Routes>
			<Route path="/" element={<Login/>}/>
			<Route element={<Layout/>}>
				<Route path="/configuracion" element={<Outlet/>}>
					{
						// Si el usuario es "is_staff", pintar todas las rutas
						user && user.is_staff
							? Object.keys(RUTAS_POR_MODULO).flatMap(modulo =>
								RUTAS_POR_MODULO[modulo].map(ruta => (
									<Route key={ruta.path} path={modulo} element={<Outlet/>}>
										<Route path={ruta.path} element={ruta.element}/>
									</Route>
								))
							)
							// Si no es "is_staff", pintar sólo rutas de módulos activos
							: user && user.institucion.active_modules.map(modulo =>
							RUTAS_POR_MODULO[modulo].map(ruta => (
								<Route key={ruta.path} path={modulo} element={<Outlet/>}>
									<Route path={ruta.path} element={ruta.element}/>
								</Route>
							))
						)
					}
					{RUTAS_POR_MODULO.seguridad.map(ruta => (
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
