import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";

function GenericFilter({ fieldsConfig, onFilter }) {
  const defaultFilters = fieldsConfig.reduce(
    (acc, curr) => ({ ...acc, [curr.name]: curr.defaultValue || "" }),
    {}
  );
  const [filters, setFilters] = React.useState(defaultFilters);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => onFilter(filters);
  const handleResetFilters = () => {
    setFilters(defaultFilters);
    onFilter(defaultFilters);
  };
  const chunkedFieldsConfig = [];
  let temp = [];

  fieldsConfig.forEach((field, index) => {
    temp.push(field);
    if ((index + 1) % 3 === 0 || index === fieldsConfig.length - 1) {
      chunkedFieldsConfig.push(temp);
      temp = [];
    }
  });

  return (
    <div className="flex sm:flex-col flex-wrap gap-1">
      {chunkedFieldsConfig.map((rowFields, rowIndex) => (
        <div key={rowIndex} className="flex w-full gap-4">
          {rowFields.map((field) => {
            if (field.type === "text") {
              return (
                <TextField
                  key={field.name}
                  fullWidth
                  variant="outlined"
                  label={field.label}
                  placeholder={field.placeholder}
                  name={field.name}
                  value={filters[field.name]}
                  onChange={handleInputChange}
                />
              );
            } else if (field.type === "select") {
              return (
                <FormControl key={field.name} fullWidth variant="outlined">
                  <InputLabel>{field.label}</InputLabel>
                  <Select
                    variant="outlined"
                    label={field.label}
                    name={field.name}
                    value={filters[field.name]}
                    onChange={handleInputChange}
                  >
                    {field.options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            } else {
              return null;
            }
          })}
        </div>
      ))}
      <div className="flex justify-end items-center p-2 gap-1 mt-4">
        <Button variant="outlined" color="error" onClick={handleResetFilters}>
          Reiniciar
        </Button>
        <Button variant="outlined" color="success" onClick={handleApplyFilters}>
          Aplicar Filtros
        </Button>
      </div>
    </div>
  );
}

export default GenericFilter;
