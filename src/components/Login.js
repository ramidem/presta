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

            <button className="navbar__btn btn btn-primary round-full border-0 btn-lg my-3">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
