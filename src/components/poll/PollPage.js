import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nomination from "../nomination/Nomination";

const PollPage = () => {
  const [poll, setPoll] = useState({});
  const [nominations, setNominations] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/polling/poll/${id}`)
      .then((res) => res.data)
      .then((data) => {
        setPoll({
          ...poll,
          ...data,
        });
      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .get(`http://localhost:8000/api/polling/nomination/${id}`)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setNominations(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className="container">
      {poll && <h2 className="is-size-2">{poll.title}</h2>}
      <div className="container">
        {nominations &&
          nominations.map((nomination) => (
            <Nomination nomination={nomination} key={nomination._id} />
          ))}
      </div>
    </div>
  );
};

export default PollPage;
