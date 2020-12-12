import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const CreatePoll = () => {
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        "http://ec2-13-126-19-220.ap-south-1.compute.amazonaws.com/api/polling/poll/add",
        {
          title,
        }
      );
      history.push(`/nominations/add/${data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const history = useHistory();

  return (
    <div className="container mt-4">
      <h2 className="is-size-2 has-text-centered">Create Poll</h2>
      <div className="container mt-6">
        <div className="field">
          <div className="control">
            <label htmlFor="title" className="label is-size-3">
              Title
            </label>
            <input
              className="input is-large"
              type="text"
              value={title}
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

export default CreatePoll;
