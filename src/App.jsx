import {Outlet, Route, Routes} from "react-router-dom";
import Layout from "./components/layout";
import IndexConfiguracion from "./components/Configuracion/Cajero/Configuraciones/IndexConfiguracion";
import NewTorpedo from "./components/Configuracion/Cajero/Torpedos/new-asgnatura/new.torpedo.jsx";
import Torpedo from "./components/Configuracion/Cajero/Torpedos/new-asgnatura/new.torpedo.jsx";
import Index from "./components/Configuracion/Distribucion/Categoria";
import Categoria from "./components/Configuracion/Distribucion/Categoria/new-Categoria/new.categoria";
import IndexEstructura from "./components/Configuracion/Distribucion/Estructura";
import Estructura from "./components/Configuracion/Distribucion/Estructura/new-estructura/new.estructura";
import DetailEstructura from "./components/Configuracion/Distribucion/Estructura/new-estructura/detail.estructura";
import AddSettings from "./components/Configuracion/Distribucion/Estructura/new-estructura/settings";
import IndexHorarios from "./components/Configuracion/Distribucion/Horario";
import Login from "./components/Security/Login";
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

const Placeholder = () => <div>Componente en construcción</div>;

function App() {
	return (
		<Routes>
			<Route path="/" element={<Login/>}/>
			<Route element={<Layout/>}>
				<Route path="/configuracion" element={<Outlet/>}>
					{/* Abastecimiento */}
					<Route path="abastecimiento" element={<Outlet/>}>
						<Route
							path="clasificacion_platos"
							element={<IndexClassPlatos/>}
						/>
						<Route
							path="clasificacion_platos/create"
							element={<ClassPlatos/>}
						/>
						<Route
							path="clasificacion_platos/update/:id"
							element={<ClassPlatos/>}
						/>
						<Route path="unidad_medidas" element={<IndexUM/>}/>
						<Route path="unidad_medida/create" element={<UM/>}/>
						<Route path="unidad_medida/update/:id" element={<UM/>}/>
						<Route path="tipo_productos" element={<IndexTipoProducto/>}/>
						<Route path="tipo_producto/create" element={<TipoProducto/>}/>
						<Route
							path="tipo_producto/update/:id"
							element={<TipoProducto/>}
						/>
						<Route path="productos" element={<IndexProductos/>}/>
						<Route path="producto/create" element={<Producto/>}/>
						<Route path="producto/update/:id" element={<Producto/>}/>
					</Route>
					{/* Cajero */}
					<Route path="cajero" element={<Outlet/>}>

						<Route path="tipo_tarjetas" element={<IndexTipoTarjeta/>}/>
						<Route path="tipo_tarjeta/create" element={<TipoTarjeta/>}/>
						<Route path="tipo_tarjeta/update/:id" element={<TipoTarjeta/>}/>

						<Route path="tarjetas" element={<IndexTarjeta/>}/>
						<Route
							path="tarjeta/create"
							element={<Tarjeta/>}
						/>
						<Route
							path="tarjeta/update/:id"
							element={<Tarjeta/>}
						/>
						<Route
							path="tarjeta/update-estado/:id"
							element={
								<Tarjeta/>
							}
						/>
						<Route path="asignar-ip" element={<IndexAsignarIP/>}/>
						<Route path="asignar-ip/:id" element={<AsignarIp/>}/>
						<Route path="configuraccion-acceso" element={<IndexConfiguracion/>}/>
						<Route path="torpedos" element={<IndexTorpedo/>}/>
						<Route path="torpedo/create" element={<Torpedo/>}/>
						<Route path="torpedo/update/:id" element={<Torpedo/>}/>
						<Route path="solapin-perdidos" element={<IndexSolapinPerdido/>}/>
						<Route
							path="solapin_perdido/create"
							element={<AddSolapinPerdido/>}
						/>
					</Route>
					{/* Seguridad */}
					<Route path="seguridad" element={<Outlet/>}>
						<Route path="roles" element={<IndexRoles/>}/>
						<Route path="roles/create" element={<Roles/>}/>
						<Route path="roles/update/:id" element={<Roles/>}/>
					</Route>
					{/* Reservacion */}
					<Route path="reservacion" element={<Outlet/>}>
						<Route path="configuracion-acceso" element={<IndexConfiguracionReservacion/>}/>
					</Route>
				</Route>

				{/* Facturacion */}
				<Route path="/configuracion/facturacion/1" element={<NewTorpedo/>}/>
				{/* Distribucion */}
				<Route
					path="/configuracion/distribucion/categorias"
					element={<Index/>}
				/>
				<Route
					path="/configuracion/distribucion/categorias/create"
					element={<Categoria/>}
				/>
				<Route
					path="/configuracion/distribucion/categorias/update/:id"
					element={<Categoria/>}
				/>
				<Route
					path="/configuracion/distribucion/estructuras"
					element={<IndexEstructura/>}
				/>
				<Route
					path="/configuracion/distribucion/estructura/create"
					element={<Estructura/>}
				/>
				<Route
					path="/configuracion/distribucion/estructura/update/:id"
					element={<Estructura/>}
				/>
				<Route
					path="/configuracion/distribucion/estructura/detail/:id"
					element={<DetailEstructura/>}
				/>
				<Route
					path="/configuracion/distribucion/estructura/configuracion/:id"
					element={<AddSettings/>}
				/>
				<Route
					path="/configuracion/distribucion/horarios"
					element={<IndexHorarios/>}
				/>
				<Route
					path="/configuracion/distribucion/horario/create"
					element={<Horario/>}
				/>
				<Route
					path="/configuracion/distribucion/horario/update/:id"
					element={<Horario/>}
				/>
				<Route
					path="/configuracion/distribucion/1"
					element={<Placeholder/>}
				/>
				<Route
					path="/configuracion/distribucion/2"
					element={<Placeholder/>}
				/>
				<Route
					path="/configuracion/distribucion/3"
					element={<Placeholder/>}
				/>
				<Route
					path="/configuracion/distribucion/4"
					element={<Placeholder/>}
				/>
				<Route
					path="/configuracion/distribucion/5"
					element={<Placeholder/>}
				/>
				{/* Reservacion */}
				<Route
					path="/configuracion/reservacion/1"
					element={<Placeholder/>}
				/>
				<Route
					path="/configuracion/reservacion/2"
					element={<Placeholder/>}
				/>
				{/* configuracion */}
				<Route
					path="/configuracion/configuracion/1"
					element={<Placeholder/>}
				/>
				<Route
					path="/configuracion/configuracion/2"
					element={<Placeholder/>}
				/>
				<Route
					path="/configuracion/configuracion/3"
					element={<Placeholder/>}
				/>
				<Route
					path="/configuracion/configuracion/4"
					element={<Placeholder/>}
				/>
				<Route
					path="/configuracion/seguridad/instituciones"
					element={<IndexInstituciones/>}
				/>
				<Route
					path="/configuracion/seguridad/institucion/create"
					element={<Institucion/>}
				/>
				<Route
					path="/configuracion/seguridad/institucion/update/:id"
					element={<Institucion/>}
				/>
				<Route path="/configuracion/seguridad/2" element={<Placeholder/>}/>
				<Route path="/configuracion/seguridad/3" element={<Placeholder/>}/>
				<Route path="/configuracion/seguridad/4" element={<Placeholder/>}/>
			</Route>
		</Routes>
	);
}

export default App;
