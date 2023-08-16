import React,{useState} from "react";
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
import Logo from '../../Assets/Icons/Icon.png';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Dialog } from "@mui/material";
import '../../Component/styles/styles.css';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import history from '../../history';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import InputLabel from "@mui/material/InputLabel";
import gcpBucket from '../../Assets/Logo/gcpBucket.png';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    
  },
  submit: {
    margin: theme.spacing(2, 0, 1)
  }
}));

export default function VPCGCP(props) {
  const classes = useStyles();
  const [accesskey,setAccessKey]=useState();
  const [secretKey,setSecretKey]=useState();
  const [subNet,setSubNet]=useState();
  const [cidrRange,setCidrRange] =useState();
  const [region,setRegion] =useState();
  const [success,setSuccess]=useState(false);
  const [fail,setFail]=useState(false);
  const [inputList, setInputList] = useState([{ cidRange: "" }]);
  let token = localStorage.getItem('token');
  const Submit=(e)=>{
    e.preventDefault();
    let result = inputList.map(a => a.cidRange);
   
    e.preventDefault();
    let data ={
      userId:302,
      providerType:'gcp',
      projectId: "charming-layout-356109",
      regionName:region,
      name:accesskey,
      cidrRange:result,
      projectCreateId:5752,
      subNet:subNet
    
    }

    axios.post(`http://3.109.115.30:8080/gcp-vpc`,data,{headers:{
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
}}).then(result=>{
  if(result.data.status === true){
    setSuccess(true)
  }
 }).catch(err=>{if(err) {
  setFail(true)
 }})
   
    

  }

  const handleInputChange = (e, index) => {
    
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { cidRange: ""}]);
  };

  const deleteService =(e)=>{
    let result = inputList.map(a => a.cidRange);
    e.preventDefault();
    let data ={
      userId:302,
      providerType:'gcp',
      projectId: "charming-layout-356109",
      regionName:region,
      name:accesskey,
      cidrRange:result,
      projectCreateId:5752,
      subNet:subNet
    
    }

    axios.post(`http://3.109.115.30:8080/gcp-vpc-destroy`,data,{headers:{
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
}}).then(result=>{
  if(result.data.status === true){
    setSuccess(true)
  }
 }).catch(err=>{if(err) {
  setFail(true)
 }})
   
     
   
  }
//  const  [showPopup, setShowPopup] = useState(true);
//  if (!showPopup) return null;

  return (
    <>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <card className="VPCNetwork" id="style">
      <div className="alert">
      </div>
      <div className="closeicon">
        <IconButton aria-label="close" 
            onClick={()=> {
              props.closeForm(false);
              window.location.reload();
            }}>
              <CloseIcon />
        </IconButton>
      </div>
      
      <div className={classes.paper}>
      {/* {<IconButton
     size="large"
     edge="start"
     color="inherit"
     aria-label="menu"
     sx={{ mr: 2 }}
     onClick={()=>{props.closeForm(false)}}
     style={{marginLeft:'40'}}
   >
     <CancelIcon />
   </IconButton>} */}
        <img src={gcpBucket} alt="gcpBucketlogo" style={{width: '5rem'}}/>
        <Typography component="h1" variant="h5">
          VPC Network
        </Typography>
        
        {fail ? <Alert onClose={() => {setFail(false)}} severity="error">Failed!</Alert> : ''}
      {success ? <Alert onClose={() => {setSuccess(false)}} severity="success">Success!</Alert> : ''}
        <form className={classes.form} noValidate onSubmit={(e)=>{Submit(e)}}>
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
            value={accesskey}
            onChange={(e)=>{setAccessKey(e.target.value)}}
            
          />
          {inputList.map((x, i) => {
          return (
            <>
            <InputLabel id="demo-simple-select-required-label">cidRange</InputLabel>
            
            <div className="s-3-box">
             <TextField
            variant="outlined"
            // margin="normal"
            required
            fullWidth
            id="email"
            // label="cidRange"
            name="cidRange"
            type="text"
            value={x.cidRange}
            onChange={e => handleInputChange(e, i)}
            
          />
             
                {inputList.length !== 1 && <IconButton
                  className="mr10"
                  onClick={() => handleRemoveClick(i)}><RemoveIcon /></IconButton>}
                {inputList.length - 1 === i && <IconButton onClick={handleAddClick}><AddIcon /></IconButton>}
              </div>
              </>
          );
        })}
           <InputLabel id="demo-simple-select-label">
            Region
          </InputLabel>
         <select value={region} className="drop-down" onChange={(e)=>{setRegion(e.target.value)}} >
          {props.region.map((val,i)=>{
 return <option value={val.location}>{val.name}{', '}{val.location}</option>
          })}
         
        </select>
        <InputLabel id="demo-simple-select-label">Subnet</InputLabel>
         <select value={subNet} className="drop-down" onChange={(e)=>{setSubNet(e.target.value)}} >
          <option value={'Private'}>Private</option>
          <option value={'Public'}>Public</option>
         
        </select>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
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
