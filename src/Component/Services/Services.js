import * as React from "react";
import { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SettingsIcon from "@mui/icons-material/Settings";
import Fab from "@mui/material/Fab";
import { useParams } from "react-router-dom";
import Indium from "../../Assets/Logo/Icon.png";
import "../../Component/styles/styles.css";
import axios from "axios";
import GCP from "../../Component/GCP/GCPform";
import AWS from "../../Component/AWS/AWSform";
import Azure from "../Azure/AzureForm";
import S3Bucket from "../AWS/S3Bucket";
import GCPCould from "../../Component/GCP/GCPcould";
import Terraform from "../../Assets/Icons/Terraform-Logo.png";
import Amazon from "../../Assets/Icons/amazon-web-service.png";
import VPC from "../../Component/AWS/VPCForm";
import VPCGCP from "../../Component/GCP/VPCGCP";
import Header from "../../Component/Layout/Header";
import { margin } from "@mui/system";
import { FastForwardFilled } from "@ant-design/icons";
import Footer from "../../Component/Layout/Footer";
import VM from "../../Component/GCP/VM";
import EC2 from "../../Component/AWS/EC2";
import Hamburger from "hamburger-react";
import CloudSQL from "../../Component/GCP/cloudSQL";
import AWSRDS from "../../Component/AWS/RDS";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import AwsServices from "../../Component/AWS/AwsServices";
import GcpServices from "../../Component/GCP/GcpServices";
import AzureServices from "../Azure/AzureServices";

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

export default function Services(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [subMenu, setSubMenu] = useState(false);
  const [form, setForm] = useState(false);
  const [mainMenu, setMainmenu] = useState([]);
  const [subMenuList, setSubMenuList] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const [showS3, setShowS3] = useState(false);
  const [showGCP, setShowGCP] = useState(false);
  const [showGCPVPC, setShowGCPVPC] = useState(false);
  const [region, setRegion] = useState([]);
  const [gcpRegion, setGCPRegion] = useState([]);
  const [showVM, setShowVM] = useState(false);
  const [showVPC, setShowVPC] = useState();
  const [showEC2, setShowEC2] = useState(false);
  const [Volume, setVolume] = useState([]);
  const [os, setOs] = useState();
  const params = useParams();
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [showCloudSQL, setShowCloudSQL] = useState(false);
  const [showAWSRDS, setShowAWSRDS] = useState(false);
  const [userId, setUserId] = useState();
  const [awsServices, setAwsServices] = useState(false);
  const [gcpServices, setGcpServices] = useState(false);
  const [azureServices, setAzureServices] = useState(false);

  let navigate = useNavigate();
  // console.log("gcpRegion===from services", gcpRegion);
  // console.log("params===", params);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("userId");
    setUserId(userId);

    axios
      .get(`http://3.109.115.30:8080/awsRegions`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRegion(res.data);
      });

    axios
      .get(`http://3.109.115.30:8080/config-storage`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setVolume(res.data);
      });
    let data = {};
    axios
      .post(`http://3.109.115.30:8080/providers?providerType=${params.id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setMainmenu(data.data);
      });

    axios
      .get(`http://3.109.115.30:8080/gcpRegions`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setGCPRegion(res.data);
      });

    axios
      .get(`http://3.109.115.30:8080/ec2-operating-system`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOs(res.data);
      });
  }, [0]);
  const createSubmenu = (e) => {
    let token = localStorage.getItem("token");
    setSubMenu(true);
    let data = {};
    axios
      .get(`http://3.109.115.30:8080/provider-sub/${e.target.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setSubMenuList(data.data);
      });
  };

  const callBucket = (d) => {
    if (d === "Cloud Storage") {
      setShowGCP(true);
      setHamburgerOpen(false);
      setShowContent(false);
      setSubMenu(false);
    } else {
      setShowGCP(false);
    }

    if (d === "VPC network") {
      setShowGCPVPC(true);
      setHamburgerOpen(false);
      setShowContent(false);
      setSubMenu(false);
    } else {
      setShowGCPVPC(false);
    }

    if (d === "VMware Engine") {
      setShowVM(true);
      setHamburgerOpen(false);
      setShowContent(false);
      setSubMenu(false);
    } else {
      setShowVM(false);
    }
    if (d === "SQL") {
      // alert('this is cloudsql')
      setShowCloudSQL(true);
      setHamburgerOpen(false);
      setShowContent(false);
      setSubMenu(false);
    } else {
      setShowCloudSQL(false);
    }
    if (d === "VPC") {
      setShowVPC(true);
      setHamburgerOpen(false);
      setShowContent(false);
      setSubMenu(false);
    } else {
      setShowVPC(false);
    }
    if (d === "S3") {
      setShowS3(true);
      setHamburgerOpen(false);
      setShowContent(false);
      setSubMenu(false);
    } else {
      setShowS3(false);
    }
    if (d === "RDS") {
      setShowAWSRDS(true);
      setHamburgerOpen(false);
      setShowContent(false);
      setSubMenu(false);
    } else {
      setShowAWSRDS(false);
    }
    if (d === "EC2") {
      setShowEC2(true);
      setHamburgerOpen(false);
      setShowContent(false);
      setSubMenu(false);
    } else {
      setShowEC2(false);
    }
  };

  const closeS3 = (data) => {
    setShowS3(data);
    setShowContent(false);
    setSubMenu(false);
  };

  const closeGcp = (data) => {
    setShowGCP(data);
    setShowContent(false);
    setSubMenu(false);
  };

  const closeForm = (data) => {
    setForm(data);
    setShowVM(false);
    setShowEC2(false);
    setShowContent(false);
    setSubMenu(false);
  };
  const closeVPC = () => {
    setShowVPC(false);
    setShowContent(false);
    setSubMenu(false);
  };

  const closeGCPVPC = () => {
    setShowGCPVPC(false);
    setShowContent(false);
    setSubMenu(false);
  };
  const closeCloudSQL = () => {
    setShowCloudSQL(false);
    setShowContent(false);
    setSubMenu(false);
  };
  const closeAWSRDS = () => {
    setShowAWSRDS(false);
    setShowContent(false);
    setSubMenu(false);
  };
  // console.log(Volume, "volume");
  return (
    // <div className='mainServices'>
    <Box className="mainServices" sx={{ display: "flex" }}>
      <CssBaseline />

      <div>
        <AppBar className="appbar">
          <Toolbar>
            <IconButton
              className="hamburger"
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => {
                setShowContent(!showContent);
                setShowEC2(false);
                setAwsServices(false);
                setGcpServices(false);
                setAzureServices(false);
                setForm(false);
                setSubMenu(false);
                setShowGCP(false);
                setShowGCPVPC(false);
                setShowVM(false);
                setShowCloudSQL(false);
                setShowVPC(false);
                setShowS3(false);
                setShowAWSRDS(false);
                // window.location.reload();
              }}
            >
              <Hamburger toggled={hamburgerOpen} toggle={setHamburgerOpen} />
            </IconButton>

            <div className="title-container">
              <span
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  minWidth: "8rem",
                }}
              >
                {" "}
                {`${params.id}`} services
              </span>
              <div className="mainLogo">
                <img src={`/Images/${params.id}.png`} alt="Logo" style={{ height: "60px" }} />
              </div>
              <span style={{ width: "16rem" }}>
                {/* <div className="back-backbutton">
                  <Button
                    className="back"
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
                </div> */}
                <div className="configbutton">
                  <span style={{ fontWeight: "bold" }}>
                    {" "}
                    Configure
                    <IconButton
                      size="large"
                      edge="end"
                      color="inherit"
                      aria-label="menu"
                      sx={{ mr: 0 }}
                      onClick={() => {
                        setForm(!form);
                        setAwsServices(!awsServices);
                        setGcpServices(!gcpServices);
                        setAzureServices(!azureServices);
                        setHamburgerOpen(false);
                        setShowContent(false);
                      }}
                    >
                      <SettingsIcon />
                    </IconButton>
                  </span>
                </div>
              </span>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      {!form && !showContent && !showGCP && !showEC2 && !showS3 && !showVPC && !showVM && !showCloudSQL && !showAWSRDS && !showGCPVPC  ? (
        <div className="ServicesContainerAws" style={{ position: "absolute" }}>
          {params.id === "aws" ? (
            <AwsServices
              region={region}
              projectName={params.projectName}
              providerType={params.id}
              userId={userId}
              os={os}
            />
          ) : (
            " "
          )}
          {params.id === "gcp" ? <GcpServices /> : " "}
          {params.id === "azure" ? <AzureServices /> : " "}
        </div>
      ) : (
        " "
      )}
      <div className="list-1" id="style">
        {showContent && !form ? (
          <List>
            {mainMenu.map((text, index) => (
              <div key={index} className="list-item" id={text.id} onClick={createSubmenu}>
                {text.name}
              </div>
            ))}
          </List>
        ) : (
          ""
        )}
      </div>
      <div className="list-2" id="style">
        {subMenu && !form && !showGCP && !showEC2 && !showS3 && !showVPC && !showVM && !showCloudSQL && !showAWSRDS && !showGCPVPC ? (
          <List>
            {subMenuList.map((text, index) => (
              <div
                key={index}
                className="list-item"
                onClick={() => {
                  callBucket(text.name);
                }}
              >
                {text.name}
              </div>
            ))}
          </List>
        ) : (
          ""
        )}
      </div>

      {form ? (
        params.id === "aws" ? (
          <AWS closeForm={closeForm} region={region} projectName={params.projectName} />
        ) : (
          ""
        )
      ) : (
        ""
      )}

      {form ? params.id === "gcp" ? <GCP closeForm={closeForm} region={region} /> : "" : ""}
      {form ? params.id === "azure" ? <Azure closeForm={closeForm} region={region} /> : "" : ""}
      {showS3 && !form ? <S3Bucket closeS3={closeS3} projectName={params.projectName} /> : ""}

      {showGCP && !form && !showS3 ? <GCPCould closeGcp={closeGcp} /> : ""}
      {showVPC && !showGCP && !form && !showS3 ? (
        <VPC
          closeForm={closeVPC}
          region={region}
          projectName={params.projectName}
          userId={userId}
          providerType={params.id}
        />
      ) : (
        ""
      )}
      {showGCPVPC && !form ? <VPCGCP closeForm={closeGCPVPC} region={region} /> : ""}
      {showVM && !showGCP && !showVPC && !showGCPVPC ? <VM closeForm={closeForm} region={gcpRegion} /> : ""}
      {showEC2 && !showVPC && !showGCP && !form && !showS3 ? (
        <EC2
          closeForm={closeForm}
          region={region}
          os={os}
          Volume={Volume}
          projectName={params.projectName}
          userId={userId}
          providerType={params.id}
        />
      ) : (
        ""
      )}
      {showCloudSQL && !showEC2 && !showVPC && !showGCP && !form && !showS3 ? (
        <CloudSQL
          closeForm={closeCloudSQL}
          region={region}
          projectName={params.projectName}
          projectId={params.id}
          userId={userId}
        />
      ) : (
        ""
      )}
      {showAWSRDS && !showCloudSQL && !showEC2 && !showVPC && !showGCP && !form && !showS3 ? (
        <AWSRDS
          closeForm={closeAWSRDS}
          region={region}
          userId={userId}
          providerType={params.id}
          projectName={params.projectName}
        />
      ) : (
        ""
      )}

      <div className="back-backbutton">
        <Button
          className="back"
          type="submit"
          // fullWidth
          variant="contained"
          color="primary"
          name="back"
          onClick={() => navigate(-1)}
        >
          <Grid container direction="row" alignItems="center" style={{ padding: "5px 0px" }}>
            <KeyboardArrowLeftIcon /> Back
          </Grid>
        </Button>
      </div>

      <Footer />
    </Box>

    // </div>
  );
}
