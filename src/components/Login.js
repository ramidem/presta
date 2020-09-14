import React from "react";
import InputGroup from "./partials/InputGroup";

const Login = (props) => {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12 col-md-8 col-lg-6 mx-auto bg-white shadow p-5">
          <h4 className="text-center">Login</h4>
          <hr />

          <form>
            <InputGroup name="username" type="text" displayName="Username" />
            <InputGroup
              name="password"
              type="password"
              displayName="Password"
            />

            <button className="btn btn-warning round-full border-0 mt-3">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
