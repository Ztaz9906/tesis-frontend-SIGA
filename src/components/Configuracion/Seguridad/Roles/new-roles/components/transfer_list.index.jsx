import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import { Button, Input, Tooltip, Typography, styled } from "@mui/material";

function not(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    return a;
  }

  const seen = new Set(b.map((x) => x.name));
  return a.filter((valueA) => !seen.has(valueA.name));
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.dark.focus,
}));

const GroupItems = styled("ul")({
  padding: 0,
});

/**
 * Componente TransferList generico para la seleccion de datos segun tablas relacionadas.
 *
 * @prop {array} data Arreglo de datos a mostrar en la lista izquierda.
 * @prop {array} rightData Arreglo de datos a mostrar en la lista derecha.
 * @prop {string} generalTitle Titulo amostrar encima de la tabla en el Typography.
 * @prop {function} setSubmittingData Funcion de control de estado del componente padre para enviar los datos seleccionados.
 **/

const styles = {
  height: 230,
  bgcolor: "background.paper",
  overflow: "auto",
  scrollbarColor: "#6b6b6b #2b2b2b",
  "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
    borderRadius: "1rem",
  },
  "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
    borderRadius: 8,
    backgroundColor: "gray",
    minHeight: 24,
    border: "2px solid #2b2b2b",
  },
  "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
    backgroundColor: "#959595",
  },
  "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
    backgroundColor: "#959595",
  },
  "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#959595",
  },
  "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
    backgroundColor: "#2b2b2b",
  },
};

const TransferList = ({
  data,
  generalTitle,
  setSubmittingData,
  rightData,
  edit = false,
  pagination,
}) => {
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(not(data, rightData) ?? []);
  const [right, setRight] = React.useState(rightData ?? []);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  console.log(right);
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
    if (edit) {
      if (checked.indexOf(value) === -1) {
        setChecked([value]);
      } else {
        setChecked([]);
      }
    } else {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      setChecked(newChecked);
    }
  };

  const handleCheckedRight = () => {
    if (edit) {
      if (leftChecked.length === 1 && right.length === 0) {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
      }
    } else {
      setRight(right.concat(leftChecked));
      setLeft(not(left, leftChecked));
      setChecked(not(checked, leftChecked));
    }
  };

  const handleCheckedLeft = () => {
    if (edit) {
      if (rightChecked.length === 1) {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
      }
    } else {
      setLeft(left.concat(rightChecked));
      setRight(not(right, rightChecked));
      setChecked(not(checked, rightChecked));
    }
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items?.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const reduceName = (name) => {
    if (name.length > 52) {
      return `${name.slice(0, 50)}...`;
    }
    return name;
  };

  const customList = (title, items = [], pagination) => {
    const [search, setSearch] = React.useState("");

    function handleChangeSearch(e) {
      setSearch(e.target.value);
    }
    const resultados =
      search.trim() === ""
        ? items
        : items.filter((objeto) => {
            const regex = new RegExp(search.trim(), "i"); // Creamos una expresión regular a partir de la cadena de búsqueda
            const valores = Object.values(objeto).join(" "); // Unimos todos los valores en una sola cadena para facilitar la búsqueda
            return regex.test(valores); // Devolvemos true si la cadena de búsqueda coincide con algún valor del objeto
          });
    return (
      <Card sx={{ minWidth: 300 }}>
        <Tooltip
          placement="top"
          title="Puede buscar en cualquier campo aunque no se muestre"
        >
          <Input
            id={`buscar-local ${title}`}
            variant="outlined"
            type="text"
            label="Buscar"
            value={search}
            onChange={handleChangeSearch}
            sx={{ mb: 1 }}
          />
        </Tooltip>
        <CardHeader
          sx={{ px: 2, py: 1 }}
          avatar={
            <Checkbox
              onClick={handleToggleAll(items)}
              checked={
                numberOfChecked(items) === items?.length && items?.length !== 0
              }
              indeterminate={
                numberOfChecked(items) !== items?.length &&
                numberOfChecked(items) !== 0
              }
              disabled={items?.length === 0}
              inputProps={{
                "aria-label": "todos los elementos fueron seleccionados",
              }}
            />
          }
          title={title}
          subheader={`${numberOfChecked(items)}/${items?.length} seleccionados`}
        />
        <Divider />
        <List sx={styles} dense component="div" role="list">
          {Array.isArray(resultados) &&
            resultados.map((value) => {
              const labelId = `transfer-list-all-item-${value}-label`;
              return (
                <ListItem
                  key={value.id}
                  role="listitem"
                  onClick={handleToggle(value)}
                >
                  <ListItemIcon sx={{ minWidth: "auto" }}>
                    <Checkbox
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                      sx={{ padding: "3px 9px" }}
                    />
                  </ListItemIcon>
                  {value.name.length > 52 ? (
                    <Tooltip title={value.name} placement="top">
                      <ListItemText
                        id={labelId}
                        primary={reduceName(value.name)}
                      />
                    </Tooltip>
                  ) : (
                    <ListItemText id={labelId} primary={value.name} />
                  )}
                </ListItem>
              );
            })}
          <ListItem />
        </List>
        {pagination && pagination.showLoadMoreButton && (
          <Button
            onClick={pagination.loadMore}
            variant="gradient"
            color="light"
          >
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
          <Button
            variant="gradient"
            color="dark"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="mover a la derecha"
          >
            &gt;
          </Button>
          <Button
            variant="gradient"
            color="dark"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="mover a la izquierda"
          >
            &lt;
          </Button>
        </div>

        <div className="flex-grow">{customList("A asignar", right)}</div>
      </div>
    </div>
  );
};

export default TransferList;
export { GroupHeader, GroupItems };
