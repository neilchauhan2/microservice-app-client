import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Result from "../chart/Result";
import Nomination from "../nomination/Nomination";
import Pusher from "pusher-js";

const PollPage = () => {
  const [poll, setPoll] = useState({});
  const [nominations, setNominations] = useState([]);
  const { id } = useParams();
  const [graphData, setGraphData] = useState({
    label: [],
    datapoints: [],
  });

  const populateData = (data) => {
    console.log(data);
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

  // Pusher.logToConsole = true;

  useEffect(() => {
    var pusher = new Pusher("1eb7f0ffa38cc3d46a7c", {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("poll");
    channel.bind("vote", (data) => {
      const { _id, count } = data._doc;

      // let noms = [...nominations];
      let nd = nominations.map((nom) => {
        if (nom._id === _id) {
          nom = { ...nom, count };
        }
        return nom;
      });
      console.log(nd);
      setNominations(nd);
      populateData(nd);
    });
  }, [nominations]);

  // const updateGraph = (data) => {
  //   const { _id, count } = data._doc;
  //   console.log(data);
  //   let nd = nominations.map((nom) => {
  //     if (nom._id === _id) {
  //       nom = { ...nom, count };
  //     }
  //     return nom;
  //   });
  //   console.log(nd);
  //   // setNominations(noms);
  //   // populateData(noms);
  // };

  useEffect(() => {
    axios
      .get(`http://localhost/api/polling/poll/${id}`)
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
      .get(`http://localhost/api/polling/nomination/${id}`)
      .then((res) => res.data)
      .then((data) => {
        setNominations(data);
        console.log(data);
        populateData(data);
      })
      .catch((e) => {
        console.log(e);
      });
    // eslint-disable-next-line
  }, []);

  const vote = (id) => {
    axios
      .post(`http://localhost/api/polling/nomination/upvote/${id}`)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
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
