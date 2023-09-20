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

// formik components
import { Formik, Form } from "formik";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components

// NewAsignatura page components

// NewAsignatura layout schemas for form and form feilds
import validations from "./schemas/validations";
import form from "./schemas/form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import initialValues from "./schemas/initialValues";
import AddTorpedo from "./components/torpedo.info";

const getModifiedFields = (originalData, newData) => {
  return Object.fromEntries(
    Object.entries(newData).filter(([key, value]) => {
      return originalData[key] !== value;
    })
  );
};

function NewTorpedo() {
  const { id } = useParams();
  const { formId, formField } = form;
  const currentValidation = validations[0];
  const [oldValues, setOldValues] = useState();
  const navigate = useNavigate();

  const submitForm = async (values, actions) => {
    try {
      if (!id) {
        console.log("!id");
        // await createAsignaturas(values);
      } else {
        const modifiedFields = getModifiedFields(oldValues, values);
        if (Object.keys(modifiedFields).length !== 0) {
          console.log("!id");
          // await editAsignaturas({ id: id, ...modifiedFields });
        }
      }
    } catch (error) {
      console.error(error);
      actions.setSubmitting(true);
    }
  };

  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };

  return (
    <Box mt={5} mb={20}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} lg={8}>
          <Box mt={6} mb={8} textAlign="center">
            <Box mb={1}>
              <Typography variant="h5" fontWeight="bold">
                {!id ? "Registrar Persona Torpedo" : `Editar Persona Torpedo`}
              </Typography>
            </Box>
          </Box>
          <Formik
            initialValues={initialValues}
            validationSchema={currentValidation}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, setFieldValue }) => {
              useEffect(() => {
                if (id) {
                }
              }, [id]);
              return (
                <Form id={formId} autoComplete="off">
                  <Card sx={{ height: "100%" }}>
                    <Box p={3}>
                      <Box>
                        <AddTorpedo
                          formData={{
                            values,
                            touched,
                            formField,
                            errors,
                          }}
                        />
                        <Box
                          mt={2}
                          width="100%"
                          display="flex"
                          justifyContent="space-between"
                        >
                          <Button
                            onClick={(e) => {
                              navigate("");
                            }}
                            variant="outlined"
                            color="error"
                          >
                            cancelar
                          </Button>
                          <Button
                            type="submit"
                            variant="outlined"
                            color="success"
                          >
                            aceptar
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Card>
                </Form>
              );
            }}
          </Formik>
        </Grid>
      </Grid>
    </Box>
  );
}

export default NewTorpedo;
