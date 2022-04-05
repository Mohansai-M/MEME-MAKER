import React, { useEffect,useState,Component, useRef, useContext } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import { List, User } from "phosphor-react";
import "./Navbar.css";
import './App.css';
import Logo from "./Images/logo.png";
import { ProjectContext, ProjectProvider } from "./Global";
function NavBar ()
{
   
     const state = useContext(ProjectContext);
     const [isLogged] = state.useCheck.isLogged;
     const [isAdmin] = state.useCheck.isAdmin;

     
    const logoutUser = async () => {
      await axios.get("http://localhost:5000/user/logout");

      localStorage.removeItem("firstLogin");

      window.location.href = "/";
    };
     const adminRouter = () =>{
        return(
            <>
                <li><Link to="/Memesupload" className="mainnavlink">Upload Meme</Link></li>
            </>
        )
    }

    return (
        <header className="header">
           <Link to="/" className="mainnavlink"><img className="logo" src={Logo} alt="Logo" /></Link>
          <nav className="main-nav">
            <ul className="mainnavlist">
          <li> <Link to="/" className="mainnavlink nav-cta"> Make a Meme </Link> </li>
          <li> <Link to="/" className="mainnavlink"> Tutorial </Link> </li>
          <li> <Link to="/mememaker" className="mainnavlink"> Memes </Link> </li>
            {isAdmin && adminRouter()}
                {
          isLogged ?<li><Link to="/" className="mainnavlink" onClick={logoutUser}>Logout</Link></li> : <> <li><Link to="/login" className="mainnavlink"> SignIn</Link> </li>
          <li><Link to="/register" className="mainnavlink"> Register </Link></li></>
                }
         </ul>

          </nav>
        <input type="checkbox" id="click"></input>
           <label for="click" className="menu-btn">
           <ion-icon name="menu-outline"></ion-icon>
           </label>
        </header>
    );
  
    }

export default NavBar;