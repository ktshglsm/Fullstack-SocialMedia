import { useEffect, useRef, useState } from "react";
import "./chat.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Close, Send } from "@mui/icons-material";

const Chat = ({ secondUsers, handleOpenChat }) => {
  return (
    <div className="chat">
      {secondUsers.map((id) => (
        <Conversation secondUser={id} handleOpenChat={handleOpenChat} />
      ))}
    </div>
  );
};

const Conversation = ({ secondUser, handleOpenChat }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { socket } = useSelector((state) => state.chat);
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(0);
  const [text, setText] = useState("");
  const {
    isLoading: isLoadingCon,
    error: errorCon,
    data: dataCon,
  } = useQuery(["conversation", secondUser], () =>
    makeRequest.get("/conversations/" + secondUser).then((res) => {
      setConversationId(res.data.conversation.id);
      return res.data;
    })
  );

  const {
    isLoading: isLoadingMs,
    error: errorMs,
    data: dataMs,
  } = useQuery(["messages", conversationId], () =>
    makeRequest.get("/messages/" + conversationId).then((res) => {
      setMessages(res.data);
      return res.data;
    })
  );

  useEffect(() => {
    if (socket === null || conversationId === 0) return;
    socket.on("getMessage", (res) => {
      res.conversationId === conversationId &&
        setMessages((prev) => [...prev, res]);
    });
    return () => {
      socket.off("getMessage");
    };
  }, [socket, conversationId]);
  const conversationRef = useRef(null);
  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (text) {
      const newMessage = {
        text,
        conversationId,
        receiver: dataCon?.otherUser.id,
        sender: currentUser.id,
      };
      const newNotification = {
        conversationId,
        receiver: dataCon?.otherUser.id,
        sender: currentUser.id,
      };
      await makeRequest.post("/messages", newMessage);
      await makeRequest.post("/notifications", newNotification);
      await socket.emit("addMessage", newMessage);
      await socket.emit("addNotification", newNotification);
      setMessages((prev) => [...prev, newMessage]);
    }
    setText("");
  };
  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      await handleSend();
      event.target.focus();
    }
  };
  return (
    <div className="conversation">
      <div className="header">
        <div className="user">
          <img src={dataCon?.otherUser.profilePic} alt="" />
          <span>{dataCon?.otherUser.name}</span>
        </div>
        <Close onClick={() => handleOpenChat(dataCon?.otherUser.id)} />
      </div>
      <div className="body" ref={conversationRef}>
        {messages?.map((message) => (
          <div
            className={
              "message " +
              (message.sender === currentUser.id ? "sender" : "receiver")
            }
          >
            {message.sender !== currentUser.id && (
              <img src={dataCon?.otherUser.profilePic} alt="" />
            )}

            <div
              className={message.sender === currentUser.id ? "send" : "receive"}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="footer">
        <input
          type="text"
          placeholder="Send..."
          value={text}
          onKeyPress={handleKeyPress}
          onChange={(e) => setText(e.target.value)}
        />
        <Send onClick={handleSend} />
      </div>
    </div>
  );
};

export default Chat;
