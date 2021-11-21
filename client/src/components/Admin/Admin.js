import React, { useEffect } from "react";
import AdminRecords from "./Records/AdminRecords";
import "./Admin.css";
import { useState } from "react";
import { Redirect } from "react-router";
import RegisterPatient from "./RegisterPatient/RegisterPatient";

export default function Admin({ authorized }) {
  useEffect(() => {
    fetch("http://localhost:8080/admin/api/getAllPatients", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  const PATIENT_DETAILS = [
    {
      id: "r1",
      name: "Tanuj",
      bgroup: "O+",
      age: 19,
      sex: "M",
      lastVisit: new Date(2021, 3 - 1, 26).toISOString().slice(0, 10),
      ailments:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis minima dignissimos, aperiam ex perferendis cum minus necessitatibus a id debitis sequi assumenda incidunt laboriosam soluta pariatur voluptas facere magni itaque!Quas consequatur ipsum dicta qui! Quia a at distinctio. Harum est ab repellendus autem tempora! Quasi qui aliquam alias voluptatibus nihil cupiditate dolore praesentium, nesciunt temporibus facere maiores, sint iste?",
    },
    {
      id: "r2",
      name: "Dileep",
      bgroup: "O+",
      age: 20,
      sex: "M",
      lastVisit: new Date(2021, 3 - 1, 21).toISOString().slice(0, 10),
      ailments:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis minima dignissimos, aperiam ex perferendis cum minus necessitatibus a id debitis sequi assumenda incidunt laboriosam soluta pariatur voluptas facere magni itaque!Quas consequatur ipsum dicta qui! Quia a at distinctio. Harum est ab repellendus autem tempora! Quasi qui aliquam alias voluptatibus nihil cupiditate dolore praesentium, nesciunt temporibus facere maiores, sint iste?",
    },
    {
      id: "r3",
      name: "Dileepa",
      bgroup: "O+",
      age: 20,
      sex: "F",
      lastVisit: new Date(2020, 2 - 1, 11).toISOString().slice(0, 10),
      ailments:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis minima dignissimos, aperiam ex perferendis cum minus necessitatibus a id debitis sequi assumenda incidunt laboriosam soluta pariatur voluptas facere magni itaque!Quas consequatur ipsum dicta qui! Quia a at distinctio. Harum est ab repellendus autem tempora! Quasi qui aliquam alias voluptatibus nihil cupiditate dolore praesentium, nesciunt temporibus facere maiores, sint iste?",
    },
  ];

  const [recordsActive, setRecordsActive] = useState(true);
  const [recordFormActive, setRecordFormActive] = useState(false);
  const [updatedRecords, setUpdatedRecords] = useState(PATIENT_DETAILS);
  const [search, setSearch] = useState("");
  const searchRecordsHandler = () => {
    setRecordsActive(true);
    setRecordFormActive(false);
  };
  const addRecordsHandler = () => {
    setRecordsActive(false);
    setRecordFormActive(true);
  };

  const updatedRecordsHandler = (newRecord) => {
    setUpdatedRecords((prevRecord) => {
      return [newRecord, ...prevRecord];
    });
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
          <h2>Lorem Ipsum</h2>
          <p>+91 9231235324</p>
          <p>loremimpum@mailing.com</p>
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
              placeholder="Who are you looking for?"
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
              <tr>
                <th>Name</th>
                <th>Blood Group</th>
                <th>Age</th>
                <th>Sex</th>
                <th>Last Visit</th>
                <th>Ailments</th>
                <th></th>
              </tr>
              {updatedRecords
                .filter((details) => {
                  if (search === "") {
                    return details;
                  } else if (
                    details.name.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return details;
                  }
                })
                .map((details) => (
                  <AdminRecords
                    key={details.id}
                    name={details.name}
                    bgroup={details.bgroup}
                    age={details.age}
                    sex={details.sex}
                    lastVisit={details.lastVisit}
                    ailments={details.ailments}
                  />
                ))}{" "}
            </table>
          </div>
        </div>
      ) : (
        <RegisterPatient updateRecords={updatedRecordsHandler} />
      )}
    </div>
  );
}
