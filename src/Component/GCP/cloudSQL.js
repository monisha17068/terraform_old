import React, { useState } from "react";
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

export default function CloudSQL(props) {
  // console.log("props===", props);
  const classes = useStyles();
  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const [region, setRegion] = useState();
  const [zone, setZone] = useState([]);
  const [dataBaseVersion, setDataBaseVersion] = useState();
  const [selectZone, setSelectZone] = useState();
  const [deletionProtection, setDeletionProtection] = useState(false);
  const [randomInstanceName, setRandomInstanceName] = useState(false);

  const [projectId, setProjectId] = useState();
  const [password, setPassword] = useState();
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [formError, setFormError] = useState({
    name: "",
    dataBaseVersion: "",
    region: "",
    zone: "",
    deletionProtection: "",
    randomInstanceName: "",
  });
  // const [delproFn, setDelproFn] = useState();
  // const [name, setName] = useState();

  const Validation = () => {
    if (!dataBaseVersion) {
      setFormError((oldState) => ({
        ...oldState,
        dataBaseVersion: "*required",
      }));
    }
    if (!name) {
      setFormError((oldState) => ({ ...oldState, name: "*required" }));
    }
    if (!region) {
      setFormError((oldState) => ({ ...oldState, region: "*required" }));
    }
    if (!selectZone) {
      setFormError((oldState) => ({ ...oldState, selectZone: "*required" }));
    }
    if (!deletionProtection) {
      setFormError((oldState) => ({
        ...oldState,
        deletionProtection: "*required",
      }));
    }
    if (!randomInstanceName) {
      setFormError((oldState) => ({
        ...oldState,
        randomInstanceName: "*required",
      }));
    }
  };

  const dropDown = (e) => {
    let token = localStorage.getItem("token");

    // const delproFn = (e) => {
    //   setDelproFn(e.target.value);
    //   if (!subnet) {
    //     setFormError((oldState) => ({ ...oldState, subnet: "" }));
    //   }
    // };
    if (e.target.name === "name") {
      setName(e.target.value);
    }

    if (e.target.name === "database") {
      setDataBaseVersion(e.target.value);
      if (!dataBaseVersion) {
        setFormError((oldState) => ({ ...oldState, dataBaseVersion: "" }));
      }
    }

    if (e.target.name === "delProtection") {
      setDeletionProtection(e.target.value);
      if (!deletionProtection) {
        setFormError((oldState) => ({ ...oldState, deletionProtection: "" }));
      }
    }

    if (e.target.name === "RandomInstance") {
      setRandomInstanceName(e.target.value);
      if (!randomInstanceName) {
        setFormError((oldState) => ({ ...oldState, randomInstanceName: "" }));
      }
    }

    if (e.target.name === "region") {
      setRegion(e.target.value);

      axios
        .get(`http://3.109.115.30:8080/awsZone?regionName=${e.target.value}`, {
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
      if (!selectZone) {
        setFormError((oldState) => ({ ...oldState, selectZone: "" }));
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    Validation();

    if (name && dataBaseVersion && region && selectZone && deletionProtection && randomInstanceName) {
      let data = {
        userId: props.userId,
        providerType: props.projectId,
        projectName: props.projectName,
        regionName: region,
        zone: selectZone,
        projectId: props.projectId,
        name: name,
        databaseVersion: dataBaseVersion,
        deletionProtection: deletionProtection,
        randomInstanceName: randomInstanceName,
      };

      let token = localStorage.getItem("token");
      axios
        .post(`http://3.109.115.30:8080/api/gcp-sql`, data, {
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

  // const deleteVM = (e) => {
  //   e.preventDefault();
  //   Validation();

  //   if (volumeSize && volumeType && region && selectZone && machineType && name && os && Ami && Arc) {
  //       let data = {
  //           userId: 302,
  //           providerType: "aws",
  //           region:region,
  //           projectCreateId: 6752,
  //           availabilityZone:selectZone,
  //           ami:Ami,
  //           volumeSize:volumeSize,
  //           volumeType:volumeType,
  //           name:name,
  //           ec2RootSize:volumeSize,
  //           ec2RootType:volumeType
  //         };

  //     let token = localStorage.getItem("token");
  //     axios
  //       .post(`http://3.109.115.30:8080/aws-ec2-destroy`, data, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((result) => {
  //         if (result.status) {
  //           setSuccess(true);
  //           setFail(false);
  //         }
  //       })
  //       .catch((err) => {
  //         if (err) {
  //           setSuccess(false);
  //           setFail(true);
  //         }
  //       });
  //   }
  // };

  // const  [showPopup, setShowPopup] = useState(true);
  // if (!showPopup) return null;
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <card className="cloudSQLcard" id="style">
          <div className="alert"></div>
          <div className="closeicon">
            <IconButton
              aria-label="close"
              onClick={() => {
                props.closeForm(false);
                window.location.reload();
                // console.log("sdjsjfklj");
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>

          <div className={classes.paper}>
            <img src={gcpBucket} alt="gcpBucketlogo" style={{ width: "5rem", margin: "5px auto " }} />
            <Typography component="h1" variant="h5">
              Cloud SQL
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
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <InputLabel id="demo-simple-select-required-label">Name</InputLabel>
              <TextField
                variant="outlined"
                // margin="normal"
                required
                fullWidth
                id="name"
                placeholder="Please enter name"
                // label="projectId"
                name="name"
                value={name}
                onChange={(e) => {
                  dropDown(e);
                }}
                onFocus={() => {
                  setFormError((oldState) => ({
                    ...oldState,
                    name: "",
                  }));
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

              <InputLabel id="demo-simple-select-required-label">Database Version</InputLabel>
              <select
                id="drop-down"
                className="drop-down"
                name="database"
                onChange={(e) => {
                  dropDown(e);
                }}
              >
                <option value="">Please select version</option>
                <option value="MYSQL_5_6">MYSQL 5.6</option>
                <option value="MYSQL_5_7">MYSQL 5.7</option>
                <option value="MYSQL_8_0">MYSQL 8.0</option>
                {/* {props.region?.map((val, i) => {
                  return (
                    <option value={val.location}>
                      {val.name}
                      {", "}
                      {val.location}
                    </option>
                  );
                })} */}
              </select>
              <span style={{ color: "red" }}>{formError.name}</span>
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

              <InputLabel id="demo-simple-select-label">Deletion Protection</InputLabel>
              <select
                name="delProtection"
                className="drop-down"
                id="style"
                onChange={(e) => {
                  dropDown(e);
                }}
              >
                <option value="">Please select the value</option>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
              <span style={{ color: "red" }}>{formError.deletionProtection}</span>
              <InputLabel id="demo-simple-select-label">Random InstanceName</InputLabel>
              <select
                name="RandomInstance"
                className="drop-down"
                id="style"
                onChange={(e) => {
                  dropDown(e);
                }}
              >
                <option value="">Please select the value</option>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
              <span style={{ color: "red" }}>{formError.randomInstanceName}</span>

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
