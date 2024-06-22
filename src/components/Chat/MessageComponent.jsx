import React from "react";

import style from "./messageComponenet.module.css";

const MessageComponent = ({ text, currentUser }) => {
  return (
    <div className={currentUser ? style.chatMessage : style.otherUserMessage}>
      <p style={{ marginBottom: "0px" }}>{text}</p>
    </div>
  );
};

export default MessageComponent;
