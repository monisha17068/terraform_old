import React, { useState } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Amazon from "../../Assets/Icons/amazon-web-service.png"
import Azur from "../../Assets/Icons/mic-azur.png"
import Google from "../../Assets/Icons/Google Cloud.png"
import Card from "@mui/material/Card"
import "../../Component/styles/styles.css"
import jwt from "jwt-decode"
import axios from "axios"
import history from "../../history"

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
    marginBottom: "1.5rem",
    marginTop: " 1.5rem",
    minWidth: "11.5rem",
    minHeight: "11.5rem",
  },
}))

export default function Existingproject(props) {
  const classes = useStyles()
  const [enggName, setEnggName] = useState()
  const [project, setProject] = useState()
  const [service, setService] = useState()

  const user = localStorage.getItem("token")

  const submit = (e) => {
    history.push({
      pathname: `/existingproject/${e.target.id}`,
    })
    window.location.reload()
  }

  return (
    <div className="maindiv">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} noValidate>
            <Grid container></Grid>
          </form>
          <h2>Existing Project Details</h2>
          <br></br>
          <br></br>

          <div className="service-container">
            <div className="card-container">
              <Card className={classes.Card} id="card1" sx={{ borderRadius: "20px", boxShadow: 3 }}>
                <img
                  src={Amazon}
                  className="serviceLogos"
                  id="aws"
                  onClick={(e) => {
                    submit(e)
                  }}
                />
              </Card>
            </div>
            <div className="card-container">
              <Card className={classes.Card} id="card1" sx={{ borderRadius: "20px", boxShadow: 3 }}>
                <img
                  src={Azur}
                  className="serviceLogos"
                  id="azure"
                  onClick={(e) => {
                    submit(e)
                  }}
                />
              </Card>
            </div>
            <div className="card-container">
              <Card className={classes.Card} id="card1" sx={{ borderRadius: "20px", boxShadow: 3 }}>
                <img
                  src={Google}
                  className="serviceLogos"
                  id="gcp"
                  onClick={(e) => {
                    submit(e)
                  }}
                />
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
