import React from "react";

export default function RecordHelper(props) {
  return (
    <React.Fragment>
      <td>{props.data.lastVisit}</td>
      <td>{props.data.ailment}</td>
    </React.Fragment>
  );
}
