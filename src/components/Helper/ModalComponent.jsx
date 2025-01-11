import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ProfileImage from "./ProfileImage";

const ModalComponent = ({ showModal, setShowModal }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [status, setStatus] = useState("");
  const [userName, setUserName] = useState("");

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    setProfilePic(URL.createObjectURL(file));
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{
          display: showModal ? "block" : "none",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
        onClick={toggleModal}
      >
        <div
          className="modal-dialog"
          role="document"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ justifyContent: "space-between" }}
            >
              <h5 className="modal-title">User Settings</h5>
              <button
                type="button"
                className="close"
                onClick={toggleModal}
                aria-label="Close"
                style={{ border: "none", color: "red", background: "white" }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="userName" className="form-label">
                  User Name
                </label>
                <input
                  type="text"
                  id="userName"
                  className="form-control"
                  value={userName}
                  onChange={handleUserNameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="profilePic" className="profile-icon">
                  <ProfileImage />
                  <input
                    type="file"
                    id="profilePic"
                    style={{ display: "none" }}
                    onChange={handleProfilePicChange}
                  />
                </label>
                {profilePic && (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="img-fluid mt-2"
                  />
                )}
              </div>
              <div className="form-group">
                <label htmlFor="status" className="form-label">
                  Change Status
                </label>
                <select
                  id="status"
                  className="form-control"
                  value={status}
                  onChange={handleStatusChange}
                >
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="offline">Offline</option>
                  <option value="busy">Busy</option>
                  <option value="away">Away</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={toggleModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={toggleModal}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
