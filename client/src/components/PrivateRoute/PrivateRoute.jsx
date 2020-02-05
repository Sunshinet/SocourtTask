import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.isAuthenticated || localStorage.getItem("userdata") !== null ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated
  };
};

export default connect(mapStateToProps)(PrivateRoute);
