import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const AddNomination = () => {
  const [nomination, setNomination] = useState({
    title: "",
    pollId: "",
  });

  const { pollid } = useParams();
  useEffect(() => {
    setNomination({
      ...nomination,
      pollId: pollid,
    });
  }, [pollid]);
  const handleChange = (e) => {
    setNomination({
      ...nomination,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(nomination);
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
          Create Poll
        </button>
      </div>
    </div>
  );
};

export default AddNomination;
