import React, { useState, useEffect } from "react";
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
import "../../Component/styles/ExistingProviderList.css";
import jwt from "jwt-decode";
import axios from "axios";
import history from "../../history";
import Header from "../../Component/Layout/Header";
import { useParams } from "react-router-dom";
import Footer from "../../Component/Layout/Footer";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    margin: theme.spacing(3, 0, 2),
  },
  Card: {
    justifyContent: "center",
    alignItems: "center",
    padding: ".7rem",
    marginBottom: ".5rem",
    marginTop: " .5rem",
    minWidth: "10rem",
    // minHeight: '10rem'
    "&:hover": {
      cursor: "pointer",
      transition: "all 0.2s ease-out",
      boxShadow: "0px 4px 8px rgba(38, 38, 38, 0.2)",
      top: "-4px",
      border: "1px solid #cccccc",
      backgroundColor: "#87CEFA",
      borderRadius: ".7rem",
      fontWeight: "550",
    },
  },
}));

const ExistingProvider = () => {
  const [subMenuList, setSubMenuList] = useState([]);
  const [subMenu, setSubMenu] = useState(false);
  const params = useParams();
  const classes = useStyles();
  let navigate = useNavigate();

  useEffect(() => {
    console.log("params", params);
    let token = localStorage.getItem("token");
    let data = {};
    axios
      .post(`http://3.109.115.30:8080/provider-list?userId=302&projectName=${params.id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setSubMenuList(data);
        setSubMenu(true);
      });
  }, []);

  const servicePage = (e) => {
    let id = e.target.id;
    history.push(`/services/${id}/${params.id}`);
    window.location.reload();
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <div className="projects-backbutton">
          <Button
            className="proj-back"
            type="submit"
            // fullWidth
            variant="contained"
            color="Primary"
            name="back"
            onClick={() => navigate(-1)}
          >
            <Grid container direction="row" alignItems="center" style={{ paddingTop: "5px" }}>
              <KeyboardArrowLeftIcon /> Back
            </Grid>
          </Button>
        </div>

        <Grid container spacing={0.5} className="existinglist-maingrid">
          <Grid className="existinglist-header" xs={12}>
            <Header />
          </Grid>
          <Typography component="h1" variant="h4" align="center" style={{ fontWeight: "600", position: "absolute", top: "100px" }}>
          Project Name: {params.id}

            <br></br>
          </Typography>
          <Grid xs={12}>
            <div className="projectService1">
              {subMenuList?.data?.providerTypeList?.map((val) => {
                return (
                  <div className="card-container">
                    <Card className={classes.Card} id={val} sx={{ borderRadius: "20px", boxShadow: 3 }}>
                      <img
                        src={val === "aws" ? Amazon : val === "azure" ? Azur : val === "gcp" ? Google : ""}
                        className="serviceLogos"
                        id={val}
                        onClick={(e) => {
                          servicePage(e);
                        }}
                      />
                    </Card>
                  </div>
                );
              })}
            </div>
          </Grid>
          <Grid className="existinglist-footer" xs={12}>
            <Footer />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ExistingProvider;
