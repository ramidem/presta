import React from "react";
import "./AlertMessage.css";

const AlertMessage = (props) => {
  return <div className={"alert alert-" + props.color}>{props.message}</div>;
};

export default AlertMessage;
