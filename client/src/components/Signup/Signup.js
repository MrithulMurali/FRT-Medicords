import { React, useEffect, useState } from "react";
import { useRef } from "react";
import Button from "../UI/Buttons/Button";
import "./Signup.css";

export default function Login() {
  const [mailStatus, setMailStatus] = useState(false);
  const [mailPageStatus, setMailPageStatus] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();
  const addressRef = useRef();

  useEffect(() => {
    alert(
      "For security purposes medicords verifies documents and updates new admin accounts through mail.\n\nDummy admin account to access: \n\nADMIN ID: admin123 \nUsername: admin \nPassword: admin"
    );
  }, []);

  useEffect(() => {
    if (mailStatus) {
      setTimeout(() => {
        setMailPageStatus(true);
      }, 1000);
    }
  }, [mailStatus]);
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (
      nameRef.current.value.trim() !== "" &&
      emailRef.current.value.trim() !== "" &&
      mobileRef.current.value.trim() !== "" &&
      addressRef.current.value.trim() !== ""
    ) {
      /* emailjs
        .sendForm(
          "gmail",
          "template_wo9y4vi",
          e.target,
          "user_4K1juGBBzt655ESKwSejN"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        ); */
      setMailStatus(true);
    } else {
      alert("Fields cannot be empty!");
    }
  };

  return (
    <div className="register">
      <fieldset className="reg-container">
        <legend>Register your hospital</legend>
        {!mailPageStatus ? (
          <form onSubmit={formSubmitHandler}>
            <div className="register-form-container">
              <p>Hospital details</p>
              <input
                className="signup-text-input"
                type="text"
                name="hospname"
                id="hospname"
                ref={nameRef}
                placeholder="Name"
                required
              />
              <input
                className="signup-text-input"
                type="email"
                name="hospemail"
                id="hospemail"
                placeholder="Email"
                ref={emailRef}
                required
              />
              <input
                className="signup-text-input"
                type="text"
                name="hospmob"
                id="hospmob"
                placeholder="Mobile"
                maxLength="13"
                ref={mobileRef}
                required
              />
              <textarea
                placeholder="Address"
                name="hospadd"
                id="hospadd"
                rows="7"
                cols="60"
                required
                ref={addressRef}
              />
              <div className="ownership-container">
                <label htmlFor="pdf">Proof of Ownership:</label>
                <input type="file" name="pdf" accept="application/pdf" />
              </div>
            </div>{" "}
            <div className="reach-button-container">
              <Button className="reach-out-button">
                Reach us <i className="far fa-envelope"></i>
              </Button>
            </div>
          </form>
        ) : (
          <div>
            <h2>Thank you for choosing US!</h2>
            <p>We will reach you back in 2 days max.</p>
            <br />
            <p>Stay put!</p>
            <p>Team Medicords.</p>
          </div>
        )}
      </fieldset>
    </div>
  );
}
