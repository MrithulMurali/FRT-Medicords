import React from "react";
import "./AdminRecords.css";

export default function AdminRecords(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.bgroup}</td>
      <td>{props.age}</td>
      <td>{props.sex}</td>
      <td>{props.lastVisit}</td>
      <td>{props.ailments}</td>
      <td>
        <button className="record-edit">
          <i className="fas fa-edit"></i>
        </button>
      </td>
    </tr>
  );
}
