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
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Dialog } from "@mui/material";
import "../styles/AWSform.css";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import history from "../../history";
import CancelIcon from "@mui/icons-material/Cancel";
import InputLabel from "@mui/material/InputLabel";
import { Dropdown } from "react-bootstrap";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex",
    fontSize: "1rem",
  },
  avatar: {
    margin: theme.spacing(0),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(0.5),
  },
  submit: {
    margin: theme.spacing(2, 0, 1),
  },
}));

export default function AWS(props) {
  const classes = useStyles();
  const [accesskey, setAccessKey] = useState();
  const [secretKey, setSecretKey] = useState();
  const [region, setRegion] = useState();
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [formError, setFormError] = useState({ accesskey: "", secretKey: "", region: "" });

  const Validation = () => {
    if (!accesskey) {
      setFormError((oldState) => ({ ...oldState, accesskey: "*required" }));
    }
    if (!secretKey) {
      setFormError((oldState) => ({ ...oldState, secretKey: "*required" }));
    }
    if (!region) {
      setFormError((oldState) => ({ ...oldState, region: "*required" }));
    }
  };

  const dropDown = (e) => {
    setRegion(e.target.value);
    if (!region) {
      setFormError((oldState) => ({ ...oldState, region: "" }));
    }
  };

  const Submit = (e) => {
    e.preventDefault();
    Validation();
    if (!formError.accesskey && !formError.secretKey && !formError.region) {
      const formData = new FormData();
      formData.append("accessKey", accesskey);
      formData.append("regionData", region);
      formData.append("providerType", "aws");
      formData.append("projectName", props.projectName);
      formData.append("secretKey", secretKey);
      formData.append("userId", 302);
      let token = localStorage.getItem("token");

      axios
        .post("http://3.109.115.30:8080/config-project", formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          if (result.status) {
            setSuccess(true);
            setFail(false);
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
  //  const  [showPopup, setShowPopup] = useState(true);
  //  if (!showPopup) return null;
  return (
    <div>
      <Container className="config" component="main" maxWidth="sm">
        <CssBaseline />
        <div className="alert"></div>
        <div className="closeicon">
          <IconButton
            aria-label="close"
            onClick={() => {
              props.closeForm(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <div className={classes.paper}>
          {/* {<IconButton
     size="large"
     edge="start"
     color="inherit"
     aria-label="menu"
     sx={{ mr: 2 }}
     onClick={()=>{props.closeForm(false)}}
     style={{marginLeft:'40'}}
   >
     <CancelIcon />
   </IconButton>} */}
          <Typography component="h1" variant="h5">
            AWS CONFIG
          </Typography>

          {fail ? (
            <Alert
              onClose={() => {
                setFail(false);
              }}
              severity="error"
            >
              Invalid Credentials!
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
          <form
            className={classes.form}
            noValidate
            onSubmit={(e) => {
              Submit(e);
            }}
          >
            <InputLabel id="demo-simple-select-label" sx={{ m: 1, minWidth: 300 }}>
              Accesskey
            </InputLabel>
            <TextField
              variant="outlined"
              // margin="normal"
              marginTop="0"
              required
              fullWidth
              id="email"
              // label="Accesskey"
              name="email"
              type="password"
              value={accesskey}
              onChange={(e) => {
                setAccessKey(e.target.value);
              }}
              onFocus={() => {
                setFormError((oldState) => ({ ...oldState, accesskey: "" }));
              }}
              onBlur={() => {
                if (!accesskey) {
                  setFormError((oldState) => ({ ...oldState, accesskey: "*required" }));
                }
              }}
            />
            <span style={{ color: "red" }}>{formError.accesskey}</span>

            <InputLabel id="demo-simple-select-label">Seceretkey</InputLabel>
            <TextField
              variant="outlined"
              // margin="normal"
              marginTop="0"
              required
              fullWidth
              name="password"
              // label="Seceretkey"
              type="password"
              id="password"
              value={secretKey}
              onChange={(e) => {
                setSecretKey(e.target.value);
              }}
              onFocus={() => {
                setFormError((oldState) => ({ ...oldState, secretKey: "" }));
              }}
              onBlur={() => {
                if (!secretKey) {
                  setFormError((oldState) => ({ ...oldState, secretKey: "*required" }));
                }
              }}
            />
            <span style={{ color: "red" }}>{formError.secretKey}</span>

            <InputLabel id="demo-simple-select-required-label">Region</InputLabel>
            <select
              value={region}
              className="drop-down"
              onChange={(e) => {
                dropDown(e);
              }}
            >
              <option value="">Region</option>
              {props.region.map((val, i) => {
                return (
                  <option value={val.location}>
                    {val.name}
                    {", "}
                    {val.location}
                  </option>
                );
              })}
            </select>

            <span style={{ color: "red" }}>{formError.region}</span>
            <div className="btnDiv">
              <Button type="submit" fullWidth variant="contained" color="primary" className="regBtn">
                Apply
              </Button>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="secondry"
                className="regBtn"
                name="delete"
                onClick={() => {
                  props.closeForm(false);
                  window.location.reload();
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}
