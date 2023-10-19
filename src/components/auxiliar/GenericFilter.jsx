import {Button, FormControl, InputLabel, MenuItem, Select, TextField,} from "@mui/material";
import React from "react";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
	placeholder: {
		fontSize: "0.8rem",
	},
}));

function GenericFilter({fieldsConfig, onFilter}) {
	const classes = useStyles();
	const defaultFilters = fieldsConfig.reduce(
		(acc, curr) => ({...acc, [curr.name]: curr.defaultValue || ""}),
		{}
	);
	const [filters, setFilters] = React.useState(defaultFilters);

	const handleInputChange = (e) => {
		const {name, value} = e.target;
		setFilters((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleApplyFilters = () => {
		const validFilters = Object.keys(filters).reduce((acc, key) => {
			if (filters[key] !== "") {
				acc[key] = filters[key];
			}
			return acc;
		}, {});

		onFilter(validFilters);
	};

	const handleResetFilters = () => {
		setFilters(defaultFilters);
		onFilter({});
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
		<div className="flex sm:flex-col flex-wrap gap-2">
			{chunkedFieldsConfig.map((rowFields, rowIndex) => (
				<div key={rowIndex} className="flex w-full gap-5">
					{rowFields.map((field) => {
						if (field.type === "text") {
							return (
								<TextField
									key={field.name}
									fullWidth
									size="small"
									variant="outlined"
									label={field.label}
									placeholder={field.placeholder}
									name={field.name}
									value={filters[field.name]}
									onChange={handleInputChange}
									InputProps={{
										classes: {
											input: classes.placeholder
										}
									}}
								/>
							);
						} else if (field.type === "select") {
							return (
								<FormControl key={field.name} fullWidth variant="outlined" size="small">
									<InputLabel>{field.label}</InputLabel>
									<Select
										variant="outlined"
										size="small"
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
				<Button variant="outlined" color="error" size="small" onClick={handleResetFilters}> {/* Aquí */}
					Reiniciar
				</Button>
				<Button variant="outlined" color="success" size="small" onClick={handleApplyFilters}> {/* Aquí */}
					Aplicar Filtros
				</Button>
			</div>

		</div>
	);


}

export default GenericFilter;
