import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AddUserModal = ({ showModal, setShowModal }) => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSend = () => {
    // Handle sending email logic here
    console.log("Email sent to:", email);
    // Close the modal
    setShowModal(false);
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
              <h5 className="modal-title">Add User</h5>
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
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={handleEmailChange}
                />
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
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
