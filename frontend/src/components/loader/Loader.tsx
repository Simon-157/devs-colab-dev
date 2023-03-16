import React from "react";
import { PulseLoader } from "react-spinners";

const Loader = () => {
  return (
    <div style={{  
        position: "absolute",
        top: "50%",
        left: "0",
        display: "grid",
        height: "100vh",
        placeItems: "center",
        color: "#0B0055",
        alignItems: 'center'
      }}
    >
      <h3>Please wait ...</h3>
      <PulseLoader color="#0B0055" size={60} />
    </div>
  );
};

export default Loader;
