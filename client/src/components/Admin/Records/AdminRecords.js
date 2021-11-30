import React from "react";
import "./AdminRecords.css";

export default function AdminRecords(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.bgroup}</td>
      <td>{props.age}</td>
      <td>{props.sex}</td>
      {props.recordData.map((data) => (
        <React.Fragment>
          <td>{data.lastVisit}</td>
          <td>{data.ailment}</td>
        </React.Fragment>
      ))}
    </tr>
  );
}
