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
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

const NavBar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const { darkMode, toggle } = useContext(DarkModeContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="navBar">
      <div className="left">
        <Link to="/">
          <span>Social Media</span>
        </Link>
        <HomeOutlined />
        {darkMode ? (
          <DarkModeOutlined onClick={toggle} />
        ) : (
          <WbSunnyOutlined onClick={toggle} />
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
