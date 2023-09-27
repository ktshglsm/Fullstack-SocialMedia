import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const {
    isLoading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(["user", userId], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return res.data;
    })
  );
  const {
    isLoading: relationshipLoading,
    error: relationshipError,
    data: relationshipData,
  } = useQuery(["relationships"], () =>
    makeRequest.get("/relationships/followed").then((res) => {
      return res.data;
    })
  );
  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => {
      return relationshipData?.includes(parseInt(userId))
        ? makeRequest.delete("relationships", {
            data: { followedUser: userId },
          })
        : makeRequest.post("relationships", { followedUser: userId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("relationships");
      },
    }
  );
  return (
    <div className="profile">
      <div className="images">
        <img src={userData?.coverPic} alt="" className="cover" />
        <img src={userData?.profilePic} alt="" className="profilePic" />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{userData?.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{userData?.city || "Viet Nam"}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{userData?.website || "facebook.com"}</span>
              </div>
            </div>
            {relationshipData?.includes(parseInt(userId)) ? (
              <button className="un-follow" onClick={mutation.mutate}>
                Un Follow
              </button>
            ) : (
              <button className="follow" onClick={mutation.mutate}>
                Follow
              </button>
            )}
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        <Posts />
      </div>
    </div>
  );
};

export default Profile;
