import React, { useEffect, useRef, useState } from "react";
import { registerAction } from "../../../container/action";
import { useDispatch } from "react-redux";
import "./RegisterPatient.css";
import { v4 as uuidv4 } from "uuid";
import { states } from "../helper/states";
import axios from "axios";

export default function RegisterPatient(props) {
  const randomPasswordGenerator = () => {
    let stringInclude = "";
    stringInclude += "!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~";
    stringInclude += "0123456789";
    stringInclude += "abcdefghijklmnopqrstuvwxyz";
    stringInclude += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var password = "";
    for (let i = 0; i < 10; i++) {
      password += stringInclude.charAt(
        Math.floor(Math.random() * stringInclude.length)
      );
    }
    return password;
  };

  const dispatch = useDispatch();

  const nameRef = useRef();
  const emailRef = useRef();
  const bloodgGrpRef = useRef();
  const mobileRef = useRef();
  const stateRef = useRef();
  const dobRef = useRef();
  const ailmentRef = useRef();
  const [gender, setGender] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recordSubmitted, setRecordSubmitted] = useState(false);
  const [exisitingRecordForm, setExisitingRecordForm] = useState(false);

  const todayDate = new Date().toISOString().split("T")[0];
  //UseEffect
  useEffect(() => {
    if (recordSubmitted) {
      setTimeout(() => {
        setIsSubmitting(true);
      }, 1000);
    }
  }, [recordSubmitted]);

  //Handlers
  const registerHandler = (e) => {
    const age =
      new Date().getFullYear() - new Date(dobRef.current.value).getFullYear();
    e.preventDefault();
    if (
      nameRef.current.value.trim() !== "" &&
      !/\d/.test(nameRef.current.value) &&
      /\d/.test(mobileRef.current.value) &&
      ailmentRef.current.value.trim() !== ""
    ) {
      const patientPassword = randomPasswordGenerator();
      alert("Account registered successfully! Click 'OK' to view password");
      alert(` Password: ${patientPassword}. Use this password login.`);
      const validate = dispatch(
        registerAction({
          key: mobileRef.current.value,
          password: patientPassword,
          name: nameRef.current.value,
          age,
          bloodgrp: bloodgGrpRef.current.value,
          ailment: ailmentRef.current.value,
          gender,
          state: stateRef.current.value,
          email: emailRef.current.value,
          lastVisit: new Date().toISOString().slice(0, 10),
        })
      );
      validate
        .then((data) => {
          console.log(data);
          setRecordSubmitted(true);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };
  const exisitingRecordHandler = (e) => {
    e.preventDefault();
    if (
      /\d/.test(mobileRef.current.value) &&
      ailmentRef.current.value.trim() !== ""
    ) {
      try {
        const key = mobileRef.current.value;
        const ailment = ailmentRef.current.value;
        const lastVisit = new Date().toISOString().slice(0, 10);
        axios
          .put(`http://localhost:4000/api/existing-user/${key}`, {
            key,
            ailment,
            lastVisit,
          })
          .then((response) => {
            console.log(response.data);
            setRecordSubmitted(true);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <div className="form-body">
        <div className="row">
          <div className="form-holder">
            <div className="form-content">
              <div className="form-items">
                <div className="form-header">
                  <h3>Register Patient</h3>
                  <span
                    className="form-existing"
                    onClick={() => {
                      setExisitingRecordForm((prev) => !prev);
                    }}
                  >
                    {!exisitingRecordForm ? "Exisiting users?" : "Back"}{" "}
                    <i class="fas fa-angle-double-right"></i>
                  </span>
                </div>
                <p>Fill in the data below.</p>
                {!isSubmitting ? (
                  !exisitingRecordForm ? (
                    <form
                      className="requires-validation"
                      noValidate
                      onSubmit={registerHandler}
                    >
                      <div className="col-md-12">
                        <input
                          className="form-control"
                          type="text"
                          name="name"
                          ref={nameRef}
                          placeholder="Full Name"
                          required
                        />
                      </div>

                      <div className="col-md-12">
                        <input
                          className="form-control"
                          type="email"
                          name="email"
                          ref={emailRef}
                          placeholder="E-mail Address"
                          required
                        />
                      </div>

                      <div className="col-md-12">
                        <select ref={bloodgGrpRef}>
                          <option>Blood Group</option>
                          <option>O+</option>
                          <option>O-</option>
                          <option>A+</option>
                          <option>A-</option>
                          <option>B+</option>
                          <option>B-</option>
                          <option>AB+</option>
                          <option>AB-</option>
                        </select>
                      </div>

                      <div className="col-md-12">
                        <input
                          className="form-control"
                          type="text"
                          name="mobile"
                          placeholder="Mobile Number"
                          maxLength="13"
                          required
                          ref={mobileRef}
                        />
                      </div>

                      <div
                        className="col-md-12 mt-3"
                        style={{
                          marginTop: "2rem",
                          fontSize: "1.2rem",
                          padding: "10px",
                        }}
                      >
                        <label className="mb-3 mr-1" htmlFor="gender">
                          Gender:{" "}
                        </label>

                        <input
                          type="radio"
                          className="btn-check"
                          name="gender"
                          id="male"
                          value="M"
                          autoComplete="off"
                          required
                          onChange={(e) => {
                            setGender(e.target.value);
                          }}
                        />
                        <label
                          className="btn btn-sm btn-outline-secondary"
                          htmlFor="male"
                        >
                          Male
                        </label>

                        <input
                          type="radio"
                          className="btn-check"
                          name="gender"
                          id="female"
                          value="F"
                          autoComplete="off"
                          required
                          onChange={(e) => {
                            setGender(e.target.value);
                          }}
                        />
                        <label
                          className="btn btn-sm btn-outline-secondary"
                          htmlFor="female"
                        >
                          Female
                        </label>

                        <input
                          type="radio"
                          className="btn-check"
                          name="gender"
                          id="secret"
                          value="N.S"
                          autoComplete="off"
                          required
                          onChange={(e) => {
                            setGender(e.target.value);
                          }}
                        />
                        <label
                          className="btn btn-sm btn-outline-secondary"
                          htmlFor="secret"
                        >
                          Secret
                        </label>
                      </div>
                      <div
                        className="col-md-12 date-container"
                        style={{ margin: "20px 0px 30px 0px" }}
                      >
                        <label
                          htmlFor="date"
                          style={{
                            fontSize: "1.2rem",
                            marginRight: "10px",
                            marginLeft: "10px",
                          }}
                        >
                          {" "}
                          Date of birth:{" "}
                        </label>
                        <input
                          className="form-control"
                          type="date"
                          name="date"
                          required
                          max={todayDate}
                          ref={dobRef}
                        />
                      </div>
                      <div className="col-md-12" style={{ margin: "25px 0px" }}>
                        <select ref={stateRef}>
                          <option disabled>State</option>
                          {states.map((state) => (
                            <option key={uuidv4()} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="ailments">
                        <textarea
                          className="form-ailments"
                          id="invalidCheck"
                          placeholder="Ailments/Reason of visit"
                          ref={ailmentRef}
                          required
                        />
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="invalidCheck"
                          required
                        />
                        <label className="form-check-label">
                          I confirm that all data are correct
                        </label>
                      </div>

                      <div className="form-button mt-3">
                        <button
                          id="submit"
                          type="submit"
                          className="btn btn-primary"
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  ) : (
                    <form
                      className="requires-validation"
                      noValidate
                      onSubmit={exisitingRecordHandler}
                    >
                      <div className="col-md-12 mobile">
                        <input
                          className="form-control"
                          type="text"
                          name="mobile"
                          placeholder="Mobile Number"
                          maxLength="13"
                          required
                          ref={mobileRef}
                        />
                      </div>
                      <div className="ailments">
                        <textarea
                          className="form-ailments"
                          id="invalidCheck"
                          placeholder="Ailments/Reason of visit"
                          ref={ailmentRef}
                          required
                        />
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="invalidCheck"
                          required
                        />
                        <label className="form-check-label">
                          I confirm that all data are correct
                        </label>
                      </div>

                      <div className="form-button mt-3">
                        <button
                          id="submit"
                          type="submit"
                          className="btn btn-primary"
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  )
                ) : (
                  <div style={{ textAlign: "center" }}>
                    {" "}
                    <h2 style={{ display: "inline-block" }}>
                      Record Successfully Added 👍
                    </h2>{" "}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
