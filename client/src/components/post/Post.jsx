import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useRef, useState } from "react";
import moment from "moment";
import { makeRequest } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Menu from "../menu/Menu";
import { Bookmark, Delete, Favorite } from "@mui/icons-material";

const Post = ({ post }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [commentOpen, setCommentOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const {
    isLoading: likeLoading,
    error: likeError,
    data: likeData,
  } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postId=" + post.id).then((res) => {
      return res.data;
    })
  );
  const queryClient = useQueryClient();
  const mutationLike = useMutation(
    (postId) => {
      return likeData?.includes(currentUser.id)
        ? makeRequest.delete("/likes", { data: { postId } })
        : makeRequest.post("/likes", { postId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("likes", post.id);
      },
    }
  );
  const mutationPost = useMutation(
    (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
      },
    }
  );
  const handleClick = () => {
    mutationLike.mutate(post.id);
  };
  const handleDelete = async () => {
    mutationPost.mutate(post.id);
  };
  const menuRef = useRef(null);
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.User.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.User.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <MoreHorizIcon onClick={() => setOpenMenu((prev) => !prev)} />
            {openMenu && (
              <Menu menuRef={menuRef} setOpenMenu={setOpenMenu}>
                <div className="option">
                  Favorite
                  <Bookmark style={{ color: "yellow" }} />
                </div>
                {post.userId === currentUser.id && (
                  <div className="option" onClick={handleDelete}>
                    Delete Post
                    <Delete style={{ color: "red" }} />
                  </div>
                )}
              </Menu>
            )}
          </div>
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"/upload/" + post.img} alt="" />
        </div>
        <div className="info">
          <div className="item" onClick={handleClick}>
            {likeData?.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon style={{ color: "red" }} />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
            {likeData?.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {post.Comments?.length} Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
