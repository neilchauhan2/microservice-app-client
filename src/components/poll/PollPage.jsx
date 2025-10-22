import axios from "../../api/axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Result from "../chart/Result.jsx";
import Nomination from "../nomination/Nomination.jsx";

const PollPage = () => {
  const [poll, setPoll] = useState({});
  const [nominations, setNominations] = useState([]);
  const { id } = useParams();
  const [graphData, setGraphData] = useState({
    label: [],
    datapoints: [],
  });

  const populateData = (data) => {
    let lab = [];
    let pts = [];

    data.forEach((el) => {
      lab.push(el.title);
      pts.push(el.count);
    });

    setGraphData({
      ...graphData,
      label: lab,
      datapoints: pts,
    });
  };

  useEffect(() => {
    axios
      .get(`/api/polling/poll/${id}`)
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
      .get(`/api/polling/nomination/${id}`)
      .then((res) => res.data)
      .then((data) => {
        setNominations(data);
        populateData(data);
      })
      .catch((e) => {
        console.log(e);
      });
    // eslint-disable-next-line
  }, []);

  const vote = (id) => {
    axios
      .post(`/api/polling/nomination/upvote/${id}`)
      .then((res) => res.data)
      .then((data) => {
        const { _id, count } = data;

        let nd = nominations.map((nom) => {
          if (nom._id === _id) {
            nom = { ...nom, count };
          }
          return nom;
        });
        setNominations(nd);
        populateData(nd);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="container is-fluid">
      {poll && (
        <h2 className="is-size-2 has-text-centered mb-6">{poll.title}</h2>
      )}
      <div className="columns ml-4 mr-4">
        <div className="column">
          <div className="container">
            {nominations &&
              nominations.map((nomination) => (
                <Nomination
                  nomination={nomination}
                  key={nomination._id}
                  vote={vote}
                />
              ))}
          </div>
        </div>
        <div className="column is-7">
          <Result glabel={graphData.label} gdata={graphData.datapoints} />
        </div>
      </div>
    </div>
  );
};

export default PollPage;
