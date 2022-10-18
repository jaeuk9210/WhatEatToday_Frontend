import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Welcome from "./screens/Welcome";
import NotFound from "./screens/NotFound";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme } from "./style";
import { HelmetProvider } from "react-helmet-async";
import route from "./routes";
import Signup from "./screens/Signup";
import { ApolloProvider } from "@apollo/client";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Like from "./screens/Like";
import Notification from "./screens/Notification";
import Cart from "./screens/Cart";
import Search from "./screens/Search";
import Test from "./screens/Test";
import Choose from "./screens/Choose";
import { client } from "./apollo";

function App() {
  const isLoggedin = true;
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={lightTheme}>
          <GlobalStyles />
          <Router>
            <Switch>
              <Route path={route.home} exact>
                {isLoggedin ? <Home /> : <Welcome />}
              </Route>
              <Route path={route.signUp} component={Signup} />
              <Route path={route.login} component={Login} />
              <Route path={route.like} component={Like} />
              <Route path={route.notification} component={Notification} />
              <Route path={route.cart} component={Cart} />
              <Route path={route.search} component={Search} />
              <Route path={route.test} component={Test} />
              <Route path={route.choose} component={Choose} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
