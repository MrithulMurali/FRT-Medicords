import React, { Suspense } from "react";
import { useState } from "react";
import Header from "./components/Header/Header";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

//Lazy-loading

const Login = React.lazy(() => import("./components/Login/Login"));
const Signup = React.lazy(() => import("./components/Signup/Signup"));
const Admin = React.lazy(() => import("./components/Admin/Admin"));
const UserPage = React.lazy(() => import("./components/UserPage/UserPage"));
const NotFound = React.lazy(() => import("./components/NotFound/NotFound"));

function App() {
  const [auth, setAuth] = useState(false);
  const [userKey, setUserkey] = useState(null);
  const adminAuthHandler = (admin) => {
    if (admin) {
      setAuth(true);
    }
  };
  return (
    <Router>
      <React.Fragment>
        <Header />
        <Suspense
          fallback={
            <div>
              <LoadingScreen />
            </div>
          }
        >
          <Switch>
            <Route path="/" exact component={HomeScreen}></Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/login">
              <Login
                setAuth={adminAuthHandler}
                userKey={(key) => {
                  setUserkey(key);
                }}
              />
            </Route>
            <Route exact path="/admin">
              <Admin authorized={auth} />
            </Route>
            <Route path="/user" userKey={userKey}>
              <UserPage />
            </Route>
            <NotFound />
          </Switch>
        </Suspense>
      </React.Fragment>
    </Router>
  );
}
export default App;
