import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { IndexClassPlatos } from "../components/Configuracion/Abastecimiento/Classificacion Platos/IndexClassPlatos";
import { ClassPlatos } from "../components/Configuracion/Abastecimiento/Classificacion Platos/ClassPlatos";
import { IndexUM } from "../components/Configuracion/Abastecimiento/Unidaddes de Medidas/IndexUM";
import { UnidadMedida } from "../components/Configuracion/Abastecimiento/Unidaddes de Medidas/UnidadMedida";
import { IndexTipoProducto } from "../components/Configuracion/Abastecimiento/Tipos de Productos/IndexTipoProduct";
import { TipoProducto } from "../components/Configuracion/Abastecimiento/Tipos de Productos/TipoProducto";
import { IndexProductos } from "../components/Configuracion/Abastecimiento/Productos/IndexProductos";
import { Producto } from "../components/Configuracion/Abastecimiento/Productos/Producto";
import { IndexTipoTarjeta } from "../components/Configuracion/Cajero/TipoTarjetas/indexTipoTarjeta";
import { TipoTarjeta } from "../components/Configuracion/Cajero/TipoTarjetas/TipoTarjeta";
import { IndexTarjeta } from "../components/Configuracion/Cajero/Tarjetas/IndexTarjeta";
import { Tarjeta } from "../components/Configuracion/Cajero/Tarjetas/Tarjeta";
import { TarjetaEdit } from "../components/Configuracion/Cajero/Tarjetas/TarjetaEdit";
import { TarjetaEditEstado } from "../components/Configuracion/Cajero/Tarjetas/TarjetaEditEstado";
import { IndexAsignarIP } from "../components/Configuracion/Cajero/AsignarIP/IndexAsignarIP";
import { AsignarIP } from "../components/Configuracion/Cajero/AsignarIP/AsignarIP";
import IndexConfiguracion from "../components/Configuracion/Cajero/Configuraciones/IndexConfiguracion";
import IndexTorpedo from "../components/Configuracion/Cajero/Torpedos/indexTorpedo";
import Torpedo from "../components/Configuracion/Cajero/Torpedos/Torpedo";
import IndexSolapinPerdido from "../components/Configuracion/Cajero/SolapinPerdido/IndexSolapinPerdido";
import SolapinPerdido from "../components/Configuracion/Cajero/SolapinPerdido/SolapinPerdido";
import NewTorpedo from "../components/Configuracion/Cajero/Torpedos/new-asgnatura/new.asignatura";
import Index from "../components/Configuracion/Distribucion/Categoria";
import Categoria from "../components/Configuracion/Distribucion/Categoria/new-Categoria/new.categoria";
import IndexEstructura from "../components/Configuracion/Distribucion/Estructura";
import Estructura from "../components/Configuracion/Distribucion/Estructura/new-estructura/new.estructura";
import DetailEstructura from "../components/Configuracion/Distribucion/Estructura/new-estructura/detail.estructura";
import AddSettings from "../components/Configuracion/Distribucion/Estructura/new-estructura/settings";
import IndexHorarios from "../components/Configuracion/Distribucion/Horario";

const Placeholder = () => <div>Componente en construcción</div>;

const RoutesComponent = () => (
  <Routes>
    {/* Abastecimiento */}
    <Route
      path="/configuracion/clasificacion_platos"
      element={<IndexClassPlatos />}
    />
    <Route
      path="/configuracion/clasificacion_platos/create"
      element={<ClassPlatos title={"Registrar Clasificación de Platos"} />}
    />
    <Route
      path="/configuracion/clasificacion_platos/update/:id"
      element={<ClassPlatos title={"Actualizar Clasificación de Platos"} />}
    />
    <Route path="/configuracion/unidad_medida" element={<IndexUM />} />
    <Route
      path="/configuracion/unidad_medida/create"
      element={<UnidadMedida title={"Registrar Unidad de Medida"} />}
    />
    <Route
      path="/configuracion/unidad_medida/update/:id"
      element={<UnidadMedida title={"Actualizar Unidad de Medida"} />}
    />
    <Route
      path="/configuracion/tipo_productos"
      element={<IndexTipoProducto />}
    />
    <Route
      path="/configuracion/tipo_productos/create"
      element={<TipoProducto title={"Registrar tipo de producto"} />}
    />
    <Route
      path="/configuracion/tipo_productos/update/:id"
      element={<TipoProducto title={"Actualizar tipo de producto"} />}
    />
    <Route path="/configuracion/productos" element={<IndexProductos />} />
    <Route
      path="/configuracion/productos/create"
      element={<Producto title={"Registrar producto"} />}
    />
    <Route
      path="/configuracion/productos/update/:id"
      element={<Producto title={"Actualizar producto"} />}
    />
    {/* Cajero */}
    <Route
      path="/configuracion/cajero/tipo_tarjeta"
      element={<IndexTipoTarjeta />}
    />
    <Route
      path="/configuracion/cajero/tipo_tarjeta/create"
      element={<TipoTarjeta title={"Registrar Tipo de Tarjeta"} />}
    />
    <Route
      path="/configuracion/cajero/tipo_tarjeta/update/:id"
      element={<TipoTarjeta title={"Actualizar Tipo de Tarjeta"} />}
    />
    <Route path="/configuracion/cajero/tarjetas" element={<IndexTarjeta />} />
    <Route
      path="/configuracion/cajero/tarjetas/create"
      element={<Tarjeta title={"Registrar Tarjeta"} />}
    />
    <Route
      path="/configuracion/cajero/tarjetas/update/:id"
      element={<TarjetaEdit title={"Modificar Tarjeta"} />}
    />
    <Route
      path="/configuracion/cajero/tarjetas/update-estado/:id"
      element={<TarjetaEditEstado title={"Modificar Estado de Tarjeta"} />}
    />
    <Route
      path="/configuracion/cajero/asignar-ip"
      element={<IndexAsignarIP />}
    />
    <Route
      path="/configuracion/cajero/asignar-ip/asignar/:id"
      element={<AsignarIP />}
    />
    <Route path="/configuracion/cajero/4" element={<IndexConfiguracion />} />
    <Route path="/configuracion/cajero/5" element={<IndexTorpedo />} />
    <Route path="/configuracion/cajero/torpedo/create" element={<Torpedo />} />
    <Route path="/configuracion/cajero/6" element={<IndexSolapinPerdido />} />
    <Route
      path="/configuracion/cajero/solapin-perdido/asociar"
      element={<SolapinPerdido />}
    />
    {/* Facturacion */}
    <Route path="/configuracion/facturacion/1" element={<NewTorpedo />} />
    {/* Distribucion */}
    <Route path="/configuracion/distribucion/categorias" element={<Index />} />
    <Route
      path="/configuracion/distribucion/categorias/create"
      element={<Categoria />}
    />
    <Route
      path="/configuracion/distribucion/categorias/update/:id"
      element={<Categoria />}
    />
    <Route
      path="/configuracion/distribucion/estructuras"
      element={<IndexEstructura />}
    />
    <Route
      path="/configuracion/distribucion/estructura/create"
      element={<Estructura />}
    />
    <Route
      path="/configuracion/distribucion/estructura/update/:id"
      element={<Estructura />}
    />
    <Route
      path="/configuracion/distribucion/estructura/detail/:id"
      element={<DetailEstructura />}
    />
    <Route
      path="/configuracion/distribucion/estructura/configuracion/:id"
      element={<AddSettings />}
    />
    <Route
      path="/configuracion/distribucion/horarios"
      element={<IndexHorarios />}
    />
    <Route path="/configuracion/distribucion/1" element={<Placeholder />} />
    <Route path="/configuracion/distribucion/2" element={<Placeholder />} />
    <Route path="/configuracion/distribucion/3" element={<Placeholder />} />
    <Route path="/configuracion/distribucion/4" element={<Placeholder />} />
    <Route path="/configuracion/distribucion/5" element={<Placeholder />} />
    {/* Reservacion */}
    <Route path="/configuracion/reservacion/1" element={<Placeholder />} />
    <Route path="/configuracion/reservacion/2" element={<Placeholder />} />
    {/* configuracion */}
    <Route path="/configuracion/configuracion/1" element={<Placeholder />} />
    <Route path="/configuracion/configuracion/2" element={<Placeholder />} />
    <Route path="/configuracion/configuracion/3" element={<Placeholder />} />
    <Route path="/configuracion/configuracion/4" element={<Placeholder />} />
  </Routes>
);

export default RoutesComponent;
