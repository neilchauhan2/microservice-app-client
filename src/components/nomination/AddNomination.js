import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const AddNomination = () => {
  const [nomination, setNomination] = useState({
    title: "",
    pollId: "",
  });

  const [nominations, setNominations] = useState([]);

  const { pollid } = useParams();
  useEffect(async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/polling/nomination/${pollid}`
      );

      setNominations([...data]);

      setNomination({
        ...nomination,
        pollId: pollid,
      });
    } catch (error) {
      console.log(error);
    }
  }, [pollid]);

  const handleChange = (e) => {
    setNomination({
      ...nomination,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/polling/nomination/add",
        {
          ...nomination,
        }
      );
      setNominations([...nominations, { ...data }]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2 className="is-size-2 has-text-centered">Add Nominations</h2>
      <div className="container mt-6">
        <div className="field">
          <div className="control">
            <label htmlFor="title" className="label is-size-3">
              Title
            </label>
            <input
              className="input is-large"
              type="text"
              value={nomination.title}
              name="title"
              onChange={handleChange}
              placeholder="Enter Title for your poll."
            />
          </div>
        </div>
        <button onClick={handleSubmit} className="button is-link is-medium">
          Add Nomination
        </button>
      </div>
      <div className="container">
        <div className="ul">
          {nominations &&
            nominations.map((element) => {
              <li>{element.title}</li>;
            })}
        </div>
      </div>
    </div>
  );
};

export default AddNomination;
