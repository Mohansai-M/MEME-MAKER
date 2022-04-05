import { useState } from "react";
import axios from "axios";
import './Login.css'

function App() {
  
 const [user, setUser] = useState({
   name: "",
   email: "",
   password: "",
 });

 const onChangeInput = (e) => {
   const { name, value } = e.target;
   setUser({ ...user, [name]: value });
 };

 const registerSubmit = async (e) => {
   e.preventDefault();
   try {
     await axios.post("http://localhost:5000/user/register", { ...user });

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
          <h3>SignUp</h3>
          <label>Name</label>
          <input
            className="Loginner"
            type="text"
            name="name"
            required
            placeholder="Name"
            value={user.name}
            onChange={onChangeInput}
          />
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
            placeholder="Password..."
            value={user.password}
            onChange={onChangeInput}
          />

          <button className="Loginbutton" onClick={registerSubmit}>
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
