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
import gcpBucket from "../../Assets/Logo/gcpBucket.png";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "500px",
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

export default function GCPVM(props) {
  const classes = useStyles();
  const [username, setUsername] = useState();
  const [region, setRegion] = useState();
  const [zone, setZone] = useState();
  const [selectZone, setSelectZone] = useState();
  const [providerType, setProviderType] = useState();
  const [projectId, setProjectId] = useState();
  const [selectFile, setSelectFile] = useState(null);
  const [password, setPassword] = useState();
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [formError, setFormError] = useState({
    region: "",
    projectId: "",
    selectFile: "",
    name: "",
    zone: "",
    machineType: "",
  });
  const [machineType, setMachineType] = useState();
  const [name, setName] = useState();

  const Validation = () => {
    if (!region) {
      setFormError((oldState) => ({ ...oldState, region: "*required" }));
    }
    if (!projectId) {
      setFormError((oldState) => ({ ...oldState, projectId: "*required" }));
    }
    if (!selectZone) {
      setFormError((oldState) => ({ ...oldState, selectZone: "*required" }));
    }
    if (!name) {
      setFormError((oldState) => ({ ...oldState, name: "*required" }));
    }
    if (!machineType) {
      setFormError((oldState) => ({ ...oldState, machineType: "*required" }));
    }
  };

  const dropDown = (e) => {
    let token = localStorage.getItem("token");
    if (e.target.name === "region") {
      setRegion(e.target.value);

      axios
        .get(`http://3.109.115.30:8080/gcpZone?regionName=${e.target.value}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setZone(res.data);
        });
      if (!region) {
        setFormError((oldState) => ({ ...oldState, region: "" }));
      }
    }
    if (e.target.name === "zone") {
      setSelectZone(e.target.value);
      if (selectZone) {
        setFormError((oldState) => ({ ...oldState, selectZone: "" }));
      }
    }
  };

  const deleteVM = (e) => {
    e.preventDefault();
    Validation();

    if (projectId && region && zone && machineType && name) {
      let data = {
        userId: 302,
        providerType: "gcp",
        projectId: projectId,
        regionName: region,
        name: name,
        projectCreateId: 5754,
        machineType: machineType,
        zone: selectZone,
      };

      let token = localStorage.getItem("token");
      axios
        .post(`http://3.109.115.30:8080/api/gcp-vm-destroy`, data, {
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

  const Submit = (e) => {
    e.preventDefault();
    Validation();

    if (projectId && region && zone && machineType && name) {
      console.log("after");
      let data = {
        userId: 302,
        providerType: "gcp",
        projectId: projectId,
        regionName: region,
        name: name,
        projectCreateId: 5754,
        machineType: machineType,
        zone: selectZone,
      };

      let token = localStorage.getItem("token");
      axios
        .post(`http://3.109.115.30:8080/api/gcp-vm`, data, {
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
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <card className="GCPVMcard" id="style">
          <div className="alert"></div>
          <div className="closeicon">
            <IconButton
              aria-label="close"
              onClick={() => {
                props.closeForm(false);
                window.location.reload();
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>

          <div className={classes.paper}>
            <img src={gcpBucket} alt="gcpBucketlogo" style={{ width: "5rem" }} />
            <Typography component="h1" variant="h5">
              GCP VM
            </Typography>
            {/* {fail ? (
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
          // <IconButton
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
              <InputLabel id="demo-simple-select-required-label">Name</InputLabel>
              <TextField
                variant="outlined"
                // margin="normal"
                required
                placeholder="Please enter the name"
                fullWidth
                id="email"
                // label="projectId"
                name="email"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                onFocus={() => {
                  setFormError((oldState) => ({ ...oldState, name: "" }));
                }}
                onBlur={() => {
                  if (!name) {
                    setFormError((oldState) => ({
                      ...oldState,
                      name: "*required",
                    }));
                  }
                }}
              />
              <span style={{ color: "red" }}>{formError.name}</span>

              <InputLabel id="demo-simple-select-required-label">ProjectId</InputLabel>

              <TextField
                variant="outlined"
                // margin="normal"
                required
                placeholder="Please enter the Project ID"
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
                    setFormError((oldState) => ({
                      ...oldState,
                      projectId: "*required",
                    }));
                  }
                }}
              />
              <span style={{ color: "red" }}>{formError.projectId}</span>
              <InputLabel id="demo-simple-select-required-label">MachineType</InputLabel>
              <TextField
                variant="outlined"
                // margin="normal"
                required
                placeholder="Please enter Machine Type"
                fullWidth
                id="email"
                // label="projectId"
                name="email"
                value={machineType}
                onChange={(e) => {
                  setMachineType(e.target.value);
                }}
                onFocus={() => {
                  setFormError((oldState) => ({
                    ...oldState,
                    machineType: "",
                  }));
                }}
                onBlur={() => {
                  if (!machineType) {
                    setFormError((oldState) => ({
                      ...oldState,
                      machineType: "*required",
                    }));
                  }
                }}
              />
              <span style={{ color: "red" }}>{formError.machineType}</span>

              <InputLabel id="demo-simple-select-required-label">Region</InputLabel>
              <select
                value={region}
                className="drop-down"
                name="region"
                onChange={(e) => {
                  dropDown(e);
                }}
              >
                <option value="">Region</option>
                {props.region?.map((val, i) => {
                  console.log(val);
                  return <option value={val}>{val}</option>;
                })}
              </select>

              <span style={{ color: "red" }}>{formError.region}</span>
              <InputLabel id="demo-simple-select-required-label">Zone</InputLabel>
              <select
                value={selectZone}
                className="drop-down"
                name="zone"
                onChange={(e) => {
                  dropDown(e);
                }}
              >
                <option value="">Zone</option>
                {zone?.map((val, i) => {
                  return (
                    <option key={i} value={val.zone}>
                      {val.zone}
                    </option>
                  );
                })}
              </select>
              <span style={{ color: "red" }}>{formError.selectZone}</span>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Create
              </Button>
              {/* <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondry"
                className={classes.submit}
                onClick={deleteVM}
              >
                Delete
              </Button> */}
            </form>
          </div>
        </card>
      </Container>
    </>
  );
}
