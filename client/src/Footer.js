import { FacebookLogo, InstagramLogo, TwitterLogo } from "phosphor-react";
import react from "react";
import { Link } from "react-router-dom";
import './Footer.css'
import Logo from './Images/logo.png'


function Footer()
{
    return (
      <footer className="footer">
        <div className="containy grid grid-footer">
          <div className="logo-col">
            <img src={Logo} className="logo" />

            <ul className="social-media">
              <li>
                <a href="#" className="footer-link">
                  <TwitterLogo
                    className="social-icon"
                    size={32}
                    weight="fill"
                  />
                </a>{" "}
              </li>
              <li>
                <a href="#" className="footer-link">
                  <InstagramLogo
                    className="social-icon"
                    size={32}
                    weight="fill"
                  />
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  <FacebookLogo
                    className="social-icon"
                    size={32}
                    weight="fill"
                  />
                </a>
              </li>
            </ul>
            <p className="copyright">
              Copyright &copy; 2022 by Meme Maker All rights reserved.
            </p>
          </div>
          <div className="address-col">
            <p className="footer-heading">Contact us</p>
            <address className="contacts">
              <p className="address">
                {" "}
                House No-201, 2nd Floor, Nandana Gardens,Vijayawada
              </p>
              <a className="footer-link" href="tel:234-987-299">
                234-987-299
              </a>
              <br />
              <a className="footer-link" href="mailto:mohansai.92000@gmail.com">
                mohansai.92000@gmail.com
              </a>
            </address>
          </div>
          <div className="nav-col">
            <p className="footer-heading">Account</p>
            <ul className="footer-nav">
              <li>
                <Link to="/login" className="footer-link">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/register" className="footer-link">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
          <div className="nav-col">
            <p className="footer-heading">Company</p>
            <ul className="footer-nav">
              <li>
                <Link to="/" className="footer-link">
                  About MemeMaker
                </Link>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Tutorial
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Meme Editor
                </a>
              </li>
              <li>
                <Link to="/mememaker" className="footer-link">
                  Search
                </Link>
              </li>
            </ul>
          </div>
          <div className="nav-col">
            <div className="nav-col">
              <p className="footer-heading">Resources</p>
              <ul className="footer-nav">
                <li>
                  <a href="#" className="footer-link">
                    Privacy & Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );

}

export default Footer;