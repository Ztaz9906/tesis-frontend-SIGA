import * as React from "react";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import {Button, Input, styled, Tooltip, Typography} from "@mui/material";

function not(a, b) {
	if (!Array.isArray(a) || !Array.isArray(b)) {
		return a;
	}

	const seen = new Set(b.map((x) => x.id));  // Usar 'id' en lugar de 'name'
	return a.filter((valueA) => !seen.has(valueA.id));
}

function intersection(a, b) {
	return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
	return [...a, ...not(b, a)];
}

const GroupHeader = styled("div")(({theme}) => ({
	position: "sticky",
	top: "-8px",
	padding: "4px 10px",
	color: theme.palette.dark.focus,
}));

const GroupItems = styled("ul")({
	padding: 0,
});

const styles = {
	height: 230,
	bgcolor: "background.paper",
	overflow: "auto",
	scrollbarColor: "#6b6b6b #2b2b2b",
	"&::-webkit-scrollbar, & *::-webkit-scrollbar": {
		width: 5,
	},
	"&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
		backgroundColor: "#aaa",
		borderRadius: 4,
		transition: "background-color 0.2s ease-in-out",
	},
	"&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
		backgroundColor: "#888",
	},
	"&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
		backgroundColor: "#2b2b2b",
	},
};

const translatePermission = (permission) => {
	switch (permission) {
		case "Can add":
			return "puede añadir";
		case "Can change":
			return "puede editar";
		case "Can view":
			return "puede ver";
		case "Can delete":
			return "puede borrar";
		default:
			return permission;
	}
};

const TransferList = ({data, generalTitle, setSubmittingData, rightData, edit = false, pagination}) => {
	const [checked, setChecked] = React.useState([]);
	const [left, setLeft] = React.useState(not(data, rightData) ?? []);
	const [right, setRight] = React.useState(rightData ?? []);
	const [search, setSearch] = React.useState("");
	
	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);

	React.useEffect(() => {
		setSubmittingData(right);
	}, [right]);

	React.useEffect(() => {
		setLeft(not(data, rightData));
	}, [data, rightData]);

	React.useEffect(() => {
		if (edit) {
			setRight(rightData ?? []);
		}
	}, [rightData, edit]);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const moveItems = (from, to, direction) => {
		if (direction === "right") {
			setRight([...right, ...from]);
			setLeft(not(left, from));
		} else {
			setLeft([...left, ...from]);
			setRight(not(right, from));
		}
		setChecked(not(checked, from));
	};


	const handleCheckedRight = () => moveItems(leftChecked, rightChecked, "right");
	const handleCheckedLeft = () => moveItems(rightChecked, leftChecked, "left");

	const numberOfChecked = (items) => intersection(checked, items).length;

	const handleToggleAll = (items) => () => {
		if (numberOfChecked(items) === items?.length) {
			setChecked(not(checked, items));
		} else {
			setChecked(union(checked, items));
		}
	};

	const filterItems = (items) => {
		if (search.trim() === "") return items;

		const regex = new RegExp(search.trim(), "i");
		return items.filter(obj => regex.test(Object.values(obj).join(" ")));
	};

	const customList = (title, items = [], pagination) => {
		const filteredItems = filterItems(items);
		return (
			<Card sx={{minWidth: 300}}>
				<Tooltip placement="top" title="Puede buscar en cualquier campo aunque no se muestre">
					<Input
						id={`buscar-local ${title}`}
						variant="outlined"
						type="text"
						label="Buscar"
						placeholder="Buscar"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						sx={{mx: 3, my: 2}}
					/>
				</Tooltip>
				<CardHeader
					sx={{px: 2, py: 1}}
					avatar={
						<Checkbox
							onClick={handleToggleAll(items)}
							checked={numberOfChecked(items) === items?.length && items?.length !== 0}
							indeterminate={numberOfChecked(items) !== items?.length && numberOfChecked(items) !== 0}
							disabled={items?.length === 0}
							inputProps={{"aria-label": "todos los elementos fueron seleccionados"}}
						/>
					}
					title={title}
					subheader={`${numberOfChecked(items)}/${items?.length} seleccionados`}
				/>
				<Divider/>
				<List sx={styles} dense component="div" role="list">
					{Array.isArray(filteredItems) &&
						filteredItems.map((value) => {
							const labelId = `transfer-list-all-item-${value}-label`;
							return (
								<ListItem key={value.id} role="listitem" onClick={handleToggle(value)}>
									<ListItemIcon sx={{minWidth: "auto"}}>
										<Checkbox
											checked={checked.indexOf(value) !== -1}
											tabIndex={-1}
											disableRipple
											inputProps={{"aria-labelledby": labelId}}
											sx={{padding: "3px 9px"}}
										/>
									</ListItemIcon>
									<ListItemText id={labelId} primary={value.name}/>
								</ListItem>
							);
						})}
					<ListItem/>
				</List>
				{pagination && pagination.showLoadMoreButton && (
					<Button onClick={pagination.loadMore} variant="gradient" color="light">
						Cargar más
					</Button>
				)}
			</Card>
		);
	};

	return (
		<div className="flex flex-col items-center mt-8 mb-20 space-y-6">
			<div className="mb-8">
				<Typography variant="h5" fontWeight="bold">
					{generalTitle ?? "Menú"}
				</Typography>
			</div>
			<div className="flex items-center w-full space-x-6">
				<div className="flex-grow">
					{customList("Opciones", left, pagination)}
				</div>
				<div className="flex flex-col space-y-2">
					<Button variant="gradient" color="dark" size="small" onClick={handleCheckedRight}
					        disabled={leftChecked.length === 0} aria-label="mover a la derecha">
						&gt;
					</Button>
					<Button variant="gradient" color="dark" size="small" onClick={handleCheckedLeft}
					        disabled={rightChecked.length === 0} aria-label="mover a la izquierda">
						&lt;
					</Button>
				</div>
				<div className="flex-grow">{customList("A asignar", right)}</div>
			</div>
		</div>
	);
};

export default TransferList;
export {GroupHeader, GroupItems};
