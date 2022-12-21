import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Welcome from "./screens/Welcome";
import NotFound from "./screens/NotFound";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme } from "./style";
import { HelmetProvider } from "react-helmet-async";
import route from "./routes";
import Signup from "./screens/Signup";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Like from "./screens/Like";
import Notification from "./screens/Notification";
import SubCategory from "./screens/Choose/SubCategory";
import Search from "./screens/Search";
import Test from "./screens/Test";
import Choose from "./screens/Choose/Choose";
import { client, isLoggedInVar } from "./apollo";
import Layout from "./components/layout";
import Setting from "./screens/Setting";
import AuthRoute from "./components/AuthRoute";
import Logout from "./screens/Logout";
import Place from "./screens/Place";
import Story from "./screens/Story";
import Result from "./screens/Choose/Result";

function App() {
  const isLoggedin = useReactiveVar(isLoggedInVar);

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={lightTheme}>
          <GlobalStyles />
          <Router>
            <Switch>
              <Route path={route.home} exact>
                {isLoggedin ? (
                  <Layout path="home">
                    <Home />
                  </Layout>
                ) : (
                  <Layout path="welcome">
                    <Welcome />
                  </Layout>
                )}
              </Route>

              <Route path={route.signUp}>
                <Signup />
              </Route>

              <Route
                path={route.login}
                component={(props) => (
                  <Layout title="로그인">
                    <Login />
                  </Layout>
                )}
              />

              <AuthRoute
                authenticated={isLoggedin}
                path={route.like}
                component={Like}
              />

              <AuthRoute
                authenticated={isLoggedin}
                path={route.notification}
                component={Notification}
              />

              <AuthRoute
                authenticated={isLoggedin}
                path={route.choose}
                component={Choose}
                exact
              />
              <AuthRoute
                authenticated={isLoggedin}
                path={route.choose + "/subcategory"}
                component={(props) => (
                  <Layout {...props}>
                    <SubCategory />
                  </Layout>
                )}
              />
              <AuthRoute
                authenticated={isLoggedin}
                path={route.choose + "/result"}
                component={(props) => (
                  <Layout {...props}>
                    <Result />
                  </Layout>
                )}
              />

              <Route path={route.search} component={Search} />

              <AuthRoute
                authenticated={isLoggedin}
                path={route.setting}
                component={(props) => (
                  <Layout {...props} title="설정">
                    <Setting />
                  </Layout>
                )}
              />

              <AuthRoute
                authenticated={isLoggedin}
                path={route.logout}
                component={Logout}
              />

              <Route path={route.place + "/:id"} component={Place} exact />
              <Route
                path={route.place + "/:placeid" + route.story}
                component={Story}
              />

              <Route path={route.story + "/:id"} component={Test} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
