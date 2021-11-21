import React from "react";
import UserRecord from "./Records/UserRecord";
import "./UserPage.css";
/* import { Redirect } from "react-router"; */
import { useState } from "react";

export default function UserPage({ authorized }) {
  const [search, setSearch] = useState("");

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
  /*  if (!authorized) {
    return <Redirect to="/login" />;
  } */
  return (
    <div className="user-container">
      <div className="user-card">
        <img
          src="https://www.endeavorcareers.com/wp-content/uploads/2017/03/default-profile-pic.png"
          alt="profile"
        />
        <div className="card-details">
          <h2>Tanuj Vijayakumar</h2>
          <p>+91 6969696969</p>
          <p>
            Blood Group: <b>O+</b>
          </p>
          <p>
            Age: <b>19</b>
          </p>
          <p>
            Sex: <b>M</b>
          </p>
          <p>Vijaya@mailing.com</p>
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
            {PATIENT_DETAILS.filter((details) => {
              if (search === "") {
                return details;
              } else if (
                details.ailments.toLowerCase().includes(search.toLowerCase())
              ) {
                return details;
              }
            }).map((details) => (
              <UserRecord
                key={details.id}
                lastVisit={details.lastVisit}
                ailments={details.ailments}
              />
            ))}{" "}
          </table>
        </div>
      </div>
      )
    </div>
  );
}
