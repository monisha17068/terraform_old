import React from "react";
import "../../Component/styles/GcpServices.css";
import gcpBucket from "../../Assets/Logo/gcpBucket.png";
import Button from "@material-ui/core/Button";
import history from "../../history";

function GcpServices() {
  return (
    <div className="GCPtemp">
      <div className="GCPServicesContainer">
        <div className="GCPcontainer">
          <ul className="cards">
            <li className="servicescard cards__item">
              <div className="servicescard__frame">
                <div className="servicescard__picture">
                  <img src={gcpBucket} alt="" style={{ width: "100px", height: "100px", filter: "inherit" }} />
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
                  <img src={gcpBucket} alt="" style={{ width: "100px", height: "100px", filter: "inherit" }} />
                </div>
                <h2 className="servicescard__title">VM Instance</h2>
              </div>
              <div className="servicescard__overlay" />
              <div className="servicescard__content">
                <h2>VM Instance</h2>
                <div>VM Instance details</div>
              </div>
            </li>
            <li className="servicescard cards__item">
              <div className="servicescard__frame">
                <div className="servicescard__picture">
                  <img src={gcpBucket} alt="" style={{ width: "100px", height: "100px", filter: "inherit" }} />
                </div>
                <h2 className="servicescard__title">Cloud Storage</h2>
              </div>
              <div className="servicescard__overlay" />
              <div className="servicescard__content">
                <h2>Cloud Storage</h2>
                <div>Cloud Storage details</div>
              </div>
            </li>
            <li className="servicescard cards__item">
              <div className="servicescard__frame">
                <div className="servicescard__picture">
                  <img src={gcpBucket} alt="" style={{ width: "100px", height: "100px", filter: "inherit" }} />
                </div>
                <h2 className="servicescard__title">CloudSQL</h2>
              </div>
              <div className="servicescard__overlay" />
              <div className="servicescard__content">
                <h2>CloudSQL</h2>
                <div>CloudSQL detals </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="template_btn">
        <Button
          fullWidth
          variant="contained"
          className="temp_btn_style"
          //   onClick={() => {
          //     let id = "aws";
          //     history.push(`/services/${id}/awsTemplate`);
          //     window.location.reload();
          //   }}
        >
          GCP Template
        </Button>
      </div>
    </div>
  );
}
export default GcpServices;
