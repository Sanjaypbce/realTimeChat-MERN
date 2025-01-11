import React, { useEffect } from "react";
import "./Dashboard.css";
import Chat from "../Chat/Chat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUserPlus,
  faAdjust,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import RoundImageWithDetails from "../Image/RoundImageWithDetails";
import GroupModal from "../Helper/GroupModal";
import AddUserModal from "../Helper/AddUserModal";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../Store/Slice/themeSlice";

const token = localStorage.getItem("token");
const url = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [users, setUsers] = useState(null);
  const [chatPatner, setChatpatner] = useState(null);
  const [spinner, setSpinner] = useState(true);
  const { user } = useSelector((state) => state.user);
  console.log("us", user);
  const fetchData = () => {
    axios
      .get(`${url}/login/getAllUsers`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        console.log("response", response);
        const otherArray = response.data.filter(
          (item) => item._id !== user._id
        );
        setUsers(otherArray);
        setChatpatner(response.data[0]);
        setSpinner(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    console.log("user--->", user);
    if (user) {
      fetchData();
    }
  }, [user]);
  return (
    <>
      {spinner ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="app-container">
          <Sidebar
            chatPatner={chatPatner}
            setChatpatner={setChatpatner}
            users={users}
            currentUser={user}
          />
          <ChatSection chatPatner={chatPatner} setChatpatner={setChatpatner} />
        </div>
      )}
    </>
  );
};

function Sidebar({ users, chatPatner, setChatpatner, currentUser }) {
  const [showModal, setShowModal] = useState(false);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const toggleAddUserModal = () => {
    setShowAddUserModal(!showAddUserModal);
  };
  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <>
      <div
        id="sidebar"
        style={{
          backgroundColor: theme === "dark" ? "#252c38" : "",
          color: theme === "dark" ? "#fff" : "",
        }}
      >
        <div className="icons d-flex justify-content-around mt-3 mb-3">
          <FontAwesomeIcon
            icon={faUsers}
            className="icon"
            onClick={toggleModal}
          />
          <FontAwesomeIcon
            icon={faUserPlus}
            className="icon"
            onClick={toggleAddUserModal}
          />
          <FontAwesomeIcon
            icon={faAdjust}
            className="icon"
            onClick={handleToggle}
          />
        </div>
        <ul id="user-list">
          <li
            onClick={(key) => {
              setChatpatner(currentUser);
            }}
            style={{
              background: theme === "dark" ? "#252c38" : "azure",
              color: theme === "dark" ? "#ffffff" : "#252c38",
            }}
          >
            Me
          </li>
          {users?.map((item, index) => {
            return (
              <li
                className={chatPatner._id == item._id ? "active" : undefined}
                key={index}
                onClick={(key) => {
                  setChatpatner(item);
                }}
              >
                <div className="d-flex justify-content-between">
                  <div class="d-flex justify-content-start">
                    <RoundImageWithDetails />
                    <p style={{ paddingLeft: "2px", marginBottom: "0px" }}>
                      {item.name}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <GroupModal
        showModal={showModal}
        setShowModal={setShowModal}
        users={users}
      />
      <AddUserModal
        showModal={showAddUserModal}
        setShowModal={setShowAddUserModal}
      />
    </>
  );
}

function ChatSection({ chatPatner }) {
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    console.log("///", { user });
  }, [user]);
  return (
    <div id="chat-section">
      {user ? (
        <Chat chatPatner={chatPatner} />
      ) : (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
