import { React, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm, Form } from "./Form";
import Input from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme();
const initialFValues = {
  email: "",
  mobile: "",
  password: "",
  cpassword: "",
};
export default function AdminRegister() {
  const navigate = useNavigate();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    for (const key in fieldValues) {
      temp[key] = fieldValues[key] ? "" : "This field is required.";
    }
    const { email, mobile, cpassword } = fieldValues;
    if (email && !/$^|.+@.+..+/.test(email)) {
      temp.email = "Email is not valid.";
    }
    if (
      mobile &&
      !new RegExp("^([0|+[0-9]{1,5})?([7-9][0-9]{9})$").test(mobile)
    ) {
      temp.mobile = "mobile is not valid";
    }
    if (cpassword && cpassword !== values.password) {
      temp.cpassword = "Passwords do not match. ";
    }
    setErrors(temp);
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange } = useForm(
    initialFValues,
    true,
    validate
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const data = {
        email: values.email,
        mobile: values.mobile,
        password: values.password,
      };
      console.log(data);
      const url = BACKEND_URL + "/admin/adminRegister";
      axios
        .post(url, data)
        .then((res) => {
          alert(res.data.message);
          navigate("/admin/login");
        })
        .catch((err) => {
          console.log(err.response || err);
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <NavBar loggedin={false} /> */}
      <div
        style={{
          background: "linear-gradient(to bottom, #42a7f5, #dae9eb)",
          position: "absolute",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        }}>
        <Container
          component="main"
          item="true"
          maxWidth="xs"
          style={{ marginTop: "90px" }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Avatar sx={{ m: 1, bgcolor: "cadetblue" }}></Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Form onSubmit={handleSubmit}>
              <Grid align="center" item xs={12}>
                <Grid align="center" item xs={12}>
                  <Input
                    name="email"
                    label="Email*"
                    value={values.email}
                    onChange={handleInputChange}
                    error={errors.email}
                  />
                  <Input
                    name="mobile"
                    label="Mobile*"
                    value={values.mobile}
                    onChange={handleInputChange}
                    error={errors.mobile}
                  />
                  <Input
                    name="password"
                    type="password"
                    label="Password*"
                    value={values.password}
                    onChange={handleInputChange}
                    error={errors.password}
                  />
                  <Input
                    name="cpassword"
                    type="password"
                    label="Confirm Password*"
                    value={values.cpassword}
                    onChange={handleInputChange}
                    error={errors.cpassword}
                  />
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={handleSubmit}
                      style={{ width: "100%", marginLeft: "2%" }}>
                      Register
                    </Button>
                  </Grid>

                  <Grid item xs>
                    <Link href="/admin/login" variant="body2">
                      {"Already Registered? Log In"}
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}
