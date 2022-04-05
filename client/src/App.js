import './App.css';
import axios from 'axios'
import Homepage from './Homepage';
import React, { Component, useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import NavBar from './Navbar';
import Footer from './Footer'
import MemeMaker from './MemePages/MemeMaker';
import MemeEditor from './MemePages/MemeEditor'
import Login from './Auth/Login'
import Register from './Auth/Register';
import { ProjectProvider } from "./Global";
import Memes from'./MemePages/Memes';
function App() {


  return (
    <div className="App">
      <ProjectProvider>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/get/:filename" component={MemeEditor} />
            <Route
              path="/mememaker"
              caseSensitive={false}
              component={MemeMaker}
            />
            <Route
              path="/Memesupload"
              caseSensitive={false}
              component={Memes}
            />
            <Route path="/login" caseSensitive={false} component={Login} />
            <Route path="/upload" caseSensitive={false} component={Memes} />
            <Route
              path="/register"
              caseSensitive={false}
              component={Register}
            />
            <Route path="/" caseSensitive={false} component={Homepage} />
          </Switch>
          <Footer />
        </Router>
      </ProjectProvider>
    </div>
  );
}

export default App;
