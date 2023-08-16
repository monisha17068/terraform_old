import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import "../styles/AwsTemplate.css";
import { Row, Col } from "react-bootstrap";
import FormGroup from "@mui/material/FormGroup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@mui/material/InputLabel";
import Alert from "@mui/material/Alert";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import history from "../../history";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { width } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import RemoveIcon from "@mui/icons-material/Remove";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
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
    margin: theme.spacing(2, 0, 2),
  },
}));

let token = localStorage.getItem("token");
let tempArray = [];

export default function AwsTemplate(props) {
  const classes = useStyles();
  const params = useParams();
  let navigate = useNavigate();

  // VPC states
  const [vpcName, setVpcName] = useState("");
  const [cidrRange, setCidrRange] = useState("");
  const [tenancy, setTenancy] = useState("");
  const [region, setRegion] = useState("");
  const [zone, setZone] = useState([]);
  const [selectZone, setSelectZone] = useState("");
  const [selectZone1, setSelectZone1] = useState("");
  const [selectZone2, setSelectZone2] = useState("");
  const [numberOfZone, setNumberOfZone] = useState(1);
  const [listOfZone, setListOfZone] = useState([]);
  const [totalPublicSubnet, setTotalPublicSubnet] = useState(0);
  const [publicSubnet1, setPublicSubnet1] = useState("");
  const [publicSubnet2, setPublicSubnet2] = useState("");
  const [publicSubnet3, setPublicSubnet3] = useState("");
  const [totalPrivateSubnet, setTotalPrivateSubnet] = useState(0);
  const [privateSubnet1, setPrivateSubnet1] = useState("");
  const [privateSubnet2, setPrivateSubnet2] = useState("");
  const [privateSubnet3, setPrivateSubnet3] = useState("");
  const [dnsHostName, setDnsHostName] = useState(false);

  // EC2 states
  const [os, setOs] = useState();
  const [ami, setAmi] = useState();
  const [Ami, SetAmi] = useState();
  const [arc, setArc] = useState();
  const [Arc, setarc] = useState();
  const [machineType, setMachineType] = useState();
  const [instanceType, setInstanceType] = useState();
  const [keyPair, setKeypair] = useState();
  const [selectKeyPair, setSelectKeyPair] = useState([]); //all the existing key pair
  const [vpcId, setVpcId] = useState();
  const [selectVpcID, setSelectVpcID] = useState([]); //vpc data based on region selected
  const [vpcSubnet, setVpcSubnet] = useState();
  const [selectSubnet, setSelectSubnet] = useState([]); // all subnet  value
  const [selectSubnetOption, setSelectSubnetOption] = useState([]); // subnet option values for dropdown
  const [autoAssignIP, setAutoAssignIP] = useState();
  const [firewall, setFirewall] = useState();
  const [selectFirewall, setSelectFirewall] = useState([]); // firewall security group dropdown value
  const [selectFirewallOption, setSelectFirewallOption] = useState([]); // firewall security group option values for dropdown
  const [volumeSize, setVolumeSize] = useState();
  const [volumeType, setVolumeType] = useState();

  // RDS states
  const [dataBaseName, setDataBaseName] = useState("");
  const [allocationStorage, setAllocationStorage] = useState("");
  const [storageType, setStorageType] = useState("");
  const [rdsKeypair, setRdsKeypair] = useState("");
  const [engine, setEngine] = useState("");
  const [engineVersion, setEngineVersion] = useState("");
  const [instanceClass, setInstanceClass] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  //s3 states
  const [acl, setAcl] = useState("");
  const [bucketName, setBucketName] = useState();

  const [inputList, setInputList] = useState([{ bucket: "", id: Math.random(10) }]);

  // for validation
  const [formError, setFormError] = useState({ accesskey: "", cidrRange: "", region: "", subnet: "" });
  const dataTemp = useLocation();

  console.log("awsTemplateProps", dataTemp.state.props);

  const handleNumberOfZone = (e) => {
    setNumberOfZone(e.target.value);
  };

  const handleTotalPublicSubnet = (e) => {
    setTotalPublicSubnet(e.target.value);
  };

  const handleTotalPrivateSubnet = (e) => {
    setTotalPrivateSubnet(e.target.value);
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
  const tenancyDropDown = (e) => {
    if ((e.target.name = "tenancy")) {
      setTenancy(e.target.value);
      if (!tenancy) {
        setFormError((oldState) => ({ ...oldState, tenancy: " " }));
      }
    }
  };

  const dnsDropdown = (e) => {
    setDnsHostName(e.target.checked);
    if (!dnsHostName) {
      setFormError((oldState) => ({ ...oldState, dnsHostName: "" }));
    }
  };

  const dropDown1 = (e) => {
    if (e.target.name === "zone") {
      setSelectZone(e.target.value);
      tempArray.push(e.target.value);
      if (!selectZone) {
        setFormError((oldState) => ({ ...oldState, zone: " " }));
      }
    }

    if (e.target.name === "zone1") {
      setSelectZone1(e.target.value);
      tempArray.push(e.target.value);
      if (!selectZone1) {
        setFormError((oldState) => ({ ...oldState, zone: " " }));
      }
    }

    if (e.target.name === "zone2") {
      setSelectZone2(e.target.value);
      tempArray.push(e.target.value);
      if (!selectZone2) {
        setFormError((oldState) => ({ ...oldState, zone: " " }));
      }
    }
    setListOfZone(tempArray);
  };

  const dropDown = (e) => {
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

      axios
        .get(`http://3.109.115.30:8080/ec2-keypair/${e.target.value}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setSelectKeyPair(res.data);
        });
      console.log("keypair data", selectKeyPair);

      axios
        .get(`http://3.109.115.30:8080/vpc-id/${e.target.value}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setSelectVpcID(res.data);
        });

      axios
        .get(`http://3.109.115.30:8080/ec2-subnet/${e.target.value}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("forSubnet", res.data);
          setSelectSubnet(res.data);
        });

      axios
        .get(`http://3.109.115.30:8080/ec2-security-group/${e.target.value}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("setSelectFirewall", res.data);
          setSelectFirewall(res.data);
        });
    }
    if (e.target.name === "zone") {
      setSelectZone(e.target.value);
      if (!selectZone) {
        setFormError((oldState) => ({ ...oldState, zone: " " }));
      }
    }
    if (e.target.name === "subnet") {
      setSubnet(e.target.name);
      if (!subnet) {
        setFormError((oldState) => ({ ...oldState, subnet: "" }));
      }
    }

    if (e.target.name === "os") {
      setOs(e.target.value);
      axios
        .get(`http://3.109.115.30:8080/get-machine-images/${e.target.value}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("ami value ", res.data);
          setAmi(res.data);
          if (os) {
            setFormError((oldState) => ({ ...oldState, os: "" }));
          }
        });
    }
    if (e.target.name === "ami") {
      SetAmi(e.target.value);
      let arc = ami.filter((val, i) => {
        return val.name === e.target.value;
      });
      setArc(arc[0].machineImageDetails);
      if (ami) {
        setFormError((oldState) => ({ ...oldState, ami: "" }));
      }
    }

    if (e.target.name === "arc") {
      setarc(e.target.value);
      let machine = arc.filter((val, i) => {
        return val.architecture === e.target.value;
      });
      setMachineType(machine[0].amiId);
      if (arc) {
        setFormError((oldState) => ({ ...oldState, arc: "" }));
      }
    }
    if (e.target.name === "instanceType") {
      setInstanceType(e.target.value);
      if (!instanceType) {
        setFormError((oldState) => ({ ...oldState, instanceType: "" }));
      }
    }
    if (e.target.name === "keyPair") {
      setKeypair(e.target.value);
      if (!keyPair) {
        setFormError((oldState) => ({ ...oldState, keyPair: "" }));
      }
    }
    if (e.target.name === "vpcId") {
      setVpcId(e.target.value);
      let subnetSelectionData = selectSubnet.filter((item) => {
        return item.vpcId === e.target.value;
      });
      setSelectSubnetOption(subnetSelectionData);
      let firewallSelectionData = selectFirewall.filter((item) => {
        return item.vpcId === e.target.value;
      });
      setSelectFirewallOption(firewallSelectionData);
      if (!vpcId) {
        setFormError((oldState) => ({ ...oldState, vpcId: "" }));
      }
    }
    if (e.target.name === "vpcsubnet") {
      setVpcSubnet(e.target.value);
      if (!subnet) {
        setFormError((oldState) => ({ ...oldState, subnet: "" }));
      }
    }
    if (e.target.name === "autoAssignIP") {
      setAutoAssignIP(e.target.value);
      if (!autoAssignIP) {
        setFormError((oldState) => ({ ...oldState, autoAssignIP: "" }));
      }
    }
    if (e.target.name === "firewall") {
      setFirewall(e.target.value);
      if (!firewall) {
        setFormError((oldState) => ({ ...oldState, firewall: "" }));
      }
    }
    if (e.target.name === "volumeType") {
      setVolumeType(e.target.value);
      if (!volumeType) {
        setFormError((oldState) => ({ ...oldState, volumeType: "" }));
      }
    }
  };

  let token = localStorage.getItem("token");
  const Submit = (e) => {
    console;
    e.preventDefault();
    // Validation();

    if (vpcName && cidrRange && region) {
      let data = {
        publicSubnetsCidr: ["10.0.1.0/24", "10.0.16.0/20"],
        privateSubnetsCidr: ["10.0.10.0/24", "10.0.144.0/20"],
        availabilityZone: listOfZone,
        userId: dataTemp.state.props.userId,
        providerType: dataTemp.state.props.providerType,
        regionName: region,
        name: vpcName,
        projectName: dataTemp.state.props.projectName,
        cidrRange: cidrRange,
        instanceTenancy: tenancy,
        dnsHostNames: dnsHostName,
      };

      // let data1 = {
      //     userId:302,
      //     providerType:"aws",
      //     projectName:"Indium-Test2",
      //     region:"us-east-1",
      //     vpcCidr:"10.0.0.0/16",
      //     publicSubnetCidr:"10.0.1.0/24",
      //     privateSubnetsCidr:["10.0.10.0/24","10.0.144.0/20"],
      //     privateSubnetsAzs:["us-east-1a", "us-east-1b"],
      //     instanceTenancy:"default",
      //     availabilityZone:"us-east-1a",
      //     amiId:"ami-0b0dcb5067f052a63",
      //     instanceType:"t2.micro",
      //     volumeSize:30,
      //     volumeType:"gp2",
      //     name:"my-ec2-instance3",
      //     ec2RootSize:20,
      //     ec2RootType:"gp2",
      //     keyPairName : "my-ssh-key",
      //     bucketNames:["chennai-89", "avengers-19"],
      //     acl:"private",
      //     versioningEnabled:true,
      //     dbName : "testdb9",
      //     allocatedStorage : 20,
      //     storageType : "gp2",
      //     engine : "mysql",
      //     engineVersion : "5.7",
      //     instanceClass :"db.t2.micro",
      //     userName : "root",
      //     password : "foobarbaz",
      //     family:"mysql5.7"
      //     }

      console.log("dataxxfdx", data);

      // axios
      //   .post(`http://3.109.115.30:8080/api/aws-template`, data, {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`,
      //     },
      //   })
      //   .then((result) => {
      //     if (result.data.status === true) {
      //       setSuccess(true);
      //     }
      //   })
      //   .catch((err) => {
      //     if (err) {
      //       setFail(true);
      //     }
      // });
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0.5} className="projects-maingrid">
        <Grid className="projects-header" xs={12}>
          <Header />
        </Grid>
        <div className="ServicesContainer" style={{ alignItems: "normal" }}>
          <div className={classes.paper} style={{ marginTop: "18px" }}>
            <Typography component="h1" variant="h6" style={{ fontWeight: "bold" }}>
              CREATE STACK
            </Typography>
            <div className="alert"></div>
            {fail ? (
              <Alert
                onClose={() => {
                  setFail(false);
                }}
                severity="error"
              >
                Failed!
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
            <div className="closeicon">
              <IconButton
                aria-label="close"
                onClick={
                  () => navigate(-1)
                  // props.closeForm(false);
                  // window.location.reload();
                }
              >
                <CloseIcon />
              </IconButton>
            </div>
            <div className="awsTempFlexContainer">
              <form
                // className={classes.form}
                className="awsTempFlexContainer"
                noValidate
                onSubmit={(e) => {
                  Submit(e);
                }}
              >
                {/* card1 template VPC */}
                <div className="awsTempFlexitem awstempitem1" id="style">
                  {/* <Typography component="h4" variant="h6" >
                    VPC DETAILS
                  </Typography> */}
                  <div className="template-subheading">
                    <h3>VPC</h3>
                  </div>
                  <InputLabel id="demo-simple-select-required-label">VPC Name</InputLabel>
                  <TextField
                    variant="outlined"
                    // margin="normal"
                    required
                    fullWidth
                    id="email"
                    // label="VPC Name"
                    name="email"
                    type="text"
                    placeholder="VPC Name"
                    value={vpcName}
                    onChange={(e) => {
                      setVpcName(e.target.value);
                    }}
                    onFocus={() => {
                      setFormError((oldState) => ({ ...oldState, vpcName: "" }));
                    }}
                    onBlur={() => {
                      if (!vpcName) {
                        setFormError((oldState) => ({ ...oldState, vpcName: "*required" }));
                      }
                    }}
                  />
                  <span style={{ color: "red" }}>{formError.vpcName}</span>
                  <InputLabel id="demo-simple-select-required-label">CIDR Range</InputLabel>
                  <TextField
                    variant="outlined"
                    // margin="normal"
                    required
                    fullWidth
                    id="email"
                    // label="cidrRange"
                    name="email"
                    type="text"
                    placeholder="CIDR Range"
                    value={cidrRange}
                    onChange={(e) => {
                      setCidrRange(e.target.value);
                    }}
                    onFocus={() => {
                      setFormError((oldState) => ({ ...oldState, cidrRange: "" }));
                    }}
                    onBlur={() => {
                      if (!cidrRange) {
                        setFormError((oldState) => ({ ...oldState, cidrRange: "*required" }));
                      }
                    }}
                  />
                  <span style={{ color: "red" }}>{formError.cidrRange}</span>
                  <InputLabel id="demo-simple-select-required-label">Tenancy</InputLabel>
                  <select
                    value={tenancy}
                    className="drop-down"
                    name="tenancy"
                    onChange={(e) => {
                      tenancyDropDown(e);
                    }}
                  >
                    <option value="">Tenancy value</option>
                    <option value="default">Default</option>
                    <option value="dedicated">Dedicated</option>
                  </select>
                  <span style={{ color: "red" }}>{formError.tenancy}</span>
                  <InputLabel id="demo-simple-select-label">Region</InputLabel>
                  <select
                    value={region}
                    className="drop-down"
                    name="region"
                    id="style"
                    onChange={(e) => {
                      dropDown(e);
                    }}
                  >
                    <option value="">Region</option>
                    {dataTemp.state.props.region?.map((val, i) => {
                      return (
                        <option value={val.location}>
                          {val.name}
                          {", "}
                          {val.location}
                        </option>
                      );
                    })}
                  </select>
                  <span style={{ color: "red" }}>{formError.region}</span>
                  <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group" style={{ color: "#666666" }}>
                      Number of Availability Zones
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={numberOfZone}
                      onChange={handleNumberOfZone}
                      className="awsTempRadio"
                      style={{ justifyContent: "space-around", margin: "-15px 0px" }}
                    >
                      <FormControlLabel value={1} control={<Radio />} label={`1 Zone`} />
                      <FormControlLabel value={2} control={<Radio />} label={`2 Zone`} />
                      <FormControlLabel value={3} control={<Radio />} label={`3 Zone`} />
                    </RadioGroup>
                  </FormControl>
                  {numberOfZone == 1 && (
                    <>
                      <InputLabel id="demo-simple-select-required-label">First availability zone</InputLabel>
                      <select
                        value={selectZone}
                        className="drop-down"
                        name="zone"
                        onChange={(e) => {
                          dropDown1(e);
                        }}
                      >
                        <option value="">Zone</option>
                        {zone?.map((val, i) => {
                          return <option value={val.zone}>{val.zone}</option>;
                        })}
                      </select>
                      <span style={{ color: "red" }}>{formError.zone}</span>
                    </>
                  )}
                  {numberOfZone == 2 && (
                    <>
                      <InputLabel id="demo-simple-select-required-label">First availability zone</InputLabel>
                      <select
                        value={selectZone}
                        className="drop-down"
                        name="zone"
                        onChange={(e) => {
                          dropDown1(e);
                        }}
                      >
                        <option value="">Zone</option>
                        {zone?.map((val, i) => {
                          return <option value={val.zone}>{val.zone}</option>;
                        })}
                      </select>
                      <span style={{ color: "red" }}>{formError.zone}</span>
                      <InputLabel id="demo-simple-select-required-label">Second availability zone</InputLabel>
                      <select
                        value={selectZone1}
                        className="drop-down"
                        name="zone1"
                        onChange={(e) => {
                          dropDown1(e);
                        }}
                      >
                        <option value="">Zone</option>
                        {zone?.map((val, i) => {
                          return <option value={val.zone}>{val.zone}</option>;
                        })}
                      </select>
                      <span style={{ color: "red" }}>{formError.zone}</span>
                    </>
                  )}
                  {numberOfZone == 3 && (
                    <>
                      <InputLabel id="demo-simple-select-required-label">First availability zone</InputLabel>
                      <select
                        value={selectZone}
                        className="drop-down"
                        name="zone"
                        onChange={(e) => {
                          dropDown1(e);
                        }}
                      >
                        <option value="">Zone</option>
                        {zone?.map((val, i) => {
                          return <option value={val.zone}>{val.zone}</option>;
                        })}
                      </select>
                      <span style={{ color: "red" }}>{formError.zone}</span>
                      <InputLabel id="demo-simple-select-required-label">Second availability zone</InputLabel>
                      <select
                        value={selectZone1}
                        className="drop-down"
                        name="zone1"
                        onChange={(e) => {
                          dropDown1(e);
                        }}
                      >
                        <option value="">Zone</option>
                        {zone?.map((val, i) => {
                          return <option value={val.zone}>{val.zone}</option>;
                        })}
                      </select>
                      <span style={{ color: "red" }}>{formError.zone}</span>

                      <InputLabel id="demo-simple-select-required-label">Third availability zone</InputLabel>
                      <select
                        value={selectZone2}
                        className="drop-down"
                        name="zone2"
                        onChange={(e) => {
                          dropDown1(e);
                        }}
                      >
                        <option value="">Zone</option>
                        {zone?.map((val, i) => {
                          return <option value={val.zone}>{val.zone}</option>;
                        })}
                      </select>
                      <span style={{ color: "red" }}>{formError.zone}</span>
                    </>
                  )}
                  <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group" style={{ color: "#666666" }}>
                      Number of Public Subnets
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="publicSubnet"
                      value={totalPublicSubnet}
                      className="awsTempRadioPublicSubnet"
                      onChange={handleTotalPublicSubnet}
                      style={{ justifyContent: "space-between", margin: "-15px 0px" }}
                    >
                      <FormControlLabel value={0} control={<Radio />} label={`0 Public Subnets`} />
                      <FormControlLabel
                        value={numberOfZone}
                        control={<Radio />}
                        label={`${numberOfZone} Public Subnets`}
                      />
                    </RadioGroup>
                  </FormControl>
                  {totalPublicSubnet == 1 && (
                    <>
                      <InputLabel id="demo-simple-select-required-label">Public Subnet 1</InputLabel>
                      <TextField
                        variant="outlined"
                        // margin="normal"
                        required
                        fullWidth
                        id="email"
                        // label="cidrRange"
                        name="email"
                        type="text"
                        value={publicSubnet1}
                        onChange={(e) => {
                          setPublicSubnet1(e.target.value);
                        }}
                        onFocus={() => {
                          setFormError((oldState) => ({ ...oldState, publicSubnet1: "" }));
                        }}
                        onBlur={() => {
                          if (!publicSubnet1) {
                            setFormError((oldState) => ({ ...oldState, publicSubnet1: "*required" }));
                          }
                        }}
                      />
                      <span style={{ color: "red" }}>{formError.publicSubnet1}</span>
                    </>
                  )}
                  {totalPublicSubnet == 2 && (
                    <>
                      <InputLabel id="demo-simple-select-required-label">Public Subnet 1</InputLabel>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        type="text"
                        value={publicSubnet1}
                        onChange={(e) => {
                          setPublicSubnet1(e.target.value);
                        }}
                        onFocus={() => {
                          setFormError((oldState) => ({ ...oldState, publicSubnet1: "" }));
                        }}
                        onBlur={() => {
                          if (!publicSubnet1) {
                            setFormError((oldState) => ({ ...oldState, publicSubnet1: "*required" }));
                          }
                        }}
                      />
                      <span style={{ color: "red" }}>{formError.publicSubnet1}</span>
                      <InputLabel id="demo-simple-select-required-label">Public Subnet 2</InputLabel>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        type="text"
                        value={publicSubnet2}
                        onChange={(e) => {
                          setPublicSubnet2(e.target.value);
                        }}
                        onFocus={() => {
                          setFormError((oldState) => ({ ...oldState, publicSubnet2: "" }));
                        }}
                        onBlur={() => {
                          if (!publicSubnet2) {
                            setFormError((oldState) => ({ ...oldState, publicSubnet2: "*required" }));
                          }
                        }}
                      />
                      <span style={{ color: "red" }}>{formError.publicSubnet2}</span>
                    </>
                  )}
                  {totalPublicSubnet == 3 && (
                    <>
                      <InputLabel id="demo-simple-select-required-label">Public Subnet 1</InputLabel>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        type="text"
                        value={publicSubnet1}
                        onChange={(e) => {
                          setPublicSubnet1(e.target.value);
                        }}
                        onFocus={() => {
                          setFormError((oldState) => ({ ...oldState, publicSubnet1: "" }));
                        }}
                        onBlur={() => {
                          if (!publicSubnet1) {
                            setFormError((oldState) => ({ ...oldState, publicSubnet1: "*required" }));
                          }
                        }}
                      />
                      <span style={{ color: "red" }}>{formError.publicSubnet1}</span>
                      <InputLabel id="demo-simple-select-required-label">Public Subnet</InputLabel>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        type="text"
                        value={publicSubnet2}
                        onChange={(e) => {
                          setPublicSubnet2(e.target.value);
                        }}
                        onFocus={() => {
                          setFormError((oldState) => ({ ...oldState, publicSubnet2: "" }));
                        }}
                        onBlur={() => {
                          if (!publicSubnet2) {
                            setFormError((oldState) => ({ ...oldState, publicSubnet2: "*required" }));
                          }
                        }}
                      />
                      <span style={{ color: "red" }}>{formError.publicSubnet2}</span>
                      <InputLabel id="demo-simple-select-required-label">Public Subnet 3</InputLabel>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        type="text"
                        value={publicSubnet3}
                        onChange={(e) => {
                          setPublicSubnet3(e.target.value);
                        }}
                        onFocus={() => {
                          setFormError((oldState) => ({ ...oldState, publicSubnet3: "" }));
                        }}
                        onBlur={() => {
                          if (!publicSubnet3) {
                            setFormError((oldState) => ({ ...oldState, publicSubnet3: "*required" }));
                          }
                        }}
                      />
                      <span style={{ color: "red" }}>{formError.publicSubnet3}</span>
                    </>
                  )}
                  {/* private subnet details  */}
                  <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group" style={{ color: "#666666" }}>
                      Number of Private Subnets
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="privateSubnet"
                      value={totalPrivateSubnet}
                      className="awsTempRadioPrivateSubnet"
                      onChange={handleTotalPrivateSubnet}
                      style={{ justifyContent: "start", margin: "-10px -15px" }}
                    >
                      <FormControlLabel value={0} control={<Radio />} label={`0 Private Subnets`} />
                      <FormControlLabel
                        value={numberOfZone}
                        control={<Radio />}
                        label={`${numberOfZone} Private Subnets`}
                      />
                    </RadioGroup>
                  </FormControl>
                  {totalPrivateSubnet == 1 && (
                    <>
                      <InputLabel id="demo-simple-select-required-label">Private Subnet 1</InputLabel>
                      <TextField
                        variant="outlined"
                        // margin="normal"
                        required
                        fullWidth
                        id="email"
                        // label="cidrRange"
                        name="email"
                        type="text"
                        value={privateSubnet1}
                        onChange={(e) => {
                          setPrivateSubnet1(e.target.value);
                        }}
                        onFocus={() => {
                          setFormError((oldState) => ({ ...oldState, privateSubnet1: "" }));
                        }}
                        onBlur={() => {
                          if (!privateSubnet1) {
                            setFormError((oldState) => ({ ...oldState, privateSubnet1: "*required" }));
                          }
                        }}
                      />
                      <span style={{ color: "red" }}>{formError.privateSubnet1}</span>
                    </>
                  )}
                  {totalPrivateSubnet == 2 && (
                    <>
                      <InputLabel id="demo-simple-select-required-label">Private Subnet 1</InputLabel>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        type="text"
                        value={privateSubnet1}
                        onChange={(e) => {
                          setPrivateSubnet1(e.target.value);
                        }}
                        onFocus={() => {
                          setFormError((oldState) => ({ ...oldState, privateSubnet1: "" }));
                        }}
                        onBlur={() => {
                          if (!privateSubnet1) {
                            setFormError((oldState) => ({ ...oldState, privateSubnet1: "*required" }));
                          }
                        }}
                      />
                      <span style={{ color: "red" }}>{formError.privateSubnet1}</span>
                      <InputLabel id="demo-simple-select-required-label">Private Subnet 2</InputLabel>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        type="text"
                        value={privateSubnet2}
                        onChange={(e) => {
                          setPrivateSubnet2(e.target.value);
                        }}
                        onFocus={() => {
                          setFormError((oldState) => ({ ...oldState, privateSubnet2: "" }));
                        }}
                        onBlur={() => {
                          if (!privateSubnet2) {
                            setFormError((oldState) => ({ ...oldState, privateSubnet2: "*required" }));
                          }
                        }}
                      />
                      <span style={{ color: "red" }}>{formError.privateSubnet2}</span>
                    </>
                  )}
                  {totalPrivateSubnet == 3 && (
                    <>
                      <InputLabel id="demo-simple-select-required-label">Private Subnet 1</InputLabel>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        type="text"
                        value={privateSubnet1}
                        onChange={(e) => {
                          setPrivateSubnet1(e.target.value);
                        }}
                        onFocus={() => {
                          setFormError((oldState) => ({ ...oldState, privateSubnet1: "" }));
                        }}
                        onBlur={() => {
                          if (!privateSubnet1) {
                            setFormError((oldState) => ({ ...oldState, privateSubnet1: "*required" }));
                          }
                        }}
                      />
                      <span style={{ color: "red" }}>{formError.privateSubnet1}</span>
                      <InputLabel id="demo-simple-select-required-label">Private Subnet 2</InputLabel>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        type="text"
                        value={privateSubnet2}
                        onChange={(e) => {
                          setPrivateSubnet2(e.target.value);
                        }}
                        onFocus={() => {
                          setFormError((oldState) => ({ ...oldState, privateSubnet2: "" }));
                        }}
                        onBlur={() => {
                          if (!privateSubnet2) {
                            setFormError((oldState) => ({ ...oldState, privateSubnet2: "*required" }));
                          }
                        }}
                      />
                      <span style={{ color: "red" }}>{formError.privateSubnet2}</span>
                      <InputLabel id="demo-simple-select-required-label">Private Subnet 3</InputLabel>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        type="text"
                        value={privateSubnet3}
                        onChange={(e) => {
                          setPrivateSubnet3(e.target.value);
                        }}
                        onFocus={() => {
                          setFormError((oldState) => ({ ...oldState, privateSubnet3: "" }));
                        }}
                        onBlur={() => {
                          if (!privateSubnet3) {
                            setFormError((oldState) => ({ ...oldState, privateSubnet3: "*required" }));
                          }
                        }}
                      />
                      <span style={{ color: "red" }}>{formError.privateSubnet3}</span>
                    </>
                  )}
                  <FormGroup className="awsTempcheckbox">
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      onChange={(e) => {
                        dnsDropdown(e);
                      }}
                      label="Enable DNS hostnames"
                    />
                  </FormGroup>
                </div>
                {/* card 2 template EC2 */}
                <div className="awsTempFlexitem awstempitem2" id="style">
                  <div className="template-subheading">
                    <h3>EC2</h3>
                  </div>
                  <InputLabel id="demo-simple-select-required-label">EC2 Name</InputLabel>
                  <TextField
                    variant="outlined"
                    placeholder="EC2 Name"
                    // margin="normal"
                    required
                    fullWidth
                    id="email"
                    // label="projectId"
                    name="EC2-name"
                    value={dataBaseName}
                    // onChange={(e) => {
                    //   setDataBaseName(e.target.value);
                    // }}
                    onFocus={() => {
                      setFormError((oldState) => ({ ...oldState, EC2: "" }));
                    }}
                    onBlur={() => {
                      if (!EC2) {
                        setFormError((oldState) => ({
                          ...oldState,
                          dataBaseName: "*required",
                        }));
                      }
                    }}
                  />
                  <span style={{ color: "red" }}>{formError.EC2}</span>

                  <InputLabel id="demo-simple-select-required-label">Os</InputLabel>
                  <select
                    value={os}
                    className="drop-down"
                    name="os"
                    onChange={(e) => {
                      dropDown(e);
                    }}
                  >
                    <option value="">Os</option>
                    {dataTemp.state.props.os?.map((val, i) => {
                      return <option value={val}>{val}</option>;
                    })}
                  </select>
                  <span style={{ color: "red" }}>{formError.os}</span>
                  <InputLabel id="demo-simple-select-required-label">Amazon Machine Images</InputLabel>
                  <select
                    value={Ami}
                    className="drop-down"
                    name="ami"
                    onChange={(e) => {
                      dropDown(e);
                    }}
                  >
                    <option value="">Ami</option>
                    {ami?.map((val, i) => {
                      return <option value={val.name}>{val.name}</option>;
                    })}
                  </select>
                  <span style={{ color: "red" }}>{formError.ami}</span>
                  <InputLabel id="demo-simple-select-required-label">Architecture</InputLabel>
                  <select
                    value={Arc}
                    className="drop-down"
                    name="arc"
                    onChange={(e) => {
                      dropDown(e);
                    }}
                  >
                    <option value="">Architecture</option>
                    {arc?.map((val, i) => {
                      return <option value={val.architecture}>{val.architecture}</option>;
                    })}
                  </select>
                  <span style={{ color: "red" }}>{formError.arc}</span>

                  <InputLabel id="demo-simple-select-required-label">AMI ID</InputLabel>
                  <TextField
                    variant="outlined"
                    placeholder="AMI ID based on OS selection"
                    required
                    disabled
                    fullWidth
                    id="email"
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
                  <InputLabel id="demo-simple-select-label">Instance Type</InputLabel>
                  <select
                    value={instanceType}
                    className="drop-down"
                    id="style"
                    onChange={(e) => {
                      dropDown(e);
                    }}
                  >
                    <option value="">Please select the value</option>
                    <option value="t2.micro">t2.micro</option>
                    <option value="t2.small">t2.small</option>
                    <option value="t2.medium">t2.medium</option>
                    <option value="t2.large">t2.large</option>
                    <option value="t2.xlarge">t2.xlarge</option>
                    <option value="t2.2xlarge">t2.2xlarge</option>
                    <option value="t3.micro">t3.micro</option>
                    <option value="t3.small">t3.small</option>
                    <option value="t3.medium">t3.medium</option>
                    <option value="t3.large">t3.large</option>
                  </select>
                  <span style={{ color: "red" }}>{formError.instanceType}</span>
                  <InputLabel id="demo-simple-select-required-label">Key Pair</InputLabel>
                  <select
                    value={keyPair}
                    className="drop-down"
                    name="keyPair"
                    onChange={(e) => {
                      dropDown(e);
                    }}
                  >
                    <option value="">Please select the keypair</option>
                    {selectKeyPair?.map((item) => {
                      return (
                        <option value={item.keyName}>
                          {item.keyPairId}
                          {","}
                          {""} Type:{item.keyType}
                        </option>
                      );
                    })}
                  </select>
                  <span style={{ color: "red" }}>{formError.keyPair}</span>

                  <InputLabel id="demo-simple-select-required-label"> VPC ID</InputLabel>
                  <select
                    value={vpcId}
                    className="drop-down"
                    name="vpcId"
                    onChange={(e) => {
                      dropDown(e);
                    }}
                  >
                    <option value="">Please select the VPC ID</option>
                    {selectVpcID?.map((item) => {
                      return <option value={item}>{item}</option>;
                    })}
                  </select>
                  <span style={{ color: "red" }}>{formError.vpcId}</span>

                  <InputLabel id="demo-simple-select-required-label">Subnet</InputLabel>
                  <select
                    value={vpcSubnet}
                    className="drop-down"
                    name="vpcsubnet"
                    onChange={(e) => {
                      dropDown(e);
                    }}
                  >
                    <option value="">Please select the Subnet</option>
                    {selectSubnetOption?.map((item) => {
                      return <option value={item.subnetId}>{item.subnetId}</option>;
                    })}
                  </select>
                  <span style={{ color: "red" }}>{formError.subnet}</span>

                  <InputLabel id="demo-simple-select-required-label">Auto-assign public IP</InputLabel>
                  <select
                    value={autoAssignIP}
                    className="drop-down"
                    name="autoAssignIP"
                    onChange={(e) => {
                      dropDown(e);
                    }}
                  >
                    <option value="">Please select the value</option>
                    <option value="enable">Enable</option>
                    <option value="disable">Disable</option>
                  </select>
                  <span style={{ color: "red" }}>{formError.autoAssignIP}</span>

                  <InputLabel id="demo-simple-select-required-label">Firewall (SecurityGroups)</InputLabel>
                  <select
                    value={firewall}
                    className="drop-down"
                    name="firewall"
                    onChange={(e) => {
                      dropDown(e);
                    }}
                  >
                    <option value="">Please select the Security Groups</option>
                    {selectFirewallOption?.map((item) => {
                      return <option value={item.groupId}>{item.groupId}</option>;
                    })}
                  </select>
                  <span style={{ color: "red" }}>{formError.firewall}</span>

                  <InputLabel id="demo-simple-select-required-label">Root Volume Size</InputLabel>
                  <TextField
                    variant="outlined"
                    placeholder="Volume Size"
                    type="number"
                    required
                    fullWidth
                    id="email"
                    min="8"
                    // label="projectId"
                    name="email"
                    value={volumeSize}
                    onChange={(e) => {
                      setVolumeSize(e.target.value);
                    }}
                    onFocus={() => {
                      setFormError((oldState) => ({ ...oldState, volumeSize: "" }));
                    }}
                    onBlur={() => {
                      if (!volumeSize) {
                        setFormError((oldState) => ({
                          ...oldState,
                          volumeSize: "*required",
                        }));
                      }
                    }}
                  />
                  <span style={{ color: "red" }}>{formError.volumeSize}</span>
                  <InputLabel id="demo-simple-select-required-label">Root Volume type</InputLabel>

                  <select
                    value={volumeType}
                    className="drop-down"
                    name="volumeType"
                    onChange={(e) => {
                      dropDown(e);
                    }}
                  >
                    <option value="">Please select the Value</option>
                    <option value="gp3">General purpose SSD (gp3)</option>
                    <option value="gp2">General purpose SSD (gp2)</option>
                    <option value="io1">Provisioned IOPS SSD (io1)</option>
                    <option value="io2">Provisioned IOPS SSD (io2)</option>
                    <option value="sc1">Cold HDD (sc1)</option>
                    <option value="st1">Throughput Optimized HDD (st1)</option>
                    <option value="standard">Magnetic (standard)</option>
                  </select>
                  <span style={{ color: "red" }}>{formError.volumeType}</span>
                </div>
                {/* card 3 template RDS */}
                <div className="awsTempFlexitem awstempitem2" id="style">
                  <div className="template-subheading">
                    <h3>RDS</h3>
                  </div>
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
                      setFormError((oldState) => ({ ...oldState, dataBaseName: "" }));
                    }}
                    onBlur={() => {
                      if (!dataBaseName) {
                        setFormError((oldState) => ({
                          ...oldState,
                          dataBaseName: "*required",
                        }));
                      }
                    }}
                  />
                  <span style={{ color: "red" }}>{formError.dataBaseName}</span>
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
                </div>
                {/* card 4 template S3 */}
                <div className="awsTempFlexitem awstempitem2" id="style">
                  <div className="template-subheading">
                    <h3>S3</h3>
                  </div>
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

                  <InputLabel id="demo-simple-select-label">ACL</InputLabel>
                  <select
                    value={acl}
                    className="drop-down"
                    id="style"
                    onChange={(e) => {
                      dropDown(e);
                    }}
                  >
                    <option value="private">Private</option>
                    <option value="public">Public</option>
                  </select>
                  <span style={{ color: "red" }}>{formError.acl}</span>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  type="submit"
                  style={{ position: "absolute", top: "90%" }}
                >
                  CREATE STACK
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Grid>
      <Grid className="projects-footer" xs={12}>
        <footer className="templateFooter">
          <div className="text-center">
            <p style={{ textAlign: "center" }}>Copyright &copy; - All Rights Reserved | Terms and Services | Privacy</p>
          </div>
        </footer>
      </Grid>
    </Box>
  );
}
