import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ProfileImage = ({ url }) => {
  return (
    <>
      {url ? (
        <img src={url} alt="Profile" className="img-fluid" />
      ) : (
        <FontAwesomeIcon icon={faUser} className="fa-user-icon" />
      )}
    </>
  );
};

export default ProfileImage;
