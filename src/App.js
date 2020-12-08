import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import CreatePoll from "./components/poll/CreatePoll";
import PollPage from "./components/poll/PollPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/polls/add">
            <CreatePoll />
          </Route>
          <Route exact path="/polls/:id">
            <PollPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
