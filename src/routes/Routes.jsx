import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { IndexClassPlatos } from '../components/Configuracion/Abastecimiento/Classificacion Platos/IndexClassPlatos';

const Placeholder = () => <div>Componente en construcción</div>;

const RoutesComponent = () => (
    <Routes>
        {/* Abastecimiento */}
        <Route path="/Configuracio/clasificacion_platos" element={<IndexClassPlatos />} />
        <Route path="/Configuracio/unidad_medida" element={<Placeholder />} />
        <Route path="/Configuracio/tipo_productos" element={<Placeholder />} />
        <Route path="/Configuracio/productos" element={<Placeholder />} />

        {/* Cajero */}
        <Route path="/Configuracio/cajero/1" element={<Placeholder />} />
        <Route path="/Configuracio/cajero/2" element={<Placeholder />} />
        <Route path="/Configuracio/cajero/3" element={<Placeholder />} />
        <Route path="/Configuracio/cajero/4" element={<Placeholder />} />
        <Route path="/Configuracio/cajero/5" element={<Placeholder />} />
        <Route path="/Configuracio/cajero/6" element={<Placeholder />} />

        {/* Facturacion */}
        <Route path="/Configuracio/facturacion/1" element={<Placeholder />} />

        {/* Distribucion */}
        <Route path="/Configuracio/distribucion/1" element={<Placeholder />} />
        <Route path="/Configuracio/distribucion/2" element={<Placeholder />} />
        <Route path="/Configuracio/distribucion/3" element={<Placeholder />} />
        <Route path="/Configuracio/distribucion/4" element={<Placeholder />} />
        <Route path="/Configuracio/distribucion/5" element={<Placeholder />} />

        {/* Reservacion */}
        <Route path="/Configuracio/reservacion/1" element={<Placeholder />} />
        <Route path="/Configuracio/reservacion/2" element={<Placeholder />} />

        {/* Configuracion */}
        <Route path="/Configuracio/configuracion/1" element={<Placeholder />} />
        <Route path="/Configuracio/configuracion/2" element={<Placeholder />} />
        <Route path="/Configuracio/configuracion/3" element={<Placeholder />} />
        <Route path="/Configuracio/configuracion/4" element={<Placeholder />} />

    </Routes>
);

export default RoutesComponent;

