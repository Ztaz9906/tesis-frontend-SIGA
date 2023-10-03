import React from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

export default function UMFilters({ onFilter }) {
  const defaultFilters = {
    nombre_unidad_medida: "",
    clasificacion: "",
    activo: "",
  };
  const [filters, setFilters] = React.useState(defaultFilters);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    onFilter(filters);
  };
  const handleResetFilters = () => {
    setFilters(defaultFilters);
    onFilter(defaultFilters);
  };

  return (
    <div className="flex sm:flex-col flex-row gap-1">
      <div className="flex gap-4 w-full">
        <TextField
          fullWidth
          variant="outlined"
          label="Nombre exacto"
          placeholder="Sensible a mayusculas y minusculas"
          name="nombre_unidad_medida"
          value={filters.nombre_unidad_medida}
          onChange={handleInputChange}
        />

        <FormControl fullWidth variant="outlined">
          <InputLabel>Clasificación</InputLabel>
          <Select
            variant="outlined"
            label="clasificacion"
            name="clasificacion"
            value={filters.clasificacion}
            onChange={handleInputChange}
          >
            <MenuItem value="">
              <em>--Seleccione Clasificación--</em>
            </MenuItem>
            <MenuItem value="masa">Masa</MenuItem>
            <MenuItem value="volumen">Volumen</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined">
          <InputLabel>Activo</InputLabel>
          <Select
            variant="outlined"
            label="Activo"
            name="activo"
            value={filters.activo}
            onChange={handleInputChange}
          >
            <MenuItem value="">
              <em>--Activo--</em>
            </MenuItem>
            <MenuItem value="true">Si</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="flex justify-end items-center p-2 gap-1">
        <Button variant="outlined" color="error" onClick={handleResetFilters}>
          Reset
        </Button>
        <Button variant="outlined" color="success" onClick={handleApplyFilters}>
          Aplicar Filtros
        </Button>
      </div>
    </div>
  );
}
