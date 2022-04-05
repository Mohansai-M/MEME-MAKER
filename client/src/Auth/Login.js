import { useState,useContext } from "react";
import axios from "axios";
import './Login.css'
import { Link } from "react-router-dom";

function App() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/user/login", { ...user },{ withCredentials: true }  );

      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };


  return (
    <div className="LoginPage">
      <div className="Login">
        <form className="LoginClass">
          <h3>Login</h3>
          <label> Email </label>
          <input
            className="Loginner"
            type="email"
            name="email"
            required
            placeholder="Email..."
            value={user.email}
            onChange={onChangeInput}
          />
          <label>Password</label>
          <input
            className="Loginner"
            type="password"
            name="password"
            required
            autoComplete="on"
            placeholder="Password..."
            value={user.password}
            onChange={onChangeInput}
          />

          <button className="Loginbutton" onClick={loginSubmit}>
            Login
          </button>
          <button className="Registerbutton">
            <Link to="/register" className="register-link" style={{textDecoration:"none"}}>Register</Link>
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
