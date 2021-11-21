import React from "react";
import { useState } from "react";
import Header from "./components/Header/Header";
import Admin from "./components/Admin/Admin";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import Login from "./components/Login/Login";

import Signup from "./components/Signup/Signup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";
import UserPage from "./components/UserPage/UserPage";

function App() {
  const [auth, setAuth] = useState(false);
  const adminAuthHandler = (admin) => {
    if (admin) {
      setAuth(true);
    }
  };
  /*  const userAuthHandler = (user) => {
    if (user) {
      setUserAuth(true);
    }
  }; */
  return (
    <Router>
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/" exact component={HomeScreen}></Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login setAuth={adminAuthHandler} />
          </Route>
          <Route exact path="/admin">
            <Admin authorized={auth} />
          </Route>
          <Route exact path="/user">
            <UserPage />
          </Route>
          <NotFound />
        </Switch>
      </React.Fragment>
    </Router>
  );
}
export default App;
