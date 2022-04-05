import "./Homepage.css";
import React, { Component, useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Routes, } from "react-router-dom";
import Cover from "./Images/memecover.png";
import Image from "./Images/imag.png";
import Edit from "./Images/editimg.png";
import Download from "./Images/imdown.png";
import {IoMdColorWand} from 'react-icons/io'
import {BsFileFont} from 'react-icons/bs'
import {AiFillHeart} from 'react-icons/ai'
import {FaArrowsAltV} from 'react-icons/fa'
function Homepage() {

  const[File,setFile] = useState(null)
  const [Meme, setMeme] = useState([]);
   const HandleSetFile = (e) => {
     console.log(e.target.files[0]);
    /* setFilyName(e.target.files[0].name);
     setFilesize(e.target.files[0].size);
     setFileType(e.target.files[0].type);
     setFileDate(e.target.files[0].lastModified);*/
     let reader = new FileReader();
     reader.readAsDataURL(e.target.files[0]);

     reader.onload = (e) => {
       setFile(reader.result);
     };


   };
  return (
    <main>
      <section className="Homepage">
        <div className="HomeContainer">
          <div className="TextBox">
            <h1 className="headingprimary">
              Be Creative and Make your Own Memes now!
            </h1>
            <p className="HeaderDescription">
              Memes in 2022 are no longer basic images with Impact font. Today's
              memes weave deep into the Internet's social fabric, and are
              created from a variety of formats, from text posts on Twitter to
              videos shared across society.They share a special bond with social
              meida users and They became an important part in every day lives.
            </p>
            <Link
              to="/MemeMaker"
              className="button button-full margin-right-sm"
            >
              Start with a Meme
            </Link>
            <a href="#" className="button button-outline">
              Learn More &darr;
            </a>
          </div>
          <div className="ImgBox">
            <img src={Cover} className="CoverImage" alt="Memes Collage" />
          </div>
        </div>
      </section>

      <section className="HowWork">
        <div className="containy">
          <span className="subheading">How it Works</span>
          <h2 className="headingsecondary">
            Meme can be made in three simple steps
          </h2>
        </div>

        <div className="containy grid grid2cols gridcenter">
          <div className="step-text-box">
            <p className="step-number">01</p>
            <h3 className="heading-teritary">Most Popular Meme Tamplates</h3>
            <p className="stepdescription">
              Most Meme Templates are available on Meme Maker. We provide
              various Images for a diversity of Meme creators and We provide a
              feature to upload your image and can make a Meme.
            </p>
          </div>
          <div className="step-image-box">
            <img src={Image} className="step-Img" alt="Image Upload" />
          </div>

          <div className="step-image-box">
            <img src={Edit} className="step-Img" alt="Image Edit" />
          </div>
          <div className="step-text-box">
            <p className="step-number">02</p>
            <h3 className="heading-teritary">Edit Your Meme</h3>
            <p className="stepdescription">
              You can Edit Yor Meme with Draggable Text,Font Styles,Text border
              one can Apply Filters on Meme and they can even resize text and
              add it to Meme Template.
            </p>
          </div>
          <div className="step-text-box">
            <p className="step-number">03</p>
            <h3 className="heading-teritary">Meme Download</h3>
            <p className="stepdescription">
              After finalizing meme you can easily Download your Meme. We have
              Dowload Meme Options with Multiple Sizes and One Can Acces them If
              he is a User.We provide a low Resolution Image for Non Registered
              Users.
            </p>
          </div>

          <div className="step-image-box">
            <img src={Download} className="step-Img" alt="Image Dowload" />
          </div>
        </div>
      </section>
      <section className="sfeatures">
        <div className="sectionfeatures">
          <div className="containy centerText">
            <span className="subheading">Features</span>
            <h2 className="headingsecondary">Below Features are Amazing</h2>
          </div>
          <div className="containy grid grid4cols">
            <div className="features">
              <BsFileFont className="feature-icon" />
              <div className="featurecontent">
                <h3 className="Texttitle">Text</h3>
                <p className="Textcontent">
                  MemeMaker PRovide Multiple Font Styles that makes a Meme Maker
                  Comfortable and brings beauty to Meme.
                </p>
              </div>
            </div>
            <div className="features">
              <IoMdColorWand className="feature-icon" />
              <div className="featurecontent">
                <h3 className="Texttitle">Edit</h3>
                <p className="Textcontent">
                  MemeMaker has wide variety of Editing facilities to add border
                  to Text and Even Increase It. Even One Can Add Filters to Meme
                  Tamplates
                </p>
              </div>
            </div>
            <div className="features">
              <AiFillHeart className="feature-icon" />
              <div className="featurecontent">
                <h3 className="Texttitle">Like</h3>
                <p className="Textcontent">
                  MemeMaker provides user a Like Option that will be storred in
                  Users like Histry and Meme Like COunt will be Increased
                </p>
              </div>
            </div>
            <div className="features">
              <FaArrowsAltV className="feature-icon" />
              <div className="featurecontent">
                <h3 className="Texttitle">updown</h3>
                <p className="Textcontent">
                  MemeMaker provides Two Text Options i.e they are draggable
                  From Top and Bottom to Various LOcations of Image
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Homepage;
