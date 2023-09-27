import { useQuery } from "@tanstack/react-query";
import "./stories.scss";
import { useSelector } from "react-redux";
import { makeRequest } from "../../axios";

const Stories = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { isLoading, error, data } = useQuery(["stories"], () =>
    makeRequest.get("/stories").then((res) => {
      return res.data;
    })
  );

  return (
    <div className="stories">
      <div className="story">
        <img src={currentUser.profilePic} alt="" />
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>
      {data?.map((story) => (
        <div className="story" key={story.id}>
          <img
            src={
              story.img ||
              "https://i.pinimg.com/736x/6e/42/95/6e42951c52f0fa3e9fda558ef4e6b301.jpg "
            }
            alt=""
          />
          <span>{story.User.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Stories;
