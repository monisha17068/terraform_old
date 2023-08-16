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
import awsRDS from "../../Assets/Icons/rds.png";

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

export default function AWSRDS(props) {
  const classes = useStyles();
  const [username, setUsername] = useState();
  const [region, setRegion] = useState();
  const [zone, setZone] = useState([]);
  const [selectZone, setSelectZone] = useState();
  const [providerType, setProviderType] = useState();
  const [projectId, setProjectId] = useState();
  const [selectFile, setSelectFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [dataBaseName, setDataBaseName] = useState();
  const [allocationStorage, setAllocationStorage] = useState();
  const [storageType, setStorageType] = useState();
  const [engine, setEngine] = useState();
  const [engineVersion, setEngineVersion] = useState();
  const [instanceClass, setInstanceClass] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [formError, setFormError] = useState({
    dataBaseName: "",
    region: "",
    zone: "",
    allocationStorage: "",
    storageType: "",
    engine: "",
    engineVersion: "",
    instanceClass: "",
    userName: "",
    password: "",
  });

  const Validation = () => {
    if (!dataBaseName) {
      setFormError((oldState) => ({ ...oldState, dataBaseName: "*required" }));
    }
    if (!region) {
      setFormError((oldState) => ({ ...oldState, region: "*required" }));
    }
    if (!allocationStorage) {
      setFormError((oldState) => ({
        ...oldState,
        allocationStorage: "*required",
      }));
    }
    if (!storageType) {
      setFormError((oldState) => ({ ...oldState, storageType: "*required" }));
    }
    if (!engine) {
      setFormError((oldState) => ({ ...oldState, engine: "*required" }));
    }
    if (!engineVersion) {
      setFormError((oldState) => ({ ...oldState, engineVersion: "*required" }));
    }
    if (!instanceClass) {
      setFormError((oldState) => ({ ...oldState, instanceClass: "*required" }));
    }
    if (!userName) {
      setFormError((oldState) => ({ ...oldState, userName: "*required" }));
    }
    if (!password) {
      setFormError((oldState) => ({ ...oldState, password: "*required" }));
    }
  };

  const dropDown = (e) => {
    let token = localStorage.getItem("token");

    if (e.target.name === "region") {
      setRegion(e.target.value);

      if (!region) {
        setFormError((oldState) => ({ ...oldState, region: "" }));
      }
    }
    if (e.target.name === "storageType") {
      setStorageType(e.target.value);
      if (!storageType) {
        setFormError((oldState) => ({ ...oldState, storageType: "" }));
      }
    }
    if (e.target.name === "engine") {
      setEngine(e.target.value);
      if (!engine) {
        setFormError((oldState) => ({ ...oldState, engine: "" }));
      }
    }
    if (e.target.name === "engineVersion") {
      setEngineVersion(e.target.value);
      if (!engineVersion) {
        setFormError((oldState) => ({ ...oldState, engineVersion: "" }));
      }
    }
    if (e.target.name === "instanceClass") {
      setInstanceClass(e.target.value);
      if (!instanceClass) {
        setFormError((oldState) => ({ ...oldState, instanceClass: "" }));
      }
    }
  };

  const Submit = (e) => {
    e.preventDefault();
    console.log("clcicked in aws");
    Validation();

    if (
      dataBaseName &&
      region &&
      allocationStorage &&
      storageType &&
      engine &&
      engineVersion &&
      instanceClass &&
      userName &&
      password
    ) {
      let data = {
        userId: props.userId,
        providerType: props.providerType,
        projectName: props.projectName,
        awsRegion: region,
        dbName: dataBaseName,
        allocatedStorage: allocationStorage,
        storageType: storageType,
        engine: engine,
        engineVersion: engineVersion,
        instanceClass: instanceClass,
        userName: userName,
        password: password,
      };

      console.log("data for rds>>>", data);

      let token = localStorage.getItem("token");
      axios
        .post(`http://3.109.115.30:8080/api/aws-rds`, data, {
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
        <card className="RDScard" id="style">
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
            <img src={awsRDS} alt="awsRDSLogo" style={{ width: "50px" }} />
            <Typography component="h1" variant="h5">
              AWS RDS
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
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => {
                props.closeForm(false);
              }}
              style={{ marginLeft: "40" }}
            >
              <CancelIcon />
            </IconButton> */}
            <form
              className={classes.form}
              noValidate
              onSubmit={(e) => {
                Submit(e);
              }}
            >
              <InputLabel id="demo-simple-select-required-label">Database Name</InputLabel>
              <TextField
                variant="outlined"
                placeholder="Database Name"
                // margin="normal"
                required
                fullWidth
                id="email"
                // label="projectId"
                name="database-name"
                value={dataBaseName}
                onChange={(e) => {
                  setDataBaseName(e.target.value);
                }}
                onFocus={() => {
                  setFormError((oldState) => ({ ...oldState, name: "" }));
                }}
                onBlur={() => {
                  if (!dataBaseName) {
                    setFormError((oldState) => ({
                      ...oldState,
                      name: "*required",
                    }));
                  }
                }}
              />
              <span style={{ color: "red" }}>{formError.dataBaseName}</span>
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
                  return (
                    <option key={i} value={val.location}>
                      {val.name}
                      {", "}
                      {val.location}
                    </option>
                  );
                })}
              </select>

              <span style={{ color: "red" }}>{formError.region}</span>
              <InputLabel id="demo-simple-select-required-label">Allocated Storage</InputLabel>
              <TextField
                variant="outlined"
                // margin="normal"
                type="number"
                placeholder="Allocation Storage"
                required
                fullWidth
                id="email"
                min="8"
                // label="projectId"
                name="allocationStorage"
                value={allocationStorage}
                onChange={(e) => {
                  setAllocationStorage(e.target.value);
                }}
                onFocus={() => {
                  setFormError((oldState) => ({
                    ...oldState,
                    allocationStorage: "",
                  }));
                }}
                onBlur={() => {
                  if (!allocationStorage) {
                    setFormError((oldState) => ({
                      ...oldState,
                      allocationStorage: "*required",
                    }));
                  }
                }}
              />
              <span style={{ color: "red" }}>{formError.allocationStorage}</span>

              <InputLabel id="demo-simple-select-required-label">Storage Type</InputLabel>
              <select
                value={storageType}
                className="drop-down"
                name="storageType"
                onChange={(e) => {
                  dropDown(e);
                }}
              >
                <option value="">Please select the value</option>
                <option value="gp2">General Purpose SSD (gp2)</option>
                <option value="i01">Provisioned IOPS SSD (i01)</option>
                <option value="magnetic">Magnetic</option>
              </select>

              <span style={{ color: "red" }}>{formError.storageType}</span>
              <InputLabel id="demo-simple-select-required-label">Engine</InputLabel>
              <select
                value={engine}
                className="drop-down"
                name="engine"
                onChange={(e) => {
                  dropDown(e);
                }}
              >
                <option value="">Please select the value</option>
                <option value="amazonAurora">Amazon Aurora</option>
                <option value="mySQL">MySQL</option>
                <option value="mariaDB">MariaDB</option>
                <option value="PostgreSQL">PostgreSQL</option>
                <option value="oracel">Oracle</option>
                <option value="microsoftSQLServer">Microsoft SQL Server</option>
              </select>

              <span style={{ color: "red" }}>{formError.engine}</span>

              <InputLabel id="demo-simple-select-required-label">Engine Version</InputLabel>
              <select
                value={engineVersion}
                className="drop-down"
                name="engineVersion"
                onChange={(e) => {
                  dropDown(e);
                }}
              >
                <option value="">Please select the value</option>
                <option value="5.7">5.7</option>
                <option value="8.0">8.0</option>

                {/* {arc?.map((val, i) => {
                  return (
                    <option value={val.architecture}>{val.architecture}</option>
                  );
                })} */}
              </select>

              <span style={{ color: "red" }}>{formError.engineVersion}</span>
              <InputLabel id="demo-simple-select-required-label">Instance Class</InputLabel>
              <select
                value={instanceClass}
                className="drop-down"
                name="instanceClass"
                onChange={(e) => {
                  dropDown(e);
                }}
              >
                <option value="">Please select the value</option>
                <option value="db.t2.micro">db.t2.micro</option>
                <option value="db.t2.small">db.t2.small</option>
                <option value="db.t2.medium">db.t2.medium</option>
                <option value="db.t2.large">db.t2.large</option>
                <option value="db.t2.xlarge">db.t2.xlarge</option>
                <option value="db.t2.2xlarge">db.t2.2xlarge</option>
                <option value="db.t3.micro">db.t3.micro</option>
                <option value="db.t3.small">db.t3.small</option>
                <option value="db.t3.medium">db.t3.medium</option>
                <option value="db.t3.large">db.t3.large</option>
                <option value="db.t4g.micro">db.t4g.micro</option>
                <option value="db.t4g.medium">db.t4g.medium</option>
                <option value="db.t4g.large">db.t4g.large</option>
                <option value="db.t4g.2xlarge">db.t4g.2xlarge</option>
              </select>

              <span style={{ color: "red" }}>{formError.instanceClass}</span>
              <InputLabel id="demo-simple-select-required-label">User Name</InputLabel>
              <TextField
                variant="outlined"
                placeholder="User Name"
                // margin="normal"
                required
                fullWidth
                id="userName"
                // label="projectId"
                name="userName"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                onFocus={() => {
                  setFormError((oldState) => ({
                    ...oldState,
                    userName: "",
                  }));
                }}
                onBlur={() => {
                  if (!userName) {
                    setFormError((oldState) => ({
                      ...oldState,
                      userName: "*required",
                    }));
                  }
                }}
              />
              <span style={{ color: "red" }}>{formError.userName}</span>
              <InputLabel id="demo-simple-select-required-label">Password</InputLabel>
              <TextField
                variant="outlined"
                // margin="normal"
                placeholder="Password"
                type="password"
                required
                fullWidth
                id="email"
                min="8"
                // label="projectId"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onFocus={() => {
                  setFormError((oldState) => ({ ...oldState, password: "" }));
                }}
                onBlur={() => {
                  if (!password) {
                    setFormError((oldState) => ({
                      ...oldState,
                      password: "*required",
                    }));
                  }
                }}
              />
              <span style={{ color: "red" }}>{formError.password}</span>

              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                CREATE
              </Button>
            </form>
          </div>
        </card>
      </Container>
    </>
  );
}
