import { useQuery } from "@tanstack/react-query";
import "./rightBar.scss";
import { makeRequest } from "../../axios";
import { useSelector } from "react-redux";

const RightBar = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { id: userId } = currentUser;
  const { isLoading, error, data } = useQuery(["friends", userId], () =>
    makeRequest.get("/relationships/friend").then((res) => {
      return res.data;
    })
  );
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions for you</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://vn-live-01.slatic.net/p/4ae83987b3323025809f737933a4be41.jpg"
                alt=""
              />
              <span>Hoang</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://vn-live-01.slatic.net/p/4ae83987b3323025809f737933a4be41.jpg"
                alt=""
              />
              <span>Hoang</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
        </div>
        <div className="item">
          <span>Activities latest</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://vn-live-01.slatic.net/p/4ae83987b3323025809f737933a4be41.jpg"
                alt=""
              />
              <p>
                <span>Hoang</span>
                Change Picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://vn-live-01.slatic.net/p/4ae83987b3323025809f737933a4be41.jpg"
                alt=""
              />
              <p>
                <span>Hoang</span>
                Change Picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="item">
          <span>Friends</span>
          {data?.map((user) => (
            <div className="user">
              <div className="userInfo">
                <img src={user.profilePic} alt="" />
                <div className="online" />
                <span>{user.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
