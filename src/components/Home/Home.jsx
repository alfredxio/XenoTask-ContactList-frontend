import React from "react";
import "./home.css";
import { FaLinkedin, FaGithub, FaLink } from "react-icons/fa";

const Home = ({ login }) => {
  return (
    <>
      <div className="container">
        <h1 className="title">CONTACTX</h1>
        <h3 className="subtitle">
          A full stack web app to manage all your contacts
        </h3>
        <button className="login-button" onClick={login}>
          Login using Auth0
        </button>
        <div className="footer__socials">
            <a
            href="https://www.linkedin.com/in/rohitraj45/"
            className="footer__social-link"
            >
            <FaLinkedin />
            </a>

            <a href="https://github.com/alfredxio" className="footer__social-link">
            <FaGithub />
            </a>

            <a href="https://alfredx.in" className="footer__social-link">
            <FaLink />
            </a>
        </div>
      </div>
    </>
  );
};

export default Home;
