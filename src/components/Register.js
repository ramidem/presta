import React from "react";
import InputGroup from "./partials/InputGroup";

const Register = (props) => {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12 col-md-8 col-lg-6 mx-auto bg-white shadow p-5">
          <h4 className="text-center">Register</h4>
          <hr />

          <form>
            <InputGroup name="username" type="text" displayName="Username" />
            <InputGroup name="fullname" type="text" displayName="Fullname" />
            <InputGroup name="email" type="email" displayName="Email" />
            <InputGroup
              name="password"
              type="password"
              displayName="Password"
            />
            <InputGroup
              name="confirmPassword"
              type="password"
              displayName="Confirm Password"
            />

            <button className="btn btn-warning round-full border-0 mt-3">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
