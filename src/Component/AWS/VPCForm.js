import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Logo from "../../Assets/Icons/Icon.png";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Dialog } from "@mui/material";
import "../../Component/styles/styles.css";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import history from "../../history";
import CancelIcon from "@mui/icons-material/Cancel";
import InputLabel from "@mui/material/InputLabel";
import awsVPC from "../../Assets/Icons/awsVPC.png";
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
let tempArray = [];
export default function VPC(props) {
  const classes = useStyles();
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

  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [dnsHostName, setDnsHostName] = useState(true);
  const [formError, setFormError] = useState({ vpcName: "", cidrRange: "", tenancy: "", region: "", subnet: "" });

  const Validation = () => {
    if (!vpcName) {
      setFormError((oldState) => ({ ...oldState, vpcName: "*required" }));
    }
    if (!cidrRange) {
      setFormError((oldState) => ({ ...oldState, cidrRange: "*required" }));
    }
    if (!tenancy) {
      setFormError((oldState) => ({ ...oldState, tenancy: "*required" }));
    }
    if (!region) {
      setFormError((oldState) => ({ ...oldState, region: "*required" }));
    }
    if (!zone) {
      setFormError((oldState) => ({ ...oldState, zone: "*required" }));
    }
  };

  const handleNumberOfZone = (e) => {
    setNumberOfZone(e.target.value);
  };

  const handleTotalPublicSubnet = (e) => {
    setTotalPublicSubnet(e.target.value);
  };

  const handleTotalPrivateSubnet = (e) => {
    setTotalPrivateSubnet(e.target.value);
  };

  const dropDown = (e) => {
    setRegion(e.target.value);
    if (!region) {
      setFormError((oldState) => ({ ...oldState, region: "" }));
    }
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

  let token = localStorage.getItem("token");
  const Submit = (e) => {
    e.preventDefault();
    Validation();

    if (vpcName && cidrRange && region) {
      let data = {
        publicSubnetsCidr: ["10.0.1.0/24", "10.0.16.0/20"],
        privateSubnetsCidr: ["10.0.10.0/24", "10.0.144.0/20"],
        availabilityZone: listOfZone,
        userId: props.userId,
        providerType: props.providerType,
        regionName: region,
        name: vpcName,
        projectName: props.projectName,
        cidrRange: cidrRange,
        instanceTenancy: tenancy,
        dnsHostNames: dnsHostName,
      };

      console.log("data", data);
      axios
        .post(`http://3.109.115.30:8080/aws-vpc`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          if (result.data.status === true) {
            setSuccess(true);
          }
        })
        .catch((err) => {
          if (err) {
            setFail(true);
          }
        });
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <card className="VPCcard" id="style">
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
            <img src={awsVPC} alt="awsVPClogo" style={{ width: "50px" }} />
            <Typography component="h1" variant="h5">
              AWS VPC
            </Typography>

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
            <form
              className={classes.form}
              noValidate
              onSubmit={(e) => {
                Submit(e);
              }}
            >
              <InputLabel id="demo-simple-select-required-label">VPC Name</InputLabel>
              <TextField
                variant="outlined"
                // margin="normal"
                required
                placeholder="VPC Name"
                fullWidth
                id="email"
                // label="VPC Name"
                name="email"
                type="text"
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
                placeholder="CIDR Range Value"
                fullWidth
                id="email"
                // label="cidrRange"
                name="email"
                type="text"
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
                id="style"
                onChange={(e) => {
                  dropDown(e);
                }}
              >
                <option value="">Region</option>
                {props.region.map((val, i) => {
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
              <FormControl style={{ width: "inherit" }}>
                <FormLabel id="demo-controlled-radio-buttons-group" style={{ color: "#666666" }}>
                  Number of Availability Zones
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={numberOfZone}
                  onChange={handleNumberOfZone}
                  style={{ justifyContent: "space-between", margin: "-15px 0px" }}
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
              <FormControl style={{ width: "inherit" }}>
                <FormLabel id="demo-controlled-radio-buttons-group" style={{ color: "#666666" }}>
                  Number of Public Subnets
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="publicSubnet"
                  value={totalPublicSubnet}
                  onChange={handleTotalPublicSubnet}
                  style={{ justifyContent: "space-between", margin: "-15px 0px" }}
                >
                  <FormControlLabel value={0} control={<Radio />} label={`0 Public Subnets`} />
                  <FormControlLabel value={numberOfZone} control={<Radio />} label={`${numberOfZone} Public Subnets`} />
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
              <FormControl style={{ width: "inherit" }}>
                <FormLabel id="demo-controlled-radio-buttons-group" style={{ color: "#666666" }}>
                  Number of Private Subnets
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="privateSubnet"
                  value={totalPrivateSubnet}
                  onChange={handleTotalPrivateSubnet}
                  style={{ justifyContent: "space-between", margin: "-15px 0px" }}
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
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  onChange={(e) => {
                    dnsDropdown(e);
                  }}
                  label="Enable DNS hostnames"
                />
              </FormGroup>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Create
              </Button>
            </form>
          </div>
        </card>
      </Container>
    </>
  );
}
