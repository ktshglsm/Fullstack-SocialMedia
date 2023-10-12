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
  const [text, setText] = useState("");
  const {
    isLoading: isLoadingCon,
    error: errorCon,
    data: dataCon,
  } = useQuery(["conversation", secondUser], () =>
    makeRequest.get("/conversations/" + secondUser).then((res) => {
      return res.data;
    })
  );

  const conversationId = dataCon?.conversation.id;
  const {
    isLoading: isLoadingMs,
    error: errorMs,
    data: dataMs,
  } = useQuery(["messages", conversationId], () =>
    makeRequest.get("/messages/" + conversationId).then((res) => {
      return res.data;
    })
  );

  const conversationRef = useRef(null);
  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [dataMs]);

  const handleSend = async () => {
    setText("");
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
        {dataMs?.map((message) => (
          <div
            className={
              "message " +
              (message.sender === currentUser.id ? "sender" : "receiver")
            }
          >
            {message.sender !== currentUser.id && (
              <img src={message.send.profilePic} alt="" />
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
          onChange={(e) => setText(e.target.value)}
        />
        <Send onClick={handleSend} />
      </div>
    </div>
  );
};

export default Chat;
