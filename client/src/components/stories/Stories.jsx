import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./stories.scss";
import { useSelector } from "react-redux";
import { makeRequest } from "../../axios";
import { useEffect, useRef, useState } from "react";
import { Close } from "@mui/icons-material";

const Stories = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [openAddStory, setOpenAddStory] = useState(false);
  const [file, setFile] = useState(null);
  const [story, setStory] = useState(0);
  const [openStory, setOpenStory] = useState(false);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { isLoading, error, data } = useQuery(["stories"], () =>
    makeRequest.get("/stories").then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newStory) => {
      return makeRequest.post("/stories", newStory);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("stories");
      },
    }
  );
  const handleClickShare = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) {
      imgUrl = await upload();
      mutation.mutate({ img: imgUrl });
      setFile(null);
      setOpenAddStory(false);
    } else {
      setOpenAddStory(false);
    }
  };
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setOpenAddStory(false);
      setOpenStory(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpenStory = (story) => {
    setStory(story);
    setOpenStory(true);
  };
  return (
    <div className="stories">
      <div className="story">
        <img src={currentUser.profilePic} alt="" />
        <span>{currentUser.name}</span>
        <button onClick={() => setOpenAddStory(true)}>+</button>
      </div>
      {data?.map((story) => (
        <div
          className="story"
          key={story.id}
          onClick={() => handleOpenStory(story)}
        >
          <img src={"./upload/" + story.img} alt="" />
          <span>{story.User.name}</span>
        </div>
      ))}
      {(openAddStory || openStory) && (
        <div className="container-full">
          <div className="temporary" ref={modalRef}>
            <Close
              onClick={() =>
                openAddStory ? setOpenAddStory(false) : setOpenStory(false)
              }
            />
            <img
              src={
                openAddStory
                  ? file
                    ? URL.createObjectURL(file)
                    : "https://i.pinimg.com/736x/6e/42/95/6e42951c52f0fa3e9fda558ef4e6b301.jpg "
                  : "/upload/" + story.img
              }
              alt=""
            />
            {openAddStory && (
              <>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <label className="choose-image" htmlFor="file">
                  Choose Image
                </label>
                <button className="share" onClick={handleClickShare}>
                  Share
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;
