import React from "react";
import ReactDOM from "react-dom/client";
import LoginForm from "./Component/Login/LoginForm";
import Login from "./Component/Login/Login";
import Registration from "./Component/Register/Registration";
import Projects from "./Component/Projects/Projects";
import Addproject from "./Component/AddProject/AddProject";
import Services from "./Component/Services/Services";
import ExistingList from "./Component/ExistingProject/ExistingList";
import "./bootstrap.min.css.map";
import Existingproject from "./Component/ExistingProject/ExistingProject";
import ExistingProvider from "./Component/ExistingProject/ExistingProviderList";
import "./Component/styles/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import history from "./history";
import CloudSQL from "./Component/GCP/cloudSQL";
import AwsServices from "./Component/AWS/AwsServices";
import GcpServices from "./Component/GCP/GcpServices";
import AwsTemplate from "./Component/AWS/AwsTemplate";
import AWSTemplateCards from "./Component/AWS/AWSTemplateCards";

function App() {
  return (
    <BrowserRouter history={history}>
      <div className="max-w-screen-md mx-auto pt-20">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Registration />} />
          <Route exact path="/addproject" element={<Addproject />} />
          <Route exact path="/projects" element={<Projects />} />
          <Route exact path="/services/:id/:projectName" element={<Services />} />
          <Route exact path="/existing" element={<Existingproject />} />
          <Route exact path="/existingproject" element={<ExistingList />} />
          <Route exact path="/existingprovider/:id/" element={<ExistingProvider />} />
          <Route exact path="/services/:id/awsTemplate" element={<AwsTemplate />} />
          <Route exact path="/services/:id/awsTemplateCards" element={<AWSTemplateCards />} />
        </Routes>
      </div>
    </BrowserRouter>
    // <AwsServices/>
    // <GcpServices/>
    // <AwsTemplate />
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
