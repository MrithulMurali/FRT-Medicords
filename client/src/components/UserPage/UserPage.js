import React, { useEffect } from "react";
import UserRecord from "./Records/UserRecord";
import "./UserPage.css";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";

export default function UserPage(props) {
  const location = useLocation();
  const path = location.pathname;
  const key = path.slice(6);
  const [search, setSearch] = useState("");
  const [patientData, setPatientData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const route = () => {
    const token = localStorage.getItem("x-access-token");
    return token ? true : false;
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log(key);
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:4000/api/user/${key}`
        );
        const userData = response.data;
        setPatientData(userData);
        if (userData) setIsLoading(false);
      } catch (error) {
        alert(error);
      }
    };
    fetchUserDetails();
  }, [key]);

  useEffect(() => {
    if (!route()) {
      history.push("/login");
    }
  }, [history]);

  const PATIENT_DETAILS = [
    {
      id: "r1",
      lastVisit: new Date(2021, 3 - 1, 26).toISOString().slice(0, 10),
      ailments:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis minima dignissimos, aperiam ex perferendis cum minus necessitatibus a id debitis sequi assumenda incidunt laboriosam soluta pariatur voluptas facere magni itaque!Quas consequatur ipsum dicta qui! Quia a at distinctio. Harum est ab repellendus autem tempora! Quasi qui aliquam alias voluptatibus nihil cupiditate dolore praesentium, nesciunt temporibus facere maiores, sint iste?",
    },
    {
      id: "r2",
      lastVisit: new Date(2021, 3 - 1, 20).toISOString().slice(0, 10),
      ailments: "Aids",
    },
  ];
  return !isLoading ? (
    <div className="user-container">
      <div className="user-card">
        <img
          src="https://www.endeavorcareers.com/wp-content/uploads/2017/03/default-profile-pic.png"
          alt="profile"
        />
        <div className="card-details">
          <h2>{patientData.name}</h2>
          <p>+91 {patientData.key}</p>
          <p>
            Blood Group: <b>{patientData.bloodgrp}</b>
          </p>
          <p>
            Age: <b>{patientData.age}</b>
          </p>
          <p>
            Sex: <b>{patientData.gender}</b>
          </p>
          {/* <p>Vijaya@mailing.com</p> */}
        </div>
      </div>
      <div>
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="Search your record"
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
          <h2>Your Records</h2>
          <table>
            <tr>
              <th>Previous Visit</th>
              <th>Ailments</th>
            </tr>
            {/* {PATIENT_DETAILS.filter((details) => {
              if (search === "") {
                return details;
              } else if (
                details.ailments.toLowerCase().includes(search.toLowerCase())
              ) {
                return details;
              }
            }).map((details) => ( */}
            <UserRecord
              key={patientData._id}
              lastVisit={patientData.lastVisit}
              ailments={patientData.ailment}
            />
            {/*  ))}{" "} */}
          </table>
        </div>
      </div>
      )
    </div>
  ) : (
    <p style={{ textAlign: "center", fontSize: "1.2rem" }}>Loading data...</p>
  );
}
