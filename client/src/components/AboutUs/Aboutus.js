import React from "react";
import Modal from "../UI/Modal/Modal";
import Button from "../UI/Buttons/Button";
import "./AboutUs.css";

export default function Aboutus(props) {
  return (
    <Modal onClickBackdrop={props.onClickClose}>
      <h2 className="about-title">About Us</h2>
      <h4 className="about-header">
        Hello, Welcome back!
        <br />
      </h4>
      <p className="about-content">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim maiores
        distinctio totam vitae aut recusandae repellat et suscipit accusantium
        veniam ea corrupti quae, nemo provident quidem quod vel minus delectus.
        Enim corrupti voluptatibus quo quam cum maiores porro quis unde maxime
        accusamus, possimus numquam quasi. Consequatur rem officia sit numquam
        quaerat. Suscipit, praesentium nostrum. Quibusdam commodi dolores sit
        reprehenderit ex!
      </p>
      <div className="close-button-container">
        <Button className="close-button" onClickClose={props.onClickClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
}
