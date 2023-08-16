import React, { Fragment } from "react";
import "./Spinner.css";
const Spinner = () => {
  return (
    <Fragment>
      <div className="loading">
        <div className="loader"></div>
      </div>
    </Fragment>
  );
};

export default Spinner;
