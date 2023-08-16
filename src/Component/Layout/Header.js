import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Indium from "../../Assets/Icons/Icon.png";
import TerraformLogo from "../../Assets/Icons/Terraform-Logo.png";
import "../styles/styles.css";
import jwt from "jwt-decode";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import history from "../../history";

const Header = () => {
  const [user, setUser] = useState();
  const [opens, setOpens] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleClose = () => {
    history.push("/");
    window.location.reload();
    localStorage.clear();
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    let user = jwt(token);
    setUser(user.sub);
  }, [0]);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <>
      <Navbar className="nav1">
        <Container>
          <div className="projectsHeader">
            <Navbar.Brand>
              <img
                src={Indium}
                className="ind-logo"
                id="ind-logo"
                style={{ width: "160px", marginLeft: "30px" }}
              />
            </Navbar.Brand>
            {/* <img src={TerraformLogo} className="ind-logo" id='ind-logo' style={{width:'190px'}}/> */}
            <div
              className="userbutton"
              style={{ marginRight: "30px" }}
              onMouseOver={handleMouseOver}
            >
              <div
                onClick={() => {
                  setOpens(!opens);
                }}
                style={{
                  display: "flex",
                  fontWeight: "bold",
                  alignItems: "center",
                  paddingLeft: "5px",
                }}
              >
                {user}
                <span>
                  <AccountCircleIcon
                    sx={{
                      fontSize: "40px",
                      padding: "4px",
                      marginTop: "2px",
                    }}
                  />
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Navbar>

      {isHovering && (
        <div
          className="usericon-dropdown"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <div>
            <AccountCircleIcon sx={{ fontSize: "3.5rem", marginTop: "0px" }} />
            <h4>{user}</h4>
          </div>
          <div
            style={{
              marginTop: "8px",
              marginBottom: "8px",
              height: "2px",
              backgroundColor: "grey",
            }}
          />

          <MenuItem className="logout-button" onClick={handleClose}>
            Logout
          </MenuItem>
          <MenuItem
            className="cancel-button"
            onClick={() => {
              setOpens(false);
            }}
          >
            Cancel
          </MenuItem>

          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={opens}
            onClose={handleClose}
            // anchorOrigin={{
            //   vertical: "top",
            //   horizontal: "right",
            // }}
            // transformOrigin={{
            //   vertical: "top",
            //   horizontal: "right",
            // }}
          ></Menu>
        </div>
      )}
    </>
  );
};
export default Header;
