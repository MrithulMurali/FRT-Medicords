import React, { useState } from "react";
import "./Header.css";
import axios from "axios";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Aboutus from "../AboutUs/Aboutus";
import ContactUs from "../ContactUs/ContactUs";
import { logoutAction } from "../../container/action";
import Hamburger from "./Hamburger/Hamburger";

export default function Header() {
  const location = useLocation();
  const history = useHistory();
  const path = location.pathname;
  const key = path.slice(6);
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
  const deleteAccountHandler = () => {
    const choice = prompt(
      "This is an irreversible action which will delete your account with all its data. Do you want to continue? Y/N "
    );
    if (choice.toLowerCase() === "y") {
      const token = localStorage.getItem("x-access-token");
      axios
        .delete(`http://localhost:4000/api/delete/${key}`, {
          headers: { "x-access-token": token },
        })
        .then((response) => {
          console.log(response.data);
          alert("Account deleted successfully! Thank you for using medicords!");
          localStorage.clear();
          history.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
        ) : location.pathname === "/admin" ? (
          <div className="logout-container">
            <Link to="/" onClick={logoutHandler} className="logout">
              Logout <i className="fas fa-sign-out-alt"></i>
            </Link>
          </div>
        ) : (
          <Hamburger
            logoutHandler={logoutHandler}
            deleteAccountHandler={deleteAccountHandler}
          />
        )}
      </div>
    </React.Fragment>
  );
}
