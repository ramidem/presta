import React from "react";

const AlertMessage = (props) => {
  return (
    <div className={"border-0 rounded-0 alert alert-" + props.color}>
      {props.message}
    </div>
  );
};

export default AlertMessage;
