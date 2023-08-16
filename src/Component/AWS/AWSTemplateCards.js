import React from "react";
import "../styles/AwsServices.css";
import awsVPC from "../../Assets/Icons/awsVPC.png";
import awsS3 from "../../Assets/Icons/s3.png";
import awsRDS from "../../Assets/Icons/rds.png";
import awsEc2 from "../../Assets/Icons/ec2.png";
import Button from "@material-ui/core/Button";
import history from "../../history";
import Footer from "../Layout/Footer";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Grid from "@material-ui/core/Grid";
import { useNavigate } from "react-router-dom";
import Carousel from "react-elastic-carousel";
import Header from "../Layout/Header";

const breakPoints = [
  { width: 550, itemsToShow: 1 },
  { width: 768, itemsToShow: 2 },
  { width: 1200, itemsToShow: 3 },
  { width: 1500, itemsToShow: 4 }
];

function AWSTemplateCards(props) {

let navigate = useNavigate();

  return (
    <div className="mainTemplate">
      <Grid className="projects-header" xs={12}>
          <Header />
      </Grid>
    {/* <div className="AWSTemplateContainer"> */}
    <div className="AWStemplate">
      <div className="AWSServicesContainer">
        <div className="Awstempcontainer">
        <Carousel breakPoints={breakPoints}>
          <ul className="cards">
            <li className="servicescard cardstemp__item" onClick={() => {
            let id = "aws";
            history.push(`/services/${id}/awsTemplate`, { props });
            window.location.reload();
          }}>
              <div className="tempservicescard__frame">
                <div className="tempservicescard__picture">
                  <img src={awsVPC} alt="" style={{ width: "50px", height: "50px", filter: "inherit" }} />
                  <img src={awsEc2} alt="" style={{ width: "50px", height: "50px", filter: "inherit" }} />
                  <img src={awsS3} alt="" style={{ width: "50px", height: "50px", filter: "inherit" }} />
                  <img src={awsRDS} alt="" style={{ width: "50px", height: "50px", filter: "inherit" }} />
                </div>
                <pre className="tempservicescard__title">Template - 1</pre>
              </div>
            </li>
            <li className="servicescard cardstemp__item">
              <div className="tempservicescard__frame">
                <div className="tempservicescard__picture">
                  <img src={awsVPC} alt="" style={{ width: "50px", height: "50px", filter: "inherit" }} />
                  <img src={awsEc2} alt="" style={{ width: "50px", height: "50px", filter: "inherit" }} />
                  <img src={awsS3} alt="" style={{ width: "50px", height: "50px", filter: "inherit" }} />
                  <img src={awsRDS} alt="" style={{ width: "50px", height: "50px", filter: "inherit" }} />
                </div>
                <pre className="tempservicescard__title">Template - 2</pre>
              </div>
            </li>
            <li className="servicescard cardstemp__item">
              <div className="tempservicescard__frame">
                <div className="tempservicescard__picture">
                  <img src={awsVPC} alt="" style={{ width: "50px", height: "50px", filter: "inherit" }} />
                  <img src={awsEc2} alt="" style={{ width: "50px", height: "50px", filter: "inherit" }} />
                  <img src={awsS3} alt="" style={{ width: "50px", height: "50px", filter: "inherit" }} />
                  <img src={awsRDS} alt="" style={{ width: "50px", height: "50px", filter: "inherit" }} />
                </div>
                <pre className="tempservicescard__title">Template - 3</pre>
              </div>
            </li>
            <li className="servicescard cardstemp__item">
              <div className="tempservicescard__frame">
                <div className="tempservicescard__picture">
                  <img src={awsVPC} alt="" style={{ width: "50px", height: "50px", filter: "inherit" }} />
                  <img src={awsEc2} alt="" style={{ width: "50px", height: "50px", filter: "inherit" }} />
                  <img src={awsS3} alt="" style={{ width: "50px", height: "50px", filter: "inherit" }} />
                  <img src={awsRDS} alt="" style={{ width: "50px", height: "50px", filter: "inherit" }} />
                </div>
                <pre className="tempservicescard__title">Template - 4</pre>
              </div>
            </li>
          </ul>
          </Carousel>
        </div>
      {/* </div> */}
      {/* <div className="template_btn">
        <Button
          fullWidth
          variant="contained"
          className="temp_btn_style_aws"
          onClick={() => {
            let id = "aws";
            history.push(`/services/${id}/awsTemplate`, { props });
            window.location.reload();
          }}
        >
          AWS TEMPLATE
        </Button>
      </div> */}
    </div>
    </div>
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
    </div>
  );
}
export default AWSTemplateCards;
