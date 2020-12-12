import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import CreatePoll from "./components/poll/CreatePoll";
import PollPage from "./components/poll/PollPage";
import AddNomination from "./components/nomination/AddNomination";
import Polls from "./components/poll/Polls";
import UserContext from "./context/UserContext";
import useAuth from "./hooks/useAuth";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import axios from "axios";

function App() {
  const [authUser, setAuthUser] = useState(null);

  const tokenConfig = () => {
    const token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;
    // Headers
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    // if token available add it to headers
    if (token) {
      config.headers["x-auth-token"] = token;
    }

    return config;
  };

  // get user method
  const loadUser = async () => {
    try {
      const config = tokenConfig();
      const res = await axios.get(
        "http://ec2-13-126-19-220.ap-south-1.compute.amazonaws.com/api/user/",
        config
      );
      setAuthUser({ ...res.data });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ authUser, setAuthUser }}>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/polls/add">
              <CreatePoll />
            </Route>
            <Route exact path="/polls/:id">
              <PollPage />
            </Route>
            <Route exact path="/">
              <Polls />
            </Route>
            <Route exact path="/nominations/add/:pollid">
              <AddNomination />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup authUser={authUser} setAuthUser={setAuthUser} />
            </Route>
          </Switch>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
