import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";

const PrivateRoute = ({component: Component, ...rest}) => {
  let authContext = useContext(AuthContext);
  const {loading, isAuthenticated, token} = authContext;

  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
