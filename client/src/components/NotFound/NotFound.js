import React from "react";
import Button from "../UI/Buttons/Button";
import { Link } from "react-router-dom";
import NotFoundImg from "../../images/Notfound.jpg";
import "./Notfound.css";
export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img
        src={NotFoundImg}
        alt="not-found"
        style={{ width: "700px", height: "450px", margin: "50px auto" }}
      />
      <div>
        <Link to="/">
          <Button className="home-button">Back to home</Button>
        </Link>
      </div>
    </div>
  );
}
