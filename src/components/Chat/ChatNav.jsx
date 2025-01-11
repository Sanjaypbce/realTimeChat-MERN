import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import {
  faUsers,
  faUserPlus,
  faAdjust,
} from "@fortawesome/free-solid-svg-icons";
import ThreeDotDropdown from "../Helper/ThreeDotDropdown";
import { useState, useEffect } from "react";
import RoundImageWithDetails from "../Image/RoundImageWithDetails";

const ChatNav = ({ chatPatner }) => {
  const { loading, user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const theme = useSelector((state) => state.theme.theme);
  console.log;
  return (
    <>
      <nav
        className="navbar navbar-expand-lg "
        style={{
          backgroundColor: theme === "dark" ? "#252c38" : "",
          color: theme === "dark" ? "#fff" : "",
          borderBottom: "1.5px solid rgb(234, 237, 247)",
          height: "68px",
        }}
      >
        <div class="d-flex justify-content-between" style={{ width: "100%" }}>
          <div class="d-flex justify-content-start">
            <RoundImageWithDetails />
            <p style={{ paddingLeft: "2px", marginBottom: "0px" }}>
              {chatPatner?.name}
            </p>
          </div>
          <div
            onClick={(event) => {
              event.stopPropagation();
              setOpen(!open);
            }}
            style={{ paddingRight: "20px", fontWeight: "900px" }}
          >
            &#x22EE;
          </div>
        </div>
        {open && <ThreeDotDropdown />}
      </nav>
    </>
  );
};

export default ChatNav;
