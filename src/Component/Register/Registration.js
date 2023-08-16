import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Logo from "../../Assets/Icons/Icon.png";
import axios from "axios";
import Alert from "@mui/material/Alert";
import InputLabel from "@mui/material/InputLabel";
import "../styles/Login.css";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    margin: 0,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "rgb(255,255,255)",
  },
  avatar: {
    margin: "auto",
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(0),
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
  },
  custom: {
    color: "#3f51b5",
  },
  custom1: {
    color: "#9e9e9e",
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [cnPassword, setCnPassword] = useState();
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [formError, setFormError] = useState({
    username: "",
    password: "",
    cnPassword: "",
  });

  const Validation = () => {
    if (!username) {
      setFormError((oldState) => ({ ...oldState, username: "*required" }));
    }
    if (!password) {
      setFormError((oldState) => ({ ...oldState, password: "*required" }));
    }
    if (!cnPassword) {
      setFormError((oldState) => ({ ...oldState, cnPassword: "*required" }));
    }
    if (password !== cnPassword) {
      setFormError((oldState) => ({
        ...oldState,
        password: "*passwords are not equal",
      }));
    }
  };

  const Submit = (e) => {
    e.preventDefault();
    Validation();
    if (!formError.username && !formError.password) {
      let data = {
        username: username,
        password: password,
      };
      if (password === cnPassword) {
        axios
          .post("http://3.109.115.30:8080/register", data)
          .then((result) => {
            if (result.data.username) {
              setSuccess(true);
              setFail(false);
            } else {
              setSuccess(false);
              setFail(true);
            }
          })
          .catch((err) => {
            setSuccess(false);
            setFail(true);
          });
      } else {
        setPasswordCheck(true);
        setTimeout(() => {
          setPasswordCheck(false);
        }, 5000);
      }
    }
  };

  return (
    <>
      <div className="maindiv">
        <div className="cont2">
          <div className="left"></div>
          <div className={classes.paper}>
            <div className="right">
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className="alert">
                  {fail ? (
                    <Alert
                      onClose={() => {
                        setFail(false);
                      }}
                      severity="error"
                    >
                      User already exist!
                    </Alert>
                  ) : (
                    ""
                  )}
                  {success ? (
                    <Alert
                      onClose={() => {
                        setSuccess(false);
                      }}
                      severity="success"
                    >
                      Success!
                    </Alert>
                  ) : (
                    ""
                  )}
                  {passwordCheck ? (
                    <Alert
                      onClose={() => {
                        setPasswordCheck(false);
                      }}
                      severity="error"
                    >
                      Password and confirm password is not matching
                    </Alert>
                  ) : (
                    ""
                  )}
                </div>
                <div className={classes.paper}>
                  <img src={Logo} className="logo" alt="Logo" />
                  <Typography
                    className={classes.custom}
                    component="h1"
                    variant="h5"
                  >
                    Sign up
                  </Typography>
                  <form
                    className={classes.form}
                    noValidate
                    onSubmit={(e) => {
                      Submit(e);
                    }}
                  >
                    <InputLabel id="demo-simple-select-required-label">UserName</InputLabel>
                    <TextField
                      variant="outlined"
                      // margin="normal"
                      required
                      fullWidth
                      id="email"
                      // label="User Name"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      onFocus={()=>{setFormError(oldState=> ({ ...oldState, username: "" }))}}
                      onBlur={()=>{if(!username){setFormError(oldState=> ({ ...oldState, username: "*required" }))}}}
                    />
                    <span style={{ color: "red" }}>{formError.username}</span>
                    <InputLabel id="demo-simple-select-required-label">Password</InputLabel>
                    <TextField
                      variant="outlined"
                      // margin="normal"
                      required
                      fullWidth
                      name="password"
                      // label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      onFocus={()=>{setFormError(oldState=> ({ ...oldState, password: "" }))}}
                      onBlur={()=>{if(!password){setFormError(oldState=> ({ ...oldState, password: "*required" }))}}}
                    />
                    <span style={{ color: "red" }}>{formError.password}</span>
                    <InputLabel id="demo-simple-select-required-label">Confirm Password</InputLabel>
                    <TextField
                      variant="outlined"
                      // margin="normal"
                      required
                      fullWidth
                      name="password"
                      // label="Confirm Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={cnPassword}
                      onChange={(e) => {
                        setCnPassword(e.target.value);
                      }}
                      onFocus={()=>{setFormError(oldState=> ({ ...oldState, cnPassword: "" }))}}
                      onBlur={()=>{if(!cnPassword){setFormError(oldState=> ({ ...oldState, cnPassword: "*required" }))}}}
                    />
                    <span style={{ color: "red" }}>{formError.cnPassword}</span>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Sign Up
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2"></Link>
                      </Grid>
                      <Grid item>
                        <Link href="/" variant="body2">
                          {"Already have an account? Sign In"}
                        </Link>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
