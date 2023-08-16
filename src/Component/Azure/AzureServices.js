import React from "react";
import "../styles/AzureServices.css";
import MicAzure from "../../Assets/Icons/mic-azur.png";
import Button from "@material-ui/core/Button";
import history from "../../history";

function AzureServices(props) {
  return (
    <div className="Azuretemp">
      <div className="AzureServicesContainer">
        <div className="Azurecontainer">
          <ul className="cards">
            <li className="servicescard cards__item">
              <div className="servicescard__frame">
                <div className="servicescard__picture">
                  <img src={MicAzure} alt="" style={{ width: "130px", height: "130px", filter: "inherit" }} />
                </div>
                <h2 className="servicescard__title">Virtual Network</h2>
              </div>
              <div className="servicescard__overlay" />
              <div className="servicescard__content">
                <h2>Virtual Network</h2>
                <div>Virtual Network details</div>
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
                  <img src={MicAzure} alt="" style={{ width: "130px", height: "130px", filter: "inherit" }} />
                </div>
                <h2 className="servicescard__title">Azure</h2>
              </div>
              <div className="servicescard__overlay" />
              <div className="servicescard__content">
                <h2>Azure</h2>
                <div>Azure details</div>
              </div>
            </li>
            <li className="servicescard cards__item">
              <div className="servicescard__frame">
                <div className="servicescard__picture">
                  <img src={MicAzure} alt="" style={{ width: "130px", height: "130px", filter: "inherit" }} />
                </div>
                <h2 className="servicescard__title">Azure</h2>
              </div>
              <div className="servicescard__overlay" />
              <div className="servicescard__content">
                <h2>Azure</h2>
                <div>Azure details</div>
              </div>
            </li>
            <li className="servicescard cards__item">
              <div className="servicescard__frame">
                <div className="servicescard__picture">
                  <img src={MicAzure} alt="" style={{ width: "130px", height: "130px", filter: "inherit" }} />
                </div>
                <h2 className="servicescard__title">Azure</h2>
              </div>
              <div className="servicescard__overlay" />
              <div className="servicescard__content">
                <h2>Azure</h2>
                <div>Azure detals </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="template_btn">
        <Button
          fullWidth
          variant="contained"
          className="temp_btn_style_Azure"
        //   onClick={() => {
        //     let id = "azure";
        //     history.push(`/services/${id}/azureTemplate`, { props });
        //     window.location.reload();
        //   }}
        >
          Azure Template
        </Button>
      </div>
    </div>
  );
}
export default AzureServices;
