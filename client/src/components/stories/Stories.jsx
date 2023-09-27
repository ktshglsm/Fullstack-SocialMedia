import "./stories.scss";
import { useSelector } from "react-redux";

const Stories = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  //TEMPORARY
  const stories = [
    {
      id: 1,
      name: "John Doe",
      img: "https://i.ex-cdn.com/mgn.vn/files/content/2022/06/17/muc-truy-na-chopper-1222.jpg",
    },
    {
      id: 2,
      name: "John Doe",
      img: "https://i.ex-cdn.com/mgn.vn/files/content/2022/06/17/muc-truy-na-chopper-1222.jpg",
    },
    {
      id: 3,
      name: "John Doe",
      img: "https://i.ex-cdn.com/mgn.vn/files/content/2022/06/17/muc-truy-na-chopper-1222.jpg",
    },
    {
      id: 4,
      name: "John Doe",
      img: "https://i.ex-cdn.com/mgn.vn/files/content/2022/06/17/muc-truy-na-chopper-1222.jpg",
    },
  ];

  return (
    <div className="stories">
      <div className="story">
        <img src={currentUser.profilePic} alt="" />
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>
      {stories.map((story) => (
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Stories;
