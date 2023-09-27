import { useState } from "react";
import "./comments.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import { useSelector } from "react-redux";

const Comments = ({ postId }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [desc, setDesc] = useState("");

  const { isLoading, error, data } = useQuery(["comments", postId], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async () => {
    mutation.mutate({ desc, postId });
    setDesc("");
  };
  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {data?.map((comment) => (
        <div className="comment">
          <img src={comment.User.profilePic} alt="" />
          <div className="info">
            <span>{comment.User.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">{moment(comment.createdAt).fromNow()}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
