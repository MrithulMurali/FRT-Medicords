import React, { useEffect, useRef, useState } from "react";
import "./RegisterPatient.css";
import { districts } from "../helperDistricts";

export default function RegisterPatient(props) {
  const nameRef = useRef();
  const emailRef = useRef();
  const bloodgGrpRef = useRef();
  const mobileRef = useRef();
  const districtRef = useRef();
  const dobRef = useRef();
  const ailmentRef = useRef();
  const [gender, setGender] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recordSubmitted, setRecordSubmitted] = useState(false);

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
      fetch("http://localhost:8080/admin/api/registerPatient",{
            method: 'POST',
            body: JSON.stringify({
               patient_name :nameRef.current.value,
             blood_group : bloodgGrpRef.current.value,
             patient_district : districtRef.current.value,
             patient_dob : dobRef.current.value,
             patient_gender : gender,
              patient_mobile : mobileRef.current.value,
             patient_email: emailRef.current.value,
             lastVisit: new Date().toISOString().slice(0, 10),
           ailment : ailmentRef.current.value,
            }),
            headers: {
              'Content-type':'application/json'
            }
          }).then(res=>res.json()).then(res=>{
           console.log(res);
           props.updateRecords({
            name: nameRef.current.value,
            email: emailRef.current.value,
            bgroup: bloodgGrpRef.current.value,
            mobile: mobileRef.current.value,
            sex: gender,
            districts: districtRef.current.value,
            dob: dobRef.current.value,
            lastVisit: new Date().toISOString().slice(0, 10),
            age,
            ailments: ailmentRef.current.value,
          });
          setRecordSubmitted(true);
          }).catch(err=>console.log(err));
      
    } else {
      alert("Input values are not proper. Try again! ");
    }
  };
  const genderHandler = (e) => {
    setGender(e.target.value);
  };
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <div className="form-body">
        <div className="row">
          <div className="form-holder">
            <div className="form-content">
              <div className="form-items">
                <h3>Register Patient</h3>
                <p>Fill in the data below.</p>
                {!isSubmitting ? (
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
                      {/* <div className="valid-feedback">
                          Username field is valid!
                        </div>
                        <div className="invalid-feedback">
                          Username field cannot be blank!
                        </div> */}
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
                      {/* <div className="valid-feedback">Email field is valid!</div>
                        <div className="invalid-feedback">
                          Email field cannot be blank!
                        </div> */}
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
                      {/* <div className="valid-feedback">
                          You selected a position!
                        </div>
                        <div className="invalid-feedback">
                          Please select a position!
                        </div> */}
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
                      {/*  <div className="valid-feedback">
                          Password field is valid!
                        </div>
                        <div className="invalid-feedback">
                          Password field cannot be blank!
                        </div> */}
                    </div>

                    <div
                      className="col-md-12 mt-3"
                      style={{
                        marginTop: "2rem",
                        fontSize: "1.2rem",
                        padding: "10px",
                      }}
                    >
                      <label className="mb-3 mr-1" for="gender">
                        Gender:{" "}
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="gender"
                        id="male"
                        value="M"
                        autocomplete="off"
                        required
                        onChange={genderHandler}
                      />
                      <label
                        className="btn btn-sm btn-outline-secondary"
                        for="male"
                      >
                        Male
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="gender"
                        id="female"
                        value="F"
                        autocomplete="off"
                        required
                        onChange={genderHandler}
                      />
                      <label
                        className="btn btn-sm btn-outline-secondary"
                        for="female"
                      >
                        Female
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="gender"
                        id="secret"
                        value="N.S"
                        autocomplete="off"
                        required
                        onChange={genderHandler}
                      />
                      <label
                        className="btn btn-sm btn-outline-secondary"
                        for="secret"
                      >
                        Secret
                      </label>
                      {/*   <div className="valid-feedback mv-up">
                          You selected a gender!
                        </div>
                        <div className="invalid-feedback mv-up">
                          Please select a gender!
                        </div> */}
                    </div>
                    <div
                      className="col-md-12 date-container"
                      style={{ margin: "20px 0px 30px 0px" }}
                    >
                      <label
                        for="date"
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
                      {/* <div className="valid-feedback">Email field is valid!</div>
                        <div className="invalid-feedback">
                          Email field cannot be blank!
                        </div> */}
                    </div>
                    <div className="col-md-12" style={{ margin: "25px 0px" }}>
                      <select ref={districtRef}>
                        <option disabled hidden>
                          District
                        </option>
                        {districts.map((district) => (
                          <option value={district}>{district}</option>
                        ))}
                      </select>
                      {/* <div className="valid-feedback">
                          You selected a position!
                        </div>
                        <div className="invalid-feedback">
                          Please select a position!
                        </div> */}
                    </div>

                    <div className="ailments">
                      <textarea
                        className="form-ailments"
                        id="invalidCheck"
                        placeholder="Ailments/Reason of visit"
                        ref={ailmentRef}
                        required
                      />

                      {/* <div className="invalid-feedback">
                          Please confirm that the entered data are all correct!
                        </div> */}
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
                      {/* <div className="invalid-feedback">
                          Please confirm that the entered data are all correct!
                        </div> */}
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
