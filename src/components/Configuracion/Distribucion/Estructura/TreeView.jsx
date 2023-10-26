import * as React from "react";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {animated, useSpring} from "@react-spring/web";
import SvgIcon from "@mui/material/SvgIcon";
import Collapse from "@mui/material/Collapse";
import {styled} from "@mui/material/styles";
import {TreeView} from "@mui/x-tree-view/TreeView";
import {TreeItem, treeItemClasses} from "@mui/x-tree-view/TreeItem";
import {Edit2, ListIcon, Settings, Trash} from "lucide-react";
import Delete from "../../../auxiliar/delete";
import {useDeleteEstructuraMutation} from "./service/estructura.service";
import {useRedirectForm} from "@/hooks/useRedirectForm.jsx";
import {Button} from "../../../ui/button";
import {useNavigate} from "react-router-dom";

function ArrowIcon(props) {
	const {open, ...otherProps} = props;
	const [rotate, setRotate] = useState(open ? "90deg" : "0deg");

	useEffect(() => {
		setRotate(open ? "270deg" : "0deg");
	}, [open]);

	return (
		<SvgIcon {...otherProps} style={{transform: `rotate(${rotate})`}}>
			<path d="M7 10l5 5 5-5z"/>
		</SvgIcon>
	);
}

function TransitionComponent(props) {
	const style = useSpring({
		to: {
			opacity: props.in ? 1 : 0,
			transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
		},
	});

	return (
		<animated.div style={style}>
			<Collapse {...props} />
		</animated.div>
	);
}

const CustomTreeItem = React.forwardRef((props, ref) => (
	<TreeItem {...props} TransitionComponent={TransitionComponent} ref={ref}/>
));

const StyledTreeItem = styled(CustomTreeItem)(({theme}) => ({
	[`& .${treeItemClasses.iconContainer}`]: {
		"& .close": {
			opacity: 0.3,
		},
	},
	[`& .${treeItemClasses.group}`]: {
		marginLeft: 7,
		paddingLeft: 7,
		borderLeft: "none",
	},
}));

const RenderTreeView = ({data}) => {
	const navigate = useNavigate();
	const [
		deleteEstructura,
		{isError: isErrorD, isLoading: isLoadingD, isSuccess: isSuccessD, error: errorD},
	] = useDeleteEstructuraMutation();

	useRedirectForm(
		isLoadingD,
		isSuccessD,
		isErrorD,
		errorD,
		"Estructura eliminada"
	);
	const renderTreeItems = (items) => {
		return items.map((item) => (
			<StyledTreeItem
				key={`item-${item.id}`}
				nodeId={String(item.id)}
				label={item.name}
			>
				<div className="border p-4 bg-gray-100 rounded-md">
					<div className="flex justify-between text-center">
						<div className="flex gap-4">
							<div className="flex-grow">
								<h4 className="text-gray-500 mb-1">Capacidad</h4>
								<p>{item.capacidad}</p>
							</div>
							<div className="flex-grow">
								<h4 className="text-gray-500 mb-1">Iniciales</h4>
								<p>{item.initials}</p>
							</div>
							<div className="flex-grow">
								<h4 className="text-gray-500 mb-1">Categoría</h4>
								<p>{item.category.name}</p>
							</div>
							<div className="flex-grow">
								<h4 className="text-gray-500 mb-1">Activo</h4>
								<p>{item.active ? "SI" : "NO"}</p>
							</div>
						</div>
						<div className="flex items-end">
							<Button
								variant={"ghost"}
								size={"icon"}
								className={`items-end`}
								onClick={() =>
									navigate(
										`/configuracion/distribucion/estructura/detail/${item.id}`
									)
								}
							>
								<ListIcon size={15}/>
							</Button>

							{item.estructura_parent === null && (
								<Button
									variant={"ghost"}
									size={"icon"}
									className={`items-end`}
									onClick={() =>
										navigate(
											`/configuracion/distribucion/estructura/configuracion/${item.id}`
										)
									}
								>
									<Settings size={15}/>
								</Button>
							)}
							<Button
								variant={"ghost"}
								size={"icon"}
								className={`items-end`}
								onClick={() =>
									navigate(
										`/configuracion/distribucion/estructura/update/${item.id}`
									)
								}
							>
								<Edit2 size={15}/>
							</Button>

							<Delete
								title={`Borrar ${item.name}`}
								message="¿Está seguro que desea eliminar esta estructura?"
								action={() => deleteEstructura(item.id)}
							>
								<Button variant={"ghost"} size={"icon"} className={`items-end`}>
									<Trash size={15}/>
								</Button>
							</Delete>
						</div>
					</div>
				</div>
				{item.children &&
					item.children.length > 0 &&
					renderTreeItems(item.children)}
			</StyledTreeItem>
		));
	};

	return (
		<Box sx={{minHeight: "100vh", flexGrow: 1, maxWidth: "100vw"}}>
			<TreeView
				aria-label="customized"
				defaultCollapseIcon={<ArrowIcon open={false}/>}
				defaultExpandIcon={<ArrowIcon open={true}/>}

				sx={{overflowX: "hidden"}}
			>
				{renderTreeItems(data)}
			</TreeView>
		</Box>
	);
};
export default RenderTreeView;
