import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/layout/Navbar.jsx";
import CreatePoll from "./components/poll/CreatePoll.jsx";
import PollPage from "./components/poll/PollPage.jsx";
import AddNomination from "./components/nomination/AddNomination.jsx";
import Polls from "./components/poll/Polls.jsx";
import UserContext from "./context/UserContext";
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx";
import axios from "./api/axios";

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
      const res = await axios.get("/api/user/", config);
      setAuthUser({ ...res.data });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
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
