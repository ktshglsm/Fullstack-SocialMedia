import { useQuery } from "@tanstack/react-query";
import Post from "../post/Post";
import "./posts.scss";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";

const Posts = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const { isLoading, error, data } = useQuery(["posts"], () => {
    if (userId) {
      return makeRequest.get("/posts/" + userId).then((res) => {
        return res.data;
      });
    } else {
      return makeRequest.get("/posts").then((res) => {
        return res.data;
      });
    }
  });
  return (
    <div className="posts">
      {data?.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Posts;
