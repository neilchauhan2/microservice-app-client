import axios from "axios";
import React, { useState, useEffect } from "react";
import Poll from "./Poll";

const Polls = () => {
  const [polls, setPolls] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/polling/poll")
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setPolls(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="container">
      <h2 className="is-size-2 has-text-centered mt-4">Polls</h2>
      <div className="container mt-4">
        {polls && polls.map((poll) => <Poll key={poll._id} poll={poll} />)}
      </div>
    </div>
  );
};

export default Polls;
