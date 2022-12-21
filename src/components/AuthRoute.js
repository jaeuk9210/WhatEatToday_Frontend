import React from "react";
import { Route, Redirect } from "react-router-dom";
import route from "../routes";

function AuthRoute({
  authenticated,
  component: Component,
  render,
  children,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          render ? (
            render(props)
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect
            to={{ pathname: route.home, state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default AuthRoute;
