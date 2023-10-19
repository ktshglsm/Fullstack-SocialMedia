import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./rightBar.scss";
import { makeRequest } from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { updateOnline, updateSocket } from "../../redux/apiCall";
import Chat from "../chat/Chat";

const RightBar = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { onlineUsers, socket } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const { id: userId } = currentUser;
  const [friends, SetFriends] = useState([]);

  const { isLoading, error, data } = useQuery(["friends", userId], () =>
    makeRequest.get("/relationships/friend").then((res) => {
      SetFriends(
        res.data.map((friend) => ({
          ...friend,
          NotificationSend: friend.NotificationSend.length,
        }))
      );
      return res.data;
    })
  );

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (sender) => {
      return makeRequest.delete("/notifications/" + sender);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("friends");
      },
    }
  );
  const [secondUsers, setSecondUsers] = useState([]);
  useEffect(() => {
    const newSocket = io("http://localhost:8080");
    updateSocket(dispatch, newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [currentUser]);
  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", currentUser.id);
    socket.on("getOnlineUsers", (res) => {
      updateOnline(dispatch, res);
    });
    socket.on("getNotification", (res) => {
      !secondUsers.includes(res.sender)
        ? SetFriends((prev) =>
            prev.map(
              (friend) =>
                friend.id === res.sender && {
                  ...friend,
                  NotificationSend: friend.NotificationSend + 1,
                }
            )
          )
        : makeRequest.delete("/notifications/" + res.sender);
    });
    return () => {
      socket.off("getOnlineUsers");
      socket.off("getNotification");
    };
  }, [socket, secondUsers]);
  const handleOpenChat = (id) => {
    if (secondUsers.indexOf(id) !== -1) {
      let newSecondUsers = [...secondUsers];
      newSecondUsers.splice(secondUsers.indexOf(id), 1);
      setSecondUsers(newSecondUsers);
    } else if (secondUsers.length === 3) {
      let newSecondUsers = [...secondUsers];
      newSecondUsers.shift();
      newSecondUsers.push(id);
      setSecondUsers(newSecondUsers);
      mutation.mutate(id);
    } else {
      setSecondUsers([...secondUsers, id]);
      mutation.mutate(id);
    }
  };

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Friends</span>
          {friends?.map((user) => (
            <div className="user" onClick={() => handleOpenChat(user.id)}>
              <div className="userInfo">
                <img src={user.profilePic} alt="" />
                {onlineUsers.some((oUser) => oUser.userId === user.id) && (
                  <div className="online" />
                )}
                <span>{user.name}</span>
              </div>
              {user.NotificationSend > 0 && (
                <div className="notification">{user.NotificationSend}</div>
              )}
            </div>
          ))}
        </div>
        {secondUsers.length > 0 && (
          <Chat secondUsers={secondUsers} handleOpenChat={handleOpenChat} />
        )}
      </div>
    </div>
  );
};

export default RightBar;
