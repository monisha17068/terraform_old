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
import Amazon from "../../Assets/Icons/amazon-web-service.png";
import Azur from "../../Assets/Icons/mic-azur.png";
import Google from "../../Assets/Icons/Google Cloud.png";
import Card from "@mui/material/Card";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TerraformLogo from "../../Assets/Icons/Terraform-Logo.png";
import Indium from "../../Assets/Icons/Icon.png";
import InputLabel from "@mui/material/InputLabel";
import Footer from "./../Layout/Footer";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";
import "../styles/AddProject.css";
import jwt from "jwt-decode";
import axios from "axios";
import history from "../../history";
import Header from "./../Layout/Header";
import Loading from "../common/Loading";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    padding: theme.spacing(1),
    display: "block",
    alignItems: "center",
    justifyContent: "center",
    // width:'100%'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  formStyle: {
    display: "flex",
    width: "50%", // Fix IE 11 issue.
    margin: theme.spacing(2),
    justifyContent: "space-between",
  },
  submit: {
    margin: theme.spacing(2, 0, 1),
    align: "center",
  },
  Card: {
    justifyContent: "center",
    alignItems: "center",
    padding: ".7rem",
    marginBottom: "1.5rem",
    marginTop: " 1.5rem",
    minWidth: "8rem",
    minHeight: "8rem",
  },
}));

export default function Addproject() {
  const classes = useStyles();
  const [enggName, setEnggName] = useState();
  const [project, setProject] = useState();
  const [AWSCheck, setAWSCheck] = useState(false);
  // we pass each state its initial value - bar is checked by default
  const [AzurCheck, setAzurCheck] = useState(false);
  const [GCPCheck, setGCPCheck] = useState(false);
  const [formError, setFormError] = useState({
    project: "",
    enggName: "",
    provider: "",
  });
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = jwt(token);

  let AWSProvider = "aws";
  let AureProvider = "azure";
  let GCPProvider = "gcp";

  const Validation = () => {
    if (!project) {
      setFormError((oldState) => ({
        ...oldState,
        project: "Project name is required",
      }));
    }
    if (!enggName) {
      setFormError((oldState) => ({
        ...oldState,
        enggName: "Name is required",
      }));
    }
    if (!AWSCheck && !AzurCheck && !GCPCheck) {
      setFormError((oldState) => ({
        ...oldState,
        provider: "Please select at least one service provider",
      }));
    }
  };
  const submit = (e) => {
    Validation();
    e.preventDefault();

    if (enggName && project && (AWSCheck || GCPCheck || AzurCheck)) {
      let data = {
        userId: 302,
        projectName: project,
        devopsName: enggName,
        providerTypeList: [],
      };
      if (AWSCheck) {
        data.providerTypeList.push(AWSProvider);
      }
      if (AzurCheck) {
        data.providerTypeList.push(AureProvider);
      }
      if (GCPCheck) {
        data.providerTypeList.push(GCPProvider);
      }

      axios
        .post(`http://3.109.115.30:8080/create-project`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data) => {
          if (data.data.status === true) {
            setLoading(true);
            history.push("/existingproject");
            window.location.reload();
          }
        });
    }

    // let data={
    //   userId:302,
    //   projectName:project,
    //   devopsName:enggName,
    //   providerTypeList:[]
    // }
    // if(AWSCheck){
    //   data.providerTypeList.push(AWSProvider)
    // }
    // if(AzurCheck){
    //   data.providerTypeList.push(AureProvider)
    // }
    // if(GCPCheck){
    //   data.providerTypeList.push(GCPProvider)
    // }

    // axios.post(`http://3.109.115.30:8080/create-project`,data,
    // {headers:{
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}`
    // }}).then((data)=>{
    //   if(data.data.status === true){
    // history.push('/existingproject');
    // window.location.reload();
    //   }
    // });
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="main1">
        <Header />
        {/* <Container component="main" className="projects-container" minWidth="xs"> */}
        <CssBaseline />
        <div className={classes.paper}>
          <div className="content-div">
            <Typography component="h1" variant="h4" align="center" style={{ fontWeight: "600" }}>
              CREATE A PROJECT
              <br></br>
            </Typography>
          </div>
          <Container component="main" className="projects-container" maxWidth="sm">
            <CssBaseline />
            <form
              onSubmit={(e) => {
                submit(e);
              }}
              noValidate
            >
              <div className={classes.paper}>
                {/* <div className="content-div">
                      <Typography component="h1" variant="h4" align="center" style={{ fontWeight: "600" }}>
                        CREATE A PROJECT
                        <br></br>
                      </Typography>
                    </div> */}
                <div className="flex-container">
                  <div className="flex-left">
                    <InputLabel id="demo-simple-select-required-label" style={{ fontWeight: "bold" }}>
                      Project Name
                    </InputLabel>
                    <TextField
                      variant="outlined"
                      // margin="normal"
                      required
                      // label="Project Name"
                      name="email"
                      autoFocus
                      value={project}
                      onChange={(e) => {
                        setProject(e.target.value);
                      }}
                      onFocus={() => {
                        setFormError((oldState) => ({
                          ...oldState,
                          project: "",
                        }));
                      }}
                      onBlur={() => {
                        if (!project) {
                          setFormError((oldState) => ({
                            ...oldState,
                            project: "",
                          }));
                        }
                      }}
                    />
                    <div style={{ color: "red" }}>{formError.project}</div>
                  </div>
                  <div className="flex-right">
                    <InputLabel id="demo-simple-select-required-label" style={{ fontWeight: "bold" }}>
                      Devops Engineer
                    </InputLabel>
                    <TextField
                      variant="outlined"
                      // margin="normal"
                      required
                      name="password"
                      // label="Devops Engineer"
                      id="password"
                      autoComplete="current-password"
                      value={enggName}
                      onChange={(e) => {
                        setEnggName(e.target.value);
                      }}
                      onFocus={() => {
                        setFormError((oldState) => ({
                          ...oldState,
                          enggName: "",
                        }));
                      }}
                      onBlur={() => {
                        if (!username) {
                          setFormError((oldState) => ({
                            ...oldState,
                            enggName: "*required",
                          }));
                        }
                      }}
                    />
                    <div style={{ color: "red" }}>{formError.enggName}</div>
                  </div>
                </div>
                {/* <div className={classes.formStyle}> 
                      <div className="wrapper">
                        
                        </div>
                        <div className="wrapper">
                        
                        </div>
                      </div> */}
                <div className="main-container">
                  <br></br>
                  <h2 align="center">Select Service Provider</h2>

                  <div className="service-container">
                    <div className="card-container">
                      <Card
                        className={classes.Card}
                        id={!AWSCheck ? "seletedCard" : "card1"}
                        sx={{ borderRadius: "20px", boxShadow: 3 }}
                        onClick={(e) => {
                          setAWSCheck(!AWSCheck);
                        }}
                      >
                        <img src={Amazon} className="serviceLogos" id="aws" />
                        <input
                          type="checkbox"
                          className="check-box"
                          defaultChecked={AWSCheck}
                          onClick={(e) => {
                            setAWSCheck(!AWSCheck);
                          }}
                          onInput={() => {
                            setFormError((oldState) => ({
                              ...oldState,
                              provider: "",
                            }));
                          }}
                        ></input>
                      </Card>
                    </div>
                    <div className="card-container">
                      <Card
                        className={classes.Card}
                        id={!AzurCheck ? "seletedCard" : "card1"}
                        sx={{ borderRadius: "20px", boxShadow: 3 }}
                        onInput={() => {
                          setFormError((oldState) => ({
                            ...oldState,
                            provider: "",
                          }));
                        }}
                        onClick={(e) => {
                          setAzurCheck(!AzurCheck);
                        }}
                      >
                        <img src={Azur} className="serviceLogos" id="azure" />
                        <input
                          type="checkbox"
                          className="check-box"
                          defaultChecked={AzurCheck}
                          onClick={(e) => {
                            setAzurCheck(!AzurCheck);
                          }}
                        ></input>
                      </Card>
                    </div>
                    <div className="card-container">
                      <Card
                        className={classes.Card}
                        id={!GCPCheck ? "seletedCard" : "card1"}
                        sx={{ borderRadius: "20px", boxShadow: 3 }}
                        onInput={() => {
                          setFormError((oldState) => ({
                            ...oldState,
                            provider: "",
                          }));
                        }}
                        onClick={(e) => {
                          setGCPCheck(!GCPCheck);
                        }}
                      >
                        <img src={Google} className="serviceLogos" id="gcp" />
                        <input
                          type="checkbox"
                          className="check-box"
                          defaultChecked={GCPCheck}
                          onClick={(e) => {
                            setGCPCheck(!GCPCheck);
                          }}
                        ></input>
                      </Card>
                    </div>
                  </div>
                  <p style={{ color: "red", textAlign: "center", marginTop: "-20px" }}>{formError.provider}</p>
                  <Grid container justify="center">
                    <Button
                      type="submit"
                      width="4rem"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      name="create"
                    >
                      Create Project
                    </Button>
                  </Grid>
                </div>
              </div>
            </form>
          </Container>
        </div>
        {/* </Container> */}
        <div className="projects-backbutton">
          <Button
            className="proj-back"
            type="submit"
            // fullWidth
            variant="contained"
            color="primary"
            name="back"
            onClick={() => navigate(-1)}
          >
            <Grid container direction="row" alignItems="center" style={{ paddingTop: "5px" }}>
              <KeyboardArrowLeftIcon /> Back
            </Grid>
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
