import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import "../../Component/styles/styles.css";
import axios from "axios";
import Alert from "@mui/material/Alert";
import InputLabel from "@mui/material/InputLabel";
import awsEc2 from "../../Assets/Icons/ec2.png";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "500px",
    display: "flex",
    flexDirection: "column",
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

export default function EC2(props) {
  const classes = useStyles();
  const [region, setRegion] = useState();
  const [zone, setZone] = useState([]);
  const [selectZone, setSelectZone] = useState();
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [os, setOs] = useState("");
  const [ami, setAmi] = useState();
  const [Ami, SetAmi] = useState();
  const [arc, setArc] = useState();
  const [Arc, setarc] = useState();
  const [volumeSize, setVolumeSize] = useState("");
  const [volumeType, setVolumeType] = useState("");
  const [ebsField, setEbsField] = useState(false);
  const [ebsVolumeSize, setEbsVolumeSize] = useState("");
  const [ebsVolumeType, setEbsVolumeType] = useState("");
  const [machineType, setMachineType] = useState("");
  const [name, setName] = useState("");
  const [instanceType, setInstanceType] = useState("");
  const [keyPair, setKeypair] = useState("");
  const [selectKeyPair, setSelectKeyPair] = useState([]); //all the existing key pair

  const [vpcId, setVpcId] = useState("");
  const [selectVpcID, setSelectVpcID] = useState([]); //vpc data based on region selected
  const [subnet, setSubnet] = useState("");
  const [selectSubnet, setSelectSubnet] = useState([]); // all subnet  value
  const [selectSubnetOption, setSelectSubnetOption] = useState([]); // subnet option values for dropdown
  const [autoAssignIP, setAutoAssignIP] = useState("");
  const [firewall, setFirewall] = useState("");
  const [selectFirewall, setSelectFirewall] = useState([]); // firewall security group dropdown value
  const [selectFirewallOption, setSelectFirewallOption] = useState([]); // firewall security group option values for dropdown
  const [open, setOpen] = useState(false);

  const [formError, setFormError] = useState({
    region: "",
    name: "",
    zone: "",
    machineType: "",
    os: "",
    ami: "",
    arc: "",
    volumeType: "",
    volumeSize: "",
    ebsVolumeType: "",
    ebsVolumeSize: "",
    instanceType: "",
    keyPair: "",
    vpcId: "",
    subnet: "",
    autoAssignIP: "",
    firewall: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // console.log("prosinec2 >>>", props);
  const Validation = () => {
    if (!region) {
      setFormError((oldState) => ({ ...oldState, region: "*required" }));
    }
    if (!selectZone) {
      setFormError((oldState) => ({ ...oldState, selectZone: "*required" }));
    }
    if (!name) {
      setFormError((oldState) => ({ ...oldState, name: "*required" }));
    }
    if (!os) {
      setFormError((oldState) => ({ ...oldState, os: "*required" }));
    }
    if (!ami) {
      setFormError((oldState) => ({ ...oldState, ami: "*required" }));
    }
    if (!arc) {
      setFormError((oldState) => ({ ...oldState, arc: "*required" }));
    }
    if (!machineType) {
      setFormError((oldState) => ({ ...oldState, machineType: "*required" }));
    }
    if (!volumeSize) {
      setFormError((oldState) => ({ ...oldState, volumeSize: "*required" }));
    }
    if (!volumeType) {
      setFormError((oldState) => ({ ...oldState, volumeType: "*required" }));
    }

    if (!selectZone) {
      setFormError((oldState) => ({ ...oldState, zone: "*required" }));
    }
    if (!instanceType) {
      setFormError((oldState) => ({ ...oldState, instanceType: "*required" }));
    }
    if (!keyPair) {
      setFormError((oldState) => ({ ...oldState, keyPair: "*required" }));
    }
    if (!vpcId) {
      setFormError((oldState) => ({ ...oldState, vpcId: "*required" }));
    }
    if (!subnet) {
      setFormError((oldState) => ({ ...oldState, subnet: "*required" }));
    }
    if (!autoAssignIP) {
      setFormError((oldState) => ({ ...oldState, autoAssignIP: "*required" }));
    }
    if (!firewall) {
      setFormError((oldState) => ({ ...oldState, firewall: "*required" }));
    }
  };

  const dropDown = (e) => {
    let token = localStorage.getItem("token");

    if (e.target.name === "region") {
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

      console.log("zone", zone);

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
    console.log("zone", zone);
    if (e.target.name === "zone") {
      setSelectZone(e.target.value);
      if (!selectZone) {
        setFormError((oldState) => ({ ...oldState, zone: " " }));
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
          setAmi(res.data);
          if (!os) {
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

      // let arc = Arc.filter((val, i) => {
      //   return val.name === e.target.value;
      // });
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
    if (e.target.name === "subnet") {
      setSubnet(e.target.value);
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

    if (e.target.name === "volumeType") {
      setVolumeType(e.target.value);
      if (!volumeType) {
        setFormError((oldState) => ({ ...oldState, volumeType: "" }));
      }
    }
    if (e.target.name === "ebsVolumeType") {
      setEbsVolumeType(e.target.value);
      if (!ebsVolumeType) {
        setFormError((oldState) => ({ ...oldState, ebsVolumeType: "" }));
      }
    }
  };

  const Submit = (e) => {
    e.preventDefault();

    Validation();

    if (
      volumeSize &&
      volumeType &&
      ebsVolumeSize &&
      ebsVolumeType &&
      region &&
      selectZone &&
      machineType &&
      name &&
      os &&
      Ami &&
      Arc &&
      instanceType &&
      keyPair
    ) {
      let data = {
        userId: props.userId,
        providerType: props.providerType,
        projectName: props.projectName,
        region: region,
        availabilityZone: selectZone,
        ami: "ami-0b0dcb5067f052a63",
        volumeSize: volumeSize,
        volumeType: volumeType,
        name: name,
        ec2RootSize: ebsVolumeSize,
        ec2RootType: ebsVolumeType,
        instanceType: instanceType,
        keyPairName: keyPair,
      };

      console.log("ec2Data>>", data);

      let token = localStorage.getItem("token");
      axios
        .post(`http://3.109.115.30:8080/aws-ec2`, data, {
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
        <card className="AWSEC2card" id="style">
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

          <div className={classes.paper} style={{ width: "350px" }}>
            <img src={awsEc2} alt="awsEC2" style={{ width: "50px", margin: "0 auto" }} />
            <Typography component="h1" variant="h5" style={{ margin: "0 auto" }}>
              AWS EC2
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
              <div className="">
                <InputLabel id="demo-simple-select-required-label">Instance Name</InputLabel>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  placeholder="Instance Name"
                  id="email"
                  name="email"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  onFocus={() => {
                    setFormError((oldState) => ({ ...oldState, name: "" }));
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
                      <option value={val.location}>
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
                    return <option value={val.zone}>{val.zone}</option>;
                  })}
                </select>
                <span style={{ color: "red" }}>{formError.zone}</span>
              </div>

              <div className="test">
                <h4 style={{ textAlign: "center" }}>Application and OS Images </h4>
                <InputLabel id="demo-simple-select-required-label">OS</InputLabel>
                <select
                  value={os}
                  className="drop-down"
                  name="os"
                  onChange={(e) => {
                    dropDown(e);
                  }}
                >
                  <option value="">OS</option>
                  {props.os?.map((val, i) => {
                    return <option value={val}>{val.substring(0, 40)}</option>;
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
                  <option value="">AMI</option>
                  {ami?.map((val, i) => {
                    return <option value={val.name}>{val.name.substring(0, 50)}</option>;
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
                {/* <span style={{ color: "red" }}>{formError.machineType}</span> */}
              </div>

              <div className="test">
                <h4 style={{ textAlign: "center" }}>Instance Type</h4>
                <InputLabel id="demo-simple-select-required-label">Instance Type</InputLabel>
                <select
                  value={instanceType}
                  className="drop-down"
                  name="instanceType"
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
                  <option value="t4g.micro">t4g.micro</option>
                  <option value="t4g.medium">t4g.medium</option>
                  <option value="t4g.large">t4g.large</option>
                  <option value="t4g.2xlarge">t4g.2xlarge</option>
                </select>
                <span style={{ color: "red" }}>{formError.instanceType}</span>
              </div>

              <div className="test">
                <h4 style={{ textAlign: "center" }}>Key Pair (login) </h4>
                <h6 style={{ textAlign: "center", color: "gray" }}>
                  You can use a key pair to securely connect to your instance.
                </h6>
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
              </div>

              <div className="test">
                <h4 style={{ textAlign: "center" }}>Network Settings</h4>

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
                  value={subnet}
                  className="drop-down"
                  name="subnet"
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
              </div>

              <div className="test">
                <h4 style={{ textAlign: "center" }}>Configure Storage</h4>

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

                <div
                  className="ec2Button"
                  onClick={(e) => {
                    setEbsField(!ebsField);
                  }}
                >
                  <p>Add new volume</p>
                </div>

                {ebsField && (
                  <>
                    <InputLabel id="demo-simple-select-required-label">EC2 Volume Size</InputLabel>
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
                      value={ebsVolumeSize}
                      onChange={(e) => {
                        setEbsVolumeSize(e.target.value);
                      }}
                      onFocus={() => {
                        setFormError((oldState) => ({ ...oldState, ebsVolumeSize: "" }));
                      }}
                      onBlur={() => {
                        if (!ebsVolumeSize) {
                          setFormError((oldState) => ({
                            ...oldState,
                            ebsVolumeSize: "*required",
                          }));
                        }
                      }}
                    />
                    <span style={{ color: "red" }}>{formError.ebsVolumeSize}</span>
                    <InputLabel id="demo-simple-select-required-label">EC2 Volume type</InputLabel>

                    <select
                      value={ebsVolumeType}
                      className="drop-down"
                      name="ebsVolumeType"
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
                    <span style={{ color: "red" }}>{formError.ebsVolumeType}</span>
                  </>
                )}
              </div>

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
