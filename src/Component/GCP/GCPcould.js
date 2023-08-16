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
import CloseIcon from "@material-ui/icons/Close";
import "../../Component/styles/styles.css";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import history from "../../history";
import InputLabel from "@mui/material/InputLabel";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import gcpBucket from "../../Assets/Logo/gcpBucket.png";
import CancelIcon from "@mui/icons-material/Cancel";
import "../styles/styles.css";
const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex",
  },
  avatar: {
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

export default function GCPStore(props) {
  const classes = useStyles();
  const [bucketName, setBucketName] = useState();
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const [inputList, setInputList] = useState([{ bucket: "" }]);
  const [region, setRegion] = useState();

  // handle input change
  const handleInputChange = (e, index) => {
    console.log(index);
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { bucket: "" }]);
  };

  const deleteService = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    let result = inputList.map((a) => a.bucket);
    let data = {
      bucketName: result,
      userId: 302,
    };

    axios
      .post(`http://3.109.115.30:8080/gcp-cs-destroy`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        if (data.status) {
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
  };

  const Submit = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    let result = inputList.map((a) => a.bucket);
    let data = {
      bucketName: result,
      userId: 302,
    };
    axios
      .post(`http://3.109.115.30:8080/gcp-cs`, data, {
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
  };
  // const  [showPopup, setShowPopup] = useState(true);
  // if (!showPopup) return null;

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <card className="gcpCard" id="style">
          <div className="alert"></div>
          <div className="closeicon">
            <IconButton
              aria-label="close"
              onClick={() => {
                props.closeGcp(false);
                window.location.reload();
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>

          <div className={classes.paper}>
            <img src={gcpBucket} alt="gcpBucketlogo" style={{ width: "6rem" }} />
            <Typography component="h1" variant="h5">
              Cloud Storage
            </Typography>
            {/* {fail ? <Alert onClose={() => {setFail(false)}} severity="error">Failed !</Alert> : ''} */}
            {/* {success ? <Alert onClose={() => {setSuccess(false)}} severity="success">Success !</Alert> : ''} */}
            {/* {<IconButton
     size="large"
     edge="start"
     color="inherit"
     aria-label="menu"
     sx={{ mr: 2 }}
     onClick={()=>{props.closeGcp(false)}}
     style={{marginLeft:'40'}}
   >
     <CancelIcon />
   </IconButton>} */}
            <form
              className={classes.form}
              noValidate
              onSubmit={(e) => {
                Submit(e);
              }}
            >
              {inputList.map((x, i) => {
                return (
                  <>
                    <InputLabel id="demo-simple-select-required-label">Bucket Name</InputLabel>
                    <div className="s-3-box">
                      <TextField
                        variant="outlined"
                        // margin="normal"
                        required
                        fullWidth
                        id="email"
                        // label="BucketName"
                        name="bucket"
                        type="text"
                        value={x.firstName}
                        onChange={(e) => handleInputChange(e, i)}
                      />

                      {inputList.length !== 1 && (
                        <IconButton className="mr10" onClick={() => handleRemoveClick(i)}>
                          <RemoveIcon />
                        </IconButton>
                      )}
                      {inputList.length - 1 === i && (
                        <IconButton onClick={handleAddClick}>
                          <AddIcon />
                        </IconButton>
                      )}
                    </div>
                  </>
                );
              })}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                name="create"
              >
                CREATE
              </Button>

              {/* <Button
            type="button"
            fullWidth
            variant="contained"
            color="secondry"
            className={classes.submit}
            name="delete"
            onClick={(e)=>{deleteService(e)}}
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
