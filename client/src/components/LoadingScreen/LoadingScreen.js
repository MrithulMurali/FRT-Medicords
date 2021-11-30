import React from "react";
import Pages from "../../images/pages.gif";
import "./LoadingScreen.css";

export default function LoadingScreen() {
  return (
    <div className="loading-container">
      <img src={Pages} alt="pages" className="pages" />
      <h4>Loading...</h4>
    </div>
  );
}
