import {
  DarkModeOutlined,
  EmailOutlined,
  GridViewOutlined,
  HomeOutlined,
  NotificationsOutlined,
  PersonOutlined,
  SearchOutlined,
  WbSunnyOutlined,
} from "@mui/icons-material";
import "./navBar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, toggle } from "../../redux/apiCall";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const NavBar = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const darkMode = useSelector((state) => state.darkMode.currentDarkMode);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery(
    ["userList", search],
    () =>
      search &&
      makeRequest.get("/users/search?search=" + search).then((res) => {
        return res.data;
      })
  );
  const handleLogout = () => {
    logout(dispatch);
    navigate("/");
  };
  const handleClickUser = (userId) => {
    navigate("/profile/" + userId);
    setSearch("");
  };
  return (
    <div className="navBar">
      <div className="left">
        <Link to="/">
          <span>Social Media</span>
        </Link>
        <Link to="/">
          <HomeOutlined />
        </Link>

        {darkMode ? (
          <DarkModeOutlined onClick={() => toggle(dispatch)} />
        ) : (
          <WbSunnyOutlined onClick={() => toggle(dispatch)} />
        )}
        <GridViewOutlined />
        <div className="search">
          <SearchOutlined />
          <input
            type="text "
            placeholder="Search...."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {data && data.length > 0 && (
            <div className="list">
              {data.map((user) => (
                <div className="item" onClick={() => handleClickUser(user.id)}>
                  <img src={user.profilePic} alt="" />
                  <span>{user.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="right">
        <PersonOutlined />
        <EmailOutlined />
        <NotificationsOutlined />
        <div className="user" onClick={handleLogout}>
          <img src={currentUser.profilePic} alt="avt" />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
