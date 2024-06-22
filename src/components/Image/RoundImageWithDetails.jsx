import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const RoundImageWithDetails = ({ src, alt, details }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleMouseEnter = () => {
    setShowDetails(true);
  };

  const handleMouseLeave = () => {
    setShowDetails(false);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {src ? (
        <img
          src={src}
          style={{ borderRadius: "50%", width: "100px", height: "100px" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          alt="Profile"
          className="img-fluid"
        />
      ) : (
        <FontAwesomeIcon
          icon={faCircleUser}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}
      {showDetails && (
        <div
          style={{
            position: "absolute",
            top: "120%",
            left: 0,
            background: "#fff",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h3>Contact Details</h3>
          <p>{details}</p>
        </div>
      )}
    </div>
  );
};

export default RoundImageWithDetails;
