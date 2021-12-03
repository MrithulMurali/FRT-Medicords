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
      setIsLoading(true);
      await axios
        .get(`http://localhost:4000/api/user/${key}`)
        .then((response) => {
          if (response) {
            const userData = response.data;
            setPatientData(userData);
            if (userData) setIsLoading(false);
          } else {
            history.push("/Not-Found");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchUserDetails();
  }, [key]);

  useEffect(() => {
    if (!route()) {
      history.push("/login");
    }
  }, [history]);
  return !isLoading ? (
    <div className="user-container">
      <div className="user-card">
        {patientData.gender.toLowerCase() === "m" ? (
          <img
            src="https://www.endeavorcareers.com/wp-content/uploads/2017/03/default-profile-pic.png"
            alt="profile"
          />
        ) : (
          <img
            src="https://www.ticketkhidakee.com/admin-dashboard/public/uploads/cast/1598414147Female%20Cliparts.jpg"
            alt="profile"
          />
        )}
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
        </div>
      </div>
      <div>
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="Search your ailment"
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
            <tbody>
              <tr>
                <th>Previous Visit</th>
                <th>Ailments</th>
              </tr>
              {patientData.recordData
                .filter((details) => {
                  if (search === "") {
                    return details;
                  } else if (
                    details.ailment.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return details;
                  }
                })
                .map((details) => (
                  <UserRecord
                    key={details._id}
                    lastVisit={details.lastVisit}
                    ailments={details.ailment}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <p style={{ textAlign: "center", fontSize: "1.2rem" }}>Loading data...</p>
  );
}
