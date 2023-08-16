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
import "../../Component/styles/styles.css";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import history from "../../history";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import RemoveIcon from "@mui/icons-material/Remove";
import awsS3 from "../../Assets/Icons/awsS3.png";
import "../../Component/styles/styles.css";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex",
  },
  avatar: {
    margin: theme.spacing(0.7),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(0.5),
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
  },
}));

export default function S3Bucket(props) {
  const classes = useStyles();
  const [bucketName, setBucketName] = useState();
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const [inputList, setInputList] = useState([{ bucket: "", id: Math.random(10) }]);
  const [formError, setFormError] = useState({
    bucketName: "",
  });

  const validation = () => {
    if (!bucketName) {
      setFormError((oldstate) => ({
        ...oldstate,
        bucketName: "*required",
      }));
    }
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    setBucketName(name);

    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    if (bucketName) {
      setFormError((oldState) => ({ ...oldState, bucketName: "" }));
    }
  };

  // handle click event of the Remove button
  const handleRemoveClick = (id) => {
    const list = [...inputList];
    let newList = list.filter((item) => item.id !== id);
    setInputList(newList);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { bucket: "", id: Math.random(10) }]);
  };

  // const deleteService = (e) => {
  //   e.preventDefault();
  //   let token = localStorage.getItem("token");
  //   let result = inputList.map((a) => a.bucket);
  //   let data = {
  //     bucketNames: result,
  //     userId: 302,
  //     providerType: "aws",
  //     projectName: props.projectName,
  //   };
  //   console.log(data);

  //   axios
  //     .post(`http://3.109.115.30:8080/aws-s3-destroy`, data, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       if (data.status) {
  //         setSuccess(true);
  //         setFail(false);
  //       }
  //     })
  //     .catch((err) => {
  //       if (err) {
  //         setSuccess(false);
  //         setFail(true);
  //       }
  //     });
  // };

  const Submit = (e) => {
    e.preventDefault();
    validation();

    console.log("bucketName", bucketName);

    if (bucketName) {
      let token = localStorage.getItem("token");
      let result = inputList.map((a) => a.bucket);
      let data = {
        bucketNames: result,
        userId: 302,
        providerType: "aws",
        projectName: props.projectName,
      };

      axios
        .post(`http://3.109.115.30:8080/aws-s3`, data, {
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
        <card className="s3card" id="style">
          <div className="alert"></div>
          <div className="closeicon">
            <IconButton
              aria-label="close"
              onClick={() => {
                props.closeS3(false);
                window.location.reload();
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <div className={classes.paper}>
            <img src={awsS3} alt="awsS3logo" style={{ width: "90px" }} />
            <Typography component="h1" variant="h5">
              AWS S3
            </Typography>
            {fail ? (
              <Alert
                onClose={() => {
                  setFail(false);
                }}
                severity="error"
              >
                Failed !
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
                Success !
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
              {inputList.map((x, i) => {
                return (
                  <>
                    <InputLabel id="demo-simple-select-required-label">Bucket Name</InputLabel>
                    <div className="s-3-box">
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        name="bucket"
                        type="text"
                        value={x.bucket}
                        onChange={(e) => handleInputChange(e, i)}
                        onFocus={() => {
                          setFormError((oldState) => ({
                            ...oldState,
                            name: "",
                          }));
                        }}
                        onBlur={() => {
                          if (!bucketName) {
                            setFormError((oldState) => ({
                              ...oldState,
                              name: "*required",
                            }));
                          }
                        }}
                      />

                      {inputList.length !== 1 && (
                        <IconButton className="mr10" onClick={(id) => handleRemoveClick(x.id)}>
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
              <span style={{ color: "red" }}>{formError.bucketName}</span>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                name="create"
                style={{ marginTop: "25px" }}
              >
                Create
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
