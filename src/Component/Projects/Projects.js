import React from "react";
import { PlusSquareOutlined, FileDoneOutlined } from "@ant-design/icons";
import "../styles/styles.css";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import history from "../../history";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
const Projects = () => {
  const handleClose = () => {
    history.push("/");
    window.location.reload();
    localStorage.clear();
    history.pushState(null, document.title, location.href);
    window.addEventListener("popstate", function (event) {
      history.pushState(null, document.title, location.href);
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0.5} className="projects-maingrid">
        <Grid className="projects-header" xs={12}>
          <Header />
        </Grid>
        
        <Grid xs={12}>
          <div className="projects">
            <Card
              className="cardStyle"
              sx={{
                minWidth: "10rem",
                minHeight: "10rem",
                borderRadius: "20px",
                boxShadow: 3,
              }}
            >
              <div className="add-project">
                <div>
                  <PlusSquareOutlined
                    onClick={() => {
                      history.push("/addproject");
                      window.location.reload();
                    }}
                  />
                </div>
                <span>Create a Project</span>
              </div>
            </Card>
            <Card
              className="cardStyle"
              sx={{
                minWidth: "10rem",
                minHeight: "10rem",
                borderRadius: "20px",
                boxShadow: 3,
              }}
            >
              <div className="existing-project">
                <div>
                  <FileDoneOutlined
                    onClick={() => {
                      history.push("/existingproject");
                      window.location.reload();
                    }}
                  />
                </div>
                <span>Existing Projects</span>
              </div>
            </Card>
          </div>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid className="projects-footer" xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Projects;
