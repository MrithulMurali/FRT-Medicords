import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Hamburger.css";
export default function Hamburger(props) {
  const [navActive, setNavActive] = useState(true);
  const hamburgerHandler = () => {
    setNavActive((prev) => !prev);
  };
  return (
    <div className="hamburger">
      <div className="toggle-button" onClick={hamburgerHandler}>
        <span
          className="bar"
          style={{
            transform: `${
              !navActive ? "rotate(45deg) translate(5px,5px)" : ""
            }`,
            transition: "all 500ms ease",
          }}
        ></span>
        <span
          className="bar"
          style={{
            opacity: `${!navActive ? 0 : 1}`,
            transition: "all 500ms ease",
          }}
        ></span>
        <span
          className="bar"
          style={{
            transform: `${
              !navActive ? "rotate(135deg) translate(-5.5px,9px)" : ""
            }`,
            transition: "all 500ms ease",
          }}
        ></span>
      </div>
      <div className={`collapse ${!navActive && "active-collapse"}`}>
        <ul className="dropdown-container">
          <Link
            to="/"
            className="logout-dropdown"
            onClick={props.logoutHandler}
          >
            Logout <i className="fas fa-sign-out-alt"></i>
          </Link>
          <li className="delete-dropdown" onClick={props.deleteAccountHandler}>
            Delete Account <i className="far fa-trash-alt"></i>
          </li>
        </ul>
      </div>
    </div>
  );
}
