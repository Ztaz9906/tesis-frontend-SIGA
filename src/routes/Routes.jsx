import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { IndexClassPlatos } from '../components/Configuracion/Abastecimiento/Classificacion Platos/IndexClassPlatos';
import { ClassPlatos } from '../components/Configuracion/Abastecimiento/Classificacion Platos/ClassPlatos';
import Login from '../components/Security/Login';
import { IndexUM } from '../components/Configuracion/Abastecimiento/Unidaddes de Medidas/IndexUM';
import { UnidadMedida } from '../components/Configuracion/Abastecimiento/Unidaddes de Medidas/UnidadMedida';
import { IndexTipoProducto } from '../components/Configuracion/Abastecimiento/Tipos de Productos/IndexTipoProduct';
import { TipoProducto } from '../components/Configuracion/Abastecimiento/Tipos de Productos/TipoProducto';
import { IndexProductos } from '../components/Configuracion/Abastecimiento/Productos/IndexProductos';
import { Producto } from '../components/Configuracion/Abastecimiento/Productos/Producto';


const Placeholder = () => <div>Componente en construcción</div>;

const RoutesComponent = () => (
    <Routes>
        
        {/* Abastecimiento */}
        <Route path="/configuracion/clasificacion_platos" element={<IndexClassPlatos />} />
        <Route path="/configuracion/clasificacion_platos/create" element={<ClassPlatos title={'Registrar Clasificación de Platos'} />} />
        <Route path="/configuracion/clasificacion_platos/update/:id" element={<ClassPlatos title={'Actualizar Clasificación de Platos'} />} />
        
        <Route path="/configuracion/unidad_medida" element={<IndexUM />} />
        <Route path="/configuracion/unidad_medida/create" element={<UnidadMedida title={'Registrar Unidad de Medida'} />} />
        <Route path="/configuracion/unidad_medida/update/:id" element={<UnidadMedida title={'Actualizar Unidad de Medida'} />} />

        <Route path="/configuracion/tipo_productos" element={<IndexTipoProducto />} />
        <Route path="/configuracion/tipo_productos/create" element={<TipoProducto title={'Registrar tipo de producto'} />} />
        <Route path="/configuracion/tipo_productos/update/:id" element={<TipoProducto title={'Actualizar tipo de producto'} />} />

        <Route path="/configuracion/productos" element={<IndexProductos />} />
        <Route path="/configuracion/productos/create" element={<Producto title={'Registrar producto'} />} />
        <Route path="/configuracion/productos/update/:id" element={<Producto title={'Actualizar producto'} />} />
        

        {/* Cajero */}
        <Route path="/configuracion/cajero/1" element={<Placeholder />} />
        <Route path="/configuracion/cajero/2" element={<Placeholder />} />
        <Route path="/configuracion/cajero/3" element={<Placeholder />} />
        <Route path="/configuracion/cajero/4" element={<Placeholder />} />
        <Route path="/configuracion/cajero/5" element={<Placeholder />} />
        <Route path="/configuracion/cajero/6" element={<Placeholder />} />

        {/* Facturacion */}
        <Route path="/configuracion/facturacion/1" element={<Placeholder />} />

        {/* Distribucion */}
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

