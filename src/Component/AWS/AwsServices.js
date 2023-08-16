import React from "react";
import "../styles/AwsServices.css";
import awsVPC from "../../Assets/Icons/awsVPC.png";
import awsS3 from "../../Assets/Icons/s3.png";
import awsRDS from "../../Assets/Icons/rds.png";
import awsEc2 from "../../Assets/Icons/ec2.png";
import Button from "@material-ui/core/Button";
import history from "../../history";

function AwsServices(props) {
  return (
    <div className="AWStemp">
      <div className="AWSServicesContainer">
        <div className="Awscontainer">
          <ul className="cards">
            <li className="servicescard cards__item">
              <div className="servicescard__frame">
                <div className="servicescard__picture">
                  <img src={awsVPC} alt="" style={{ width: "100px", height: "100px", filter: "inherit" }} />
                </div>
                <h2 className="servicescard__title">VPC</h2>
              </div>
              <div className="servicescard__overlay" />
              <div className="servicescard__content">
                <h2>VPC</h2>
                <div>VPC details</div>
                {/* <div>VPC_cidr: </div>
                <div>Public_subnet_cidr: </div>
                <div>Private_subnets_cidr: </div>
                <div>Private_subnet_azs: </div>
                <div>availability_zone: </div> */}
              </div>
            </li>
            <li className="servicescard cards__item">
              <div className="servicescard__frame">
                <div className="servicescard__picture">
                  <img src={awsEc2} alt="" style={{ width: "100px", height: "100px", filter: "inherit" }} />
                </div>
                <h2 className="servicescard__title">EC2</h2>
              </div>
              <div className="servicescard__overlay" />
              <div className="servicescard__content">
                <h2>EC2</h2>
                <div>EC2 details</div>
              </div>
            </li>
            <li className="servicescard cards__item">
              <div className="servicescard__frame">
                <div className="servicescard__picture">
                  <img src={awsS3} alt="" style={{ width: "100px", height: "100px", filter: "inherit" }} />
                </div>
                <h2 className="servicescard__title">S3</h2>
              </div>
              <div className="servicescard__overlay" />
              <div className="servicescard__content">
                <h2>S3</h2>
                <div>S3 details</div>
              </div>
            </li>
            <li className="servicescard cards__item">
              <div className="servicescard__frame">
                <div className="servicescard__picture">
                  <img src={awsRDS} alt="" style={{ width: "100px", height: "100px", filter: "inherit" }} />
                </div>
                <h2 className="servicescard__title">RDS</h2>
              </div>
              <div className="servicescard__overlay" />
              <div className="servicescard__content">
                <h2>RDS</h2>
                <div>RDS detals </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="template_btn">
        <Button
          fullWidth
          variant="contained"
          className="temp_btn_style_aws"
          onClick={() => {
            let id = "aws";
            history.push(`/services/${id}/awsTemplateCards`, { props });
            window.location.reload();
          }}
        >
          AWS TEMPLATE
        </Button>
      </div>
    </div>
  );
}
export default AwsServices;
