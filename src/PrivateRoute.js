import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AppContext } from "./AppProvider";
import Error403 from "./Error403";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [authUser] = useContext(AppContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        authUser.isAuth ? <Component {...rest} {...props} /> : <Error403 />
      }
    />
  );
};

export default PrivateRoute;
