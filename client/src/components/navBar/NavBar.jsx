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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, toggle } from "../../redux/apiCall";

const NavBar = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const darkMode = useSelector((state) => state.darkMode.currentDarkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(dispatch);
    navigate("/");
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
          <input type="text " placeholder="Search...." />
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
