import React from "react";
import Modal from "../UI/Modal/Modal";
import Button from "../UI/Buttons/Button";
import "./ContactUs.css";

export default function ContactUs(props) {
  return (
    <Modal onClickBackdrop={props.onClickClose}>
      <div className="contact-container">
        <h2 className="contact-title">Contact Us</h2>
        <h4 className="contact-header">
          Reach us out!, We'd love to hear from our community ❤️
          <br />
        </h4>
        <div className="reachus-container">
          <a href="mailto:medicords-crc@medi.com?subject=Community Reach Out">
            Email Us <i class="far fa-envelope"></i>
          </a>
          <div>
            <h4 style={{ fontSize: "1.2rem" }}>Social media</h4>
            <div className="icons">
              <a href="https://www.facebook.com/">
                <i style={{ cursor: "pointer" }} class="fab fa-facebook"></i>
              </a>
              <a href="https://www.instagram.com/">
                <i style={{ cursor: "pointer" }} class="fab fa-instagram"></i>
              </a>
              <a href="https://twitter.com/?lang=en">
                <i style={{ cursor: "pointer" }} class="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="close-button-container">
          <Button className="close-button" onClickClose={props.onClickClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
