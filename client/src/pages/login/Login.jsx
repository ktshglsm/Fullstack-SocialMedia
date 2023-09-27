import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCall";

const Login = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(dispatch, inputs);
    } catch (error) {
      setErr(error.response.data);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>This is my new project</p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
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
            {err && <p>{err}</p>}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
