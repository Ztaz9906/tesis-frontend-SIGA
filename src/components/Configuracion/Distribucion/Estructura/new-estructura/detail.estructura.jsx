import React from "react";
import { useLazyGetEstructuraByIdQuery } from "../service/estructura.service";
import { Link } from "react-router-dom";
import { List } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { Grid, Typography, Paper } from "@mui/material";
export default function DetailEstructura() {
  const [value, setValue] = React.useState(0);
  const { id } = useParams();
  const [estructura, setEstructura] = useState({});
  const [getEstructuraById, { data }] = useLazyGetEstructuraByIdQuery();

  useEffect(() => {
    getEstructuraById(id)
      .unwrap()
      .then((res) => {
        setEstructura(res);
      });
  }, [id]);
  console.log(estructura);
  return (
    <>
      <div className="flex border-b border-gray-300 justify-between">
        <h2 className="text-gray-700 font-semibold text-lg justify-center al">
          Detalles de la Estructura
        </h2>
        <Link
          to={"/configuracion/distribucion/estructuras"}
          className={`mx-5 `}
        >
          <List size={15} />
        </Link>
      </div>
      <div>
        {" "}
        {estructura && (
          <Paper elevation={3} style={{ padding: "16px", margin: "16px 0" }}>
            {estructura && (
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1">
                    <strong>Nombre:</strong>
                    {estructura.name}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Siglas:</strong> {estructura.initials}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Categoria:</strong>
                    {estructura?.category.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1">
                    <strong>Estructura Padre:</strong>
                    {estructura?.estructura_parent
                      ? estructura?.estructura_parent.name
                      : "---"}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Tipo de tarjeta:</strong>
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Paper>
        )}
      </div>
      <div className="p-5">
        <Box sx={{ width: "auto" }}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Estructura" />
            <BottomNavigationAction label="Reglas" />
            <BottomNavigationAction label="Responsables" />
            <BottomNavigationAction label="Personas" />
          </BottomNavigation>
        </Box>
      </div>
    </>
  );
}
