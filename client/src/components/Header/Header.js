import React, { useState } from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Aboutus from "../AboutUs/Aboutus";
import ContactUs from "../ContactUs/ContactUs";
import { logoutAction } from "../../container/action";

export default function Header() {
  const location = useLocation();
  const dispatch = useDispatch();

  const [aboutUsActive, setAboutUsActive] = useState(false);
  const [contactUsActive, setContactUsActive] = useState(false);

  const closeAboutHandler = () => {
    setAboutUsActive(false);
  };
  const closeContactHandler = () => {
    setContactUsActive(false);
  };

  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  const loggedIn =
    location.pathname !== "/" &&
    location.pathname !== "/login" &&
    location.pathname !== "/signup";
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
        {!loggedIn ? (
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
        ) : (
          <div className="logout-container">
            <Link to="/" onClick={logoutHandler} className="logout">
              Logout <i className="fas fa-sign-out-alt"></i>
            </Link>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
