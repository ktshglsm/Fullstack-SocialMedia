import { useState } from "react";
import "./register.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    profilePic:
      "https://nhadepso.com/wp-content/uploads/2023/03/tron-bo-nhung-hinh-nen-dien-thoai-galaxy-dep-chat-luong-nhat_2.jpg",
    coverPic:
      "https://nhadepso.com/wp-content/uploads/2023/03/tron-bo-nhung-hinh-nen-dien-thoai-galaxy-dep-chat-luong-nhat_2.jpg",
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if (inputs.username && inputs.email && inputs.name && inputs.password) {
      try {
        await axios.post("http://localhost:8800/api/auth/register", inputs);
        navigate("/login");
      } catch (error) {
        setErr(error.response.data);
      }
    } else {
      setErr("Please fill all fields!");
    }
  };
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              onChange={handleChange}
              name="username"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={handleChange}
              name="password"
            />
            <input
              type="email"
              placeholder="Email"
              onChange={handleChange}
              name="email"
            />
            <input
              type="text"
              placeholder="Name"
              onChange={handleChange}
              name="name"
            />
            {err && <p>{err}</p>}
            <button onClick={handleRegister}>Register</button>
          </form>
        </div>
        <div className="right">
          <h1>Hello World.</h1>
          <p>This is my new project</p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
