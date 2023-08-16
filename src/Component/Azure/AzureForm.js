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
import "../../Component/styles/styles.css";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import history from "../../history";
import { Input } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@material-ui/icons/Add";
import InputLabel from "@mui/material/InputLabel";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 1),
  },
}));

export default function AzureForm(props) {
  const classes = useStyles();
  const [username, setUsername] = useState();
  const [region, setRegion] = useState();
  const [providerType, setProviderType] = useState();
  const [projectId, setProjectId] = useState();
  const [selectFile, setSelectFile] = useState(null);
  const [password, setPassword] = useState();
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [formError, setFormError] = useState({ region: "", projectId: "", selectFile: "" });

  const Validation = () => {
    if (!region) {
      setFormError((oldState) => ({ ...oldState, region: "*required" }));
    }
    if (!projectId) {
      setFormError((oldState) => ({ ...oldState, projectId: "*required" }));
    }
    if (!selectFile) {
      setFormError((oldState) => ({ ...oldState, selectFile: "*required" }));
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
    console.log(formError.region);
    if (selectFile && projectId && region) {
      const formData = new FormData();
      formData.append("fileUpload", selectFile);
      formData.append("regionData", region);
      formData.append("providerType", "gcp");
      formData.append("projectId", projectId);
      formData.append("userId", 302);
      let token = localStorage.getItem("token");
      axios
        .post(`http://3.109.115.30:8080/config-project`, formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          if (result.status) {
            setSuccess(true);
            setFail(false);
          }
        })
        .catch((err) => {
          if (err) {
            setSuccess(false);
            setFail(true);
          }
        });
    }
  };
  // const  [showPopup, setShowPopup] = useState(true);
  // if (!showPopup) return null;
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <card className="AzureData">
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
            <Typography component="h1" variant="h5">
              AZURE CONFIG
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
            {/* // <IconButton
      //   size="large"
      //   edge="start"
      //   color="inherit"
      //   aria-label="menu"
      //   sx={{ mr: 2 }}
      //   onClick={()=>{props.closeForm(false)}}
      //   style={{marginLeft:'40'}}
      // >
      //   <CancelIcon />
      // </IconButton>
       */}
            <form
              className={classes.form}
              noValidate
              onSubmit={(e) => {
                Submit(e);
              }}
            >
              {/* <InputLabel id="demo-simple-select-required-label">ProjectId</InputLabel> */}
              <TextField
                variant="outlined"
                // margin="normal"
                required
                fullWidth
                id="email"
                // label="projectId"
                name="email"
                value={projectId}
                onChange={(e) => {
                  setProjectId(e.target.value);
                }}
                onFocus={() => {
                  setFormError((oldState) => ({ ...oldState, projectId: "" }));
                }}
                onBlur={() => {
                  if (!projectId) {
                    setFormError((oldState) => ({ ...oldState, projectId: "*required" }));
                  }
                }}
              />
              <span style={{ color: "red" }}>{formError.projectId}</span>

              {/* <InputLabel id="demo-simple-select-required-label">Region</InputLabel> */}
              <select
                style={{marginTop: "10px"}}
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
              <Button
                className={classes.submit}
                fullWidth
                variant="contained"
                component="label"
                onChange={(e) => {
                  setSelectFile(e.target.files[0]);
                }}
                color="primary"
              >
                {" "}
                <AddIcon />
                <input type="file" style={{ display: "none" }} />
              </Button>
              <span style={{ color: "red" }}>{formError.selectFile}</span>
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
        </card>
      </Container>
    </div>
  );
}
