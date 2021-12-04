import React, { useEffect } from "react";
import AdminRecords from "./Records/AdminRecords";
import "./Admin.css";
import { useState } from "react";
import { Redirect } from "react-router";
import RegisterPatient from "./RegisterPatient/RegisterPatient";
import axios from "axios";

export default function Admin({ authorized }) {
  const [recordsActive, setRecordsActive] = useState(true);
  const [recordFormActive, setRecordFormActive] = useState(false);
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getPatientData = async () => {
      if (recordsActive) {
        try {
          const response = await axios.get(
            `https://${process.env.REACT_APP_BASE_URL}/patient-data` //Sent via docker arg
          );
          const patientData = response.data;
          setRecords(patientData);
        } catch (error) {
          alert(error);
        }
      }
    };
    getPatientData();
  }, [recordsActive]);

  const searchRecordsHandler = () => {
    setRecordsActive(true);
    setRecordFormActive(false);
  };
  const addRecordsHandler = () => {
    setRecordsActive(false);
    setRecordFormActive(true);
  };
  if (!authorized) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="admin-container">
      <div className="admin-card">
        <img
          src="https://mk0ehealtheletsj3t14.kinstacdn.com/wp-content/uploads/2009/07/best-hospital-in-south-india.jpg"
          alt="profile"
        />
        <div className="card-details">
          <h2>Lorem Ipsum Hospitals</h2>
          <p>+91 9231235324</p>
          <p>loremipsum@mailing.com</p>
        </div>
      </div>
      <div className="record-choices">
        <button
          onClick={searchRecordsHandler}
          style={{
            pointerEvents: `${recordsActive ? "none" : "all"}`,
          }}
        >
          Search Records
        </button>
        <button
          onClick={addRecordsHandler}
          style={{
            pointerEvents: `${recordFormActive ? "none" : "all"}`,
          }}
        >
          Add Records
        </button>
      </div>
      {recordsActive ? (
        <div>
          <div className="search">
            <input
              type="text"
              className="searchTerm"
              placeholder="Enter the mobile number"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button
              type="submit"
              className="searchButton"
              style={{ pointerEvents: "none" }}
            >
              <i className="fa fa-search"></i>
            </button>
          </div>

          <div className="record-container">
            <h2>Patient Records</h2>
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Blood Group</th>
                  <th>Age</th>
                  <th>Sex</th>
                  <th>Last Visit</th>
                  <th>Ailment</th>
                  {/* <th></th> */}
                </tr>
                {records
                  .filter((details) => {
                    if (search === "") {
                      return details;
                    } else if (
                      details.key.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return details;
                    }
                  })
                  .map((details) => (
                    <AdminRecords
                      mobile={details.key}
                      key={details._id}
                      name={details.name}
                      bgroup={details.bloodgrp}
                      age={details.age}
                      sex={details.gender}
                      recordData={details.recordData}
                      recordDataKey={details.recordData._id}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <RegisterPatient />
      )}
    </div>
  );
}
