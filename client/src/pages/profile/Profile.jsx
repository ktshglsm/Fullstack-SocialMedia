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
import { Close } from "@mui/icons-material";
import Posts from "../../components/posts/Posts";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateUser } from "../../redux/apiCall";

const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const {
    isLoading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(["user", userId], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
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

  const [openUpdate, setOpenUpdate] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [city, setCity] = useState(currentUser.city);
  const [website, setWebsite] = useState(currentUser.website);
  const [profilePic, setProfilePic] = useState(null);
  const [coverPic, setCoverPic] = useState(null);
  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return "/upload/" + res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    let profileUrl = "";
    let coverUrl = "";
    if (profilePic) profileUrl = await upload(profilePic);
    if (coverPic) coverUrl = await upload(coverPic);
    const newUser = {
      name,
      city,
      website,
      profilePic: profileUrl || currentUser.profilePic,
      coverPic: coverUrl || currentUser.coverPic,
    };
    await updateUser(dispatch, newUser);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setName(currentUser.name);
    setCity(currentUser.city);
    setWebsite(currentUser.website);
    setProfilePic(null);
    setCoverPic(null);
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [userId]);
  return (
    <div className="profile">
      <div className="images">
        <img src={userData?.coverPic} alt="" className="coverPic" />
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
            {!(parseInt(userId) === currentUser.id) ? (
              relationshipData?.includes(parseInt(userId)) ? (
                <button className="un-follow" onClick={mutation.mutate}>
                  Un Follow
                </button>
              ) : (
                <button className="follow" onClick={mutation.mutate}>
                  Follow
                </button>
              )
            ) : (
              <button className="update" onClick={() => setOpenUpdate(true)}>
                Update Profile
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
      {openUpdate && (
        <div className="container-full">
          <div className="temporary">
            <Close onClick={handleCloseUpdate} />
            <form action="">
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <label htmlFor="city">City: </label>
              <input
                type="text"
                id="city"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
              <label htmlFor="website">Website: </label>
              <input
                type="text"
                id="website"
                onChange={(e) => setWebsite(e.target.value)}
                value={website}
              />
              <div style={{ display: "flex", gap: "20px" }}>
                <input
                  type="file"
                  id="profile"
                  style={{ display: "none" }}
                  onChange={(e) => setProfilePic(e.target.files[0])}
                />
                <label className="choose-image" htmlFor="profile">
                  Choose ProfilePic
                </label>
                <input
                  type="file"
                  id="cover"
                  style={{ display: "none" }}
                  onChange={(e) => setCoverPic(e.target.files[0])}
                />
                <label className="choose-image" htmlFor="cover">
                  Choose CoverPic
                </label>
              </div>
              <div className="images">
                <img
                  src={
                    coverPic
                      ? URL.createObjectURL(coverPic)
                      : currentUser.coverPic
                  }
                  alt=""
                  className="coverPic"
                />
                <img
                  src={
                    profilePic
                      ? URL.createObjectURL(profilePic)
                      : currentUser.profilePic
                  }
                  alt=""
                  className="profilePic"
                />
              </div>
              <button className="update" onClick={handleUpdate}>
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
