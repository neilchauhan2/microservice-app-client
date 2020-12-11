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
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/polling/nomination/${pollid}`)
      .then((res) => res.data)
      .then((data) => {
        setNominations([...data]);
      })
      .catch((e) => {
        console.log(e);
      });

    setNomination({
      ...nomination,
      pollId: pollid,
    });
    // eslint-disable-next-line
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
        "http://localhost:8080/api/polling/nomination/add",
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
            nominations.map((element) => (
              <li key={element._id}>{element.title}</li>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AddNomination;
