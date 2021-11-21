import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Aboutus from "../AboutUs/Aboutus";
import ContactUs from "../ContactUs/ContactUs";

export default function Header() {
  const [aboutUsActive, setAboutUsActive] = useState(false);
  const [contactUsActive, setContactUsActive] = useState(false);

  const closeAboutHandler = () => {
    setAboutUsActive(false);
  };
  const closeContactHandler = () => {
    setContactUsActive(false);
  };
  return (
    <React.Fragment>
      {aboutUsActive && <Aboutus onClickClose={closeAboutHandler} />}
      {contactUsActive && <ContactUs onClickClose={closeContactHandler} />}
      <div className="nav-container">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          {" "}
          <div className="nav-title">
            <h2>Medicords</h2>
          </div>
        </Link>
        <ul className="links-container">
          <li
            className="link"
            onClick={() => {
              setAboutUsActive(true);
            }}
          >
            About us
          </li>
          <li
            className="link"
            onClick={() => {
              setContactUsActive(true);
            }}
          >
            Contact us
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}
