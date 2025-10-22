import React from "react";
import { Link } from "react-router-dom";

const Poll = (props) => {
  return (
    <div className="container box">
      <h3 className="is-size-3">{props.poll.title}</h3>
      <Link to={`/polls/${props.poll._id}`} className="button is-link">
        Vote Now
      </Link>
    </div>
  );
};

export default Poll;
