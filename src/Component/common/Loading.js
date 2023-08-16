import React from "react";
import Spinner from "./Spinner";

const loaderStyle = {
  left: "50%",
  position: "absolute",
  textAlign: "center",
  top: "40%",
};

const Loading = () => {
  return (
    <div className="loading" style={loaderStyle}>
      <Spinner />
    </div>
  );
};

export default Loading;
