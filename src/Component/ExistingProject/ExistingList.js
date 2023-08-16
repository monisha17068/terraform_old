import * as React from "react";
import { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@material-ui/core/Button";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import { useParams } from "react-router-dom";
import Indium from "../../Assets/Logo/Icon.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../../Component/styles/ExistingList.css";
import axios from "axios";
import GCP from "../../Component/GCP/GCPform";
import AWS from "../../Component/AWS/AWSform";
import Azure from "../Azure/AzureForm";
import S3Bucket from "../../Component/AWS/S3Bucket";
import GCPCould from "../../Component/GCP/GCPcould";
import IndiumLogo from "../../Assets/Icons/Icon.png";
import Amazon from "../../Assets/Icons/amazon-web-service.png";
import Azur from "../../Assets/Icons/mic-azur.png";
import Google from "../../Assets/Icons/Google Cloud.png";
import Card from "@mui/material/Card";
import Header from "../../Component/Layout/Header";
import { margin } from "@mui/system";
import history from "../../history";
import jwt from "jwt-decode";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Row, Col } from "react-grid-system";
import Footer from "../../Component/Layout/Footer";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";
import Loading from "../common/Loading";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% )`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
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
      background: "#87CEFA",
      borderRadius: ".7rem",
      fontWeight: "550",
    },
  },
  Card1: {
    justifyContent: "center",
    alignItems: "center",
    padding: ".7rem",
    marginBottom: ".5rem",
    marginTop: " .5rem",
    minWidth: "10rem",
  },
}));

export default function Services(props) {
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [subMenu, setSubMenu] = useState(false);
  const [form, setForm] = useState(false);
  const [mainMenu, setMainmenu] = useState([]);
  const [subMenuList, setSubMenuList] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const [showS3, setShowS3] = useState(false);
  const [showGCP, setShowGCP] = useState(false);
  const [childMenu, setChildMenu] = useState(false);
  const [user, setUser] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [opens, setOpens] = useState(false);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const handleClose = () => {
    history.push("/");
    window.location.reload();
    localStorage.clear();
  };

  const params = useParams();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    let user = jwt(token);
    setUser(user.sub);
    let data = {};
    setLoading(true);
    axios
      .post(`http://3.109.115.30:8080/projects?userId=302`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setMainmenu(data.data);
        setLoading(false);
      });
  }, [0]);

  const createSubmenu = (e) => {
    let id = e.target.id;
    history.push(`/existingprovider/${id}`);
    window.location.reload();

    //  let token = localStorage.getItem('token');
    //   let data={

    //   }
    //   axios.post(`http://3.109.115.30:8080/provider-list?userId=302&projectName=${id}`,data,
    //   {headers:{
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   }}).then((data)=>{setSubMenuList(data);setSubMenu(true)});
  };
  const callBucket = (d) => {
    if (d === "Cloud Storage") {
      setShowGCP(true);
    } else {
      setShowGCP(false);
    }

    if (d === "S3") {
      setShowS3(true);
    } else {
      setShowS3(false);
    }
  };

  const closeS3 = (data) => {
    setShowS3(data);
  };

  const closeGcp = (data) => {
    setShowGCP(data);
  };
  const closeForm = (data) => {
    setForm(data);
  };

  const submit = (e) => {
    history.push(`/services/${e.target.id}`);
    window.location.reload();
  };
  //console.log(subMenuList.data.providerTypeList,'list');

  if (loading) {
    return <Loading />;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0.5} className="existinglist-maingrid">
        <Grid className="existinglist-header" xs={12}>
          <Header />
        </Grid>
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
        <Grid className="existinglist-title" xs={12}>
          <h2>Projects List</h2>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid className="existinglist-body" xs={10}>
          <div className="projectsList">
            {mainMenu.map((text, index) => {
              // <div  key ={text} className='list-item' id={text} onClick={createSubmenu}>{text}</div>
              return (
                <div className="card">
                  <div
                    className={classes.Card1}
                    id={text}
                    sx={{ borderRadius: "20px", boxShadow: 3 }}
                    onClick={createSubmenu}
                  >
                    <h3 className="title">{text}</h3>
                    <div className="bar">
                      <div className="emptybar"></div>
                      <div className="filledbar"></div>
                    </div>
                    <div className="created">Created: </div>
                    <div className="modified">Last modified: </div>
                  </div>
                </div>
              );
            })}{" "}
          </div>
          <div className="services">
            <div className="projectService">
              {subMenuList?.data?.providerTypeList?.map((val) => {
                return (
                  <div className="card-container">
                    <Card className={classes.Card} id={val} sx={{ borderRadius: "20px", boxShadow: 3 }}>
                      <img
                        src={val === "aws" ? Amazon : val === "azure" ? Azur : val === "gcp" ? Google : ""}
                        className="serviceLogos"
                        id={val}
                        onClick={(e) => {
                          submit(e);
                        }}
                      />
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          {form ? params.id === "aws" ? <AWS closeForm={closeForm} /> : "" : ""}

          {form ? params.id === "gcp" ? <GCP closeForm={closeForm} /> : "" : ""}
          {form ? params.id === "azure" ? <Azure closeForm={closeForm} /> : "" : ""}
          {showS3 && !form ? <S3Bucket closeS3={closeS3} /> : ""}

          {showGCP && !form && !showS3 ? <GCPCould closeGcp={closeGcp} /> : ""}
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid className="existinglist-footer" xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </Box>
  );
}
