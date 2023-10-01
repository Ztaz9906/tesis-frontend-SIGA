/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";
import { Box, Grid, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import {
  useGetEstructurasQuery,
  useLazyGetEstructuraByIdQuery,
} from "../../service/estructura.service";
import { TreeView } from "@mui/x-tree-view";
import {
  BpCheckedIcon,
  BpIcon,
  CloseSquare,
  MinusSquare,
  PlusSquare,
  StyledTreeItem,
} from "./estructura.padre.style";
import { useState } from "react";
import { useEffect } from "react";

export default function EstructuraPadre({ formData }) {
  const { formField, values, errors, touched, setFieldValue, id } = formData;
  const { estructura_parent } = formField;
  const { estructura_parent: estructura_parentV } = values;
  const { data: data_estructura } = useGetEstructurasQuery(undefined, {
    refetchOnReconnect: true,
  });
  const filteredData =
    data_estructura?.filter((item) => item.category.base) || null;
  const [selected, setSelected] = useState(estructura_parentV);

  const handleChange = (event) => {
    setSelected(event.target.value);
    setFieldValue(estructura_parent.name, event.target.value);
  };

  useEffect(() => {
    if (estructura_parentV === "") {
      if (filteredData !== null && filteredData.length > 0) {
        setSelected(filteredData[0].id);
        setFieldValue(estructura_parent.name, filteredData[0].id);
      }
    }
  }, []);
  const renderTreeItem = (area) => {
    console.log(area);
    return (
      <StyledTreeItem
        nodeId={String(area.id)}
        key={String(area.id)}
        label={
          <FormControlLabel
            value={area.id}
            control={
              <Radio
                sx={{
                  "&:hover": {
                    bgcolor: "transparent",
                  },
                }}
                disableRipple
                color="default"
                checkedIcon={<BpCheckedIcon />}
                icon={<BpIcon />}
              />
            }
            label={<>{area.name}</>}
            key={area.id}
          />
        }
      >
        {area?.children.length > 0
          ? area?.children.map((a) => renderTreeItem(a))
          : null}
      </StyledTreeItem>
    );
  };

  return (
    <Box mt={1.625}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <h1 className="text-gray-400 text-xl text-center">
            Seleccione una estructura padre
          </h1>
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<MinusSquare />}
            defaultExpandIcon={<PlusSquare />}
            defaultEndIcon={<CloseSquare />}
            sx={{
              minHeight: 350,
              flexGrow: 1,
              maxWidth: "100vw",
            }}
          >
            <RadioGroup value={selected} onChange={handleChange}>
              <StyledTreeItem
                nodeId={"node-null"}
                key={"node-id"}
                label={
                  <FormControlLabel
                    value={""}
                    control={
                      <Radio
                        sx={{
                          "&:hover": {
                            bgcolor: "transparent",
                          },
                        }}
                        disableRipple
                        color="default"
                        checkedIcon={<BpCheckedIcon />}
                        icon={<BpIcon />}
                      />
                    }
                    label={<>Ninguno</>}
                    key={"area-id"}
                  />
                }
              ></StyledTreeItem>
              {filteredData?.map((area) => renderTreeItem(area))}
            </RadioGroup>
          </TreeView>
        </Grid>
      </Grid>
    </Box>
  );
}

// typechecking props for UserInfo
EstructuraPadre.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};
