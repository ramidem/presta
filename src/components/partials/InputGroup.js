import React from "react";
import "./InputGroup.css";

const InputGroup = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.displayName}</label>
      <input
        type={props.type}
        name={props.name}
        id={props.name}
        min={props.min}
        placeholder={props.placeholder}
        onChange={props.handleChange}
        value={props.value}
      />
    </div>
  );
};

export default InputGroup;
