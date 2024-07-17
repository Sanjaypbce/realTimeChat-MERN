import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const GroupModal = ({ showModal, setShowModal, users }) => {
  const [groupName, setGroupName] = useState("");
  const [groupIcon, setGroupIcon] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleGroupIconChange = (event) => {
    setGroupIcon(event.target.value);
  };

  const handleSelectedUsersChange = (event) => {
    const options = event.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedUsers(selected);
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
              <h5 className="modal-title">Create Group</h5>
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
                <label htmlFor="groupName" className="form-label">
                  Group Name
                </label>
                <input
                  type="text"
                  id="groupName"
                  className="form-control"
                  value={groupName}
                  onChange={handleGroupNameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="groupIcon" className="form-label">
                  Group Icon
                </label>
                <input
                  type="text"
                  id="groupIcon"
                  className="form-control"
                  value={groupIcon}
                  onChange={handleGroupIconChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="selectedUsers" className="form-label">
                  Select Users
                </label>
                <select
                  id="selectedUsers"
                  className="form-control"
                  multiple
                  value={selectedUsers}
                  onChange={handleSelectedUsersChange}
                >
                  {users.map((user) => (
                    <option key={user.id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
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
                onClick={() => {
                  // Handle saving changes
                  toggleModal();
                }}
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

export default GroupModal;
