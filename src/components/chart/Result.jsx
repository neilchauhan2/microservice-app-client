import React from "react";
import { Line } from "react-chartjs-2";

const Result = (props) => {
  const { glabel, gdata } = props;
  const data = {
    labels: glabel,
    datasets: [
      {
        label: "# of Votes",
        data: gdata,
        fill: false,
        backgroundColor: "rgb(46, 134, 193)",
        borderColor: "rgba(93, 173, 226 )",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className="container">
      <Line data={data} options={options} />
    </div>
  );
};

export default Result;
