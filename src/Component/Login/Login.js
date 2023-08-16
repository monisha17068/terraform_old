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
import InputLabel from "@mui/material/InputLabel";
import Logo from "../../Assets/Icons/Icon.png";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import "../styles/Login.css";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import history from "../../history";
// import Footer from "./Layout/Footer";
import Loading from "../common/Loading";

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
    margin: theme.spacing(0, 0, 1),
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
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [formError, setFormError] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const Validation = () => {
    if (!username) {
      setFormError((oldState) => ({ ...oldState, username: "*required" }));
    }
    if (!password) {
      setFormError((oldState) => ({ ...oldState, password: "*required" }));
    }
    if (username && password) {
      return true;
    }
  };

  const onBlurUsername = () => {
    if (username) {
      setFormError((oldState) => ({ ...oldState, username: "" }));
    }
    if (!username) {
      setFormError((oldState) => ({ ...oldState, username: "*required" }));
    }
  };

  const onBlurPassword = () => {
    if (password) {
      setFormError((oldState) => ({ ...oldState, password: "" }));
    }
    if (!password) {
      setFormError((oldState) => ({ ...oldState, password: "*required" }));
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

      setLoading(true);

      axios
        .post("http://3.109.115.30:8080/login", data)
        .then((result) => {
          if (result.data.token) {
            setSuccess(true);
            setFail(false);
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("userId", result.data.userId);
            history.push("/projects");
            window.location.reload();
          } else {
            setFail(true);
            setSuccess(false);
          }
        })
        .catch((err) => {
          setFail(true);
          setSuccess(false);
        });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="maindiv">
        <div className="cont1">
          <div className="left"></div>
          <div className={classes.paper}>
            <div className="right">
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                {/* <div className="alert">
      {fail ? <Alert onClose={() => {setFail(false)}} severity="error">Invalid Credentials!</Alert> : ''}
      {success ? <Alert onClose={() => {setSuccess(false)}} severity="success">Success!</Alert> : ''}
      </div> */}

                <div className={classes.paper}>
                  <img src={Logo} className="logo" />
                  <Typography
                    className={classes.custom}
                    component="h1"
                    variant="h4"
                  >
                    Hi, Welcome Back
                  </Typography>
                  <Typography className={classes.custom1} margin={10}>
                    Enter your credentials to continue
                  </Typography>
                  <form
                    className={classes.form}
                    noValidate
                    onSubmit={(e) => {
                      Submit(e);
                    }}
                  >
                    <InputLabel id="demo-simple-select-required-label">
                      Username
                    </InputLabel>
                    <TextField
                      variant="outlined"
                      // margin="normal"
                      required
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                      id="email"
                      // label="Username"
                      name="email"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      onBlur={onBlurUsername}
                      onFocus={() => {
                        setFormError((oldState) => ({
                          ...oldState,
                          username: "",
                        }));
                      }}
                    />
                    <span style={{ color: "red" }}>{formError.username}</span>
                    <InputLabel id="demo-simple-select-required-label">
                      Password
                    </InputLabel>
                    <TextField
                      variant="outlined"
                      // margin="normal"
                      required
                      fullWidth
                      name="password"
                      // label="Password"
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      onBlur={onBlurPassword}
                      onFocus={() => {
                        setFormError((oldState) => ({
                          ...oldState,
                          password: "",
                        }));
                      }}
                    />
                    <span style={{ color: "red" }}>{formError.password}</span>
                    <br></br>
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Sign In
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href="/register" variant="body2">
                          {"Don't have an account? Sign Up"}
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
      {/* <Footer/> */}
    </>
  );
}
