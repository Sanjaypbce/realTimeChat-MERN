import React, { useEffect, useRef, useState } from "react";
import ChatNav from "./ChatNav";
// import "./Chat.css";
import MessageComponent from "./MessageComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload, faCheck } from "@fortawesome/free-solid-svg-icons";
import RoundImageWithDetails from "../Image/RoundImageWithDetails";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import io from "socket.io-client";

const Jwttoken = localStorage.getItem("token");
import { v4 as uuidv4 } from "uuid";
const url = import.meta.env.VITE_API_URL;
const socket = io(url);

const Chat = ({ chatPatner }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [spinner, setSpinner] = useState(true);
  const { user } = useSelector((state) => state.user);
  const inputElement = useRef();
  const theme = useSelector((state) => state.theme.theme);

  const [roomId, setRoomId] = useState(" ");
  // const [socket, setSocket] = useState(null);;
  const fetchMessage = async () => {
    if (user) {
      console.log({ user });
      console.log({ chatPatner });
      const params = {
        sender: user?._id,
        receiver: chatPatner?._id,
      };
      console.log({ params });

      try {
        const response = await axios.get(`${url}/message/`, {
          params: params,
          headers: {
            Authorization: `${Jwttoken}`,
          },
        });
        setMessages(response.data);
        console.log("response", response);
      } catch (error) {
        console.log(error);
      } finally {
        setSpinner(false);
      }
    }
  };
  useEffect(() => {
    fetchMessage();
    socket.emit("user", { user, chatPatner });
    socket.on("joinedRoom", (data) => {
      console.log("fff", { data });
      if (data.success) {
        setRoomId(data.RoomId);
      }
    });

    socket.on("roomMessage", ({ actualRoomId, message }) => {
      console.log(`Received message in room ${actualRoomId}}`);
      fetchMessage();
    });

    return () => {
      setRoomId(" ");
    };
  }, [chatPatner, user]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    try {
      const messageNew = {
        sender: user._id,
        receiver: chatPatner._id,
        Message: message,
      };
      const result = axios.post(`${url}/message/`, messageNew, {
        headers: {
          Authorization: `${Jwttoken}`,
        },
      });
      e.preventDefault();
      console.log({ message, roomId });
      if (message.trim() && roomId != " ") {
        const newMessage = {
          _id: uuidv4(),
          sender: user._id,
          receiver: chatPatner._id,
          Message: message,
          timestamp: new Date().toISOString(),
        };
        socket.emit("sendMessageToRoom", { roomId, newMessage });
      }
      // else {
      //   setMessages((prevmessages) =>
      //     setMessages([...prevmessages, messageNew])
      //   );
      // }
      setMessage("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {spinner ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <form id="form" onSubmit={handleSubmit}>
            <ChatNav chatPatner={chatPatner} />

            <div>
              <div
                className="message-section"
                style={{
                  height: "calc(100vh - 128px)",
                  overflowY: "auto",
                  scrollbarWidth: "none",
                  backgroundColor: theme === "dark" ? "#252c38" : "",
                  color: theme === "dark" ? "#fff" : "",
                }}
              >
                {messages &&
                  messages?.map((item, index) => {
                    return (
                      <div
                        className={
                          item.sender == user._id
                            ? "d-flex justify-content-end"
                            : "d-flex justify-content-start"
                        }
                        style={{
                          margin:
                            item.sender == user._id
                              ? "0 10px 0 0"
                              : "0 0 0 10px",
                        }}
                      >
                        {item.sender == user._id ? (
                          <>
                            <MessageComponent
                              text={item.Message}
                              currentUser={item.sender == user._id}
                            />
                            <FontAwesomeIcon icon={faCheck} />
                            <FontAwesomeIcon icon={faCheck} />
                          </>
                        ) : (
                          <>
                            <RoundImageWithDetails
                              src=""
                              alt="Contact Icon"
                              details="This is the contact icon. Click to contact us."
                            />
                            <MessageComponent
                              text={item.Message}
                              currentUser={item.sender == user._id}
                            />
                          </>
                        )}
                        <div ref={messagesEndRef} />
                      </div>
                    );
                  })}
              </div>
              <div
                className="d-flex justify-content-evenly fixed-bottom "
                style={{
                  padding: "10px",
                  gap: "20px",
                  marginLeft: "195px",
                  backgroundColor: theme === "dark" ? "#252c38" : "",
                  color: theme === "dark" ? "#fff" : "",
                  height: "60px",
                }}
              >
                <input
                  className="form-control"
                  id="exampleFormControlInput1"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />

                <div>
                  <FontAwesomeIcon
                    icon={faFileUpload}
                    className="icon"
                    size="lg"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  send
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default Chat;
