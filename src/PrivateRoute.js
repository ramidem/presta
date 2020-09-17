import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AppContext } from "./AppProvider";
import Error403 from "./Error403";

const PrivateRoute = (props) => {
  const [authUser] = useContext(AppContext);

  return <Route>{authUser.isAuth ? props.children : <Error403 />}</Route>;
};

export default PrivateRoute;
