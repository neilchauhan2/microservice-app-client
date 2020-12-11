import React from "react";

const Nomination = (props) => {
  const { nomination, vote } = props;
  return (
    <div className="container box">
      <h4 className="is-size-3 ">{nomination.title}</h4>
      {/* <h4 className="is-size-4">{nomination.count}</h4> */}
      <button className="button is-link" onClick={() => vote(nomination._id)}>
        Vote
      </button>
    </div>
  );
};

export default Nomination;
