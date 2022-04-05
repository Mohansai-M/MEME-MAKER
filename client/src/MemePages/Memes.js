import "../App.css";
import axios from "axios";
import React, { Component, useContext, useState, useEffect } from "react";
import FormData from "form-data";
import '../Auth/Login.css'

function Memes()
{
     const[Image,setImage] = useState([]);
     const[Name,setName] = useState("");
     const[Tags,setTags] = useState("");



function Imgupload(e) {

  setImage(e.target.files[0]);
  console.log(Image);
}

const SubmitForm = (e) =>
{
    e.preventDefault();
    const data  = new FormData();

    data.append('file',Image);
    data.append('filetag',Tags);
    data.append('originalname',Name);

    axios.post("http://localhost:5000/image/upload",data).then
    ((e)=>{console.log("successs")})

    .catch((e) => console.log('Error'.e));

    
}
   
    return (
      <div className="LoginPage">
        <div className="Login">
          <form className="LoginClass" onSubmit={SubmitForm}>
            <h3>Upload Data</h3>
            <div className="form-group ">
              <label>Upload Image</label>
              <input
                type="file"
                className="Loginner"
                name="file"
                id="inputFile"
                placeholder="Choose File"
                onChange={(e) => Imgupload(e)}
              />
            </div>
            <div className="form-group">
              <label for="inputName">Name</label>
              <input
                type="text"
                className="Loginner"
                id="inputName"
                value={Name}
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="inputTags">Tags</label>
              <input
                type="text"
                className="Loginner"
                id="inputTags"
                value={Tags}
                placeholder="Enter Tags"
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            <button type="submit" className="Loginbutton">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
}

export default Memes;