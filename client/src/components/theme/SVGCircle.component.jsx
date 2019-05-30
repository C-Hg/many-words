import React from "react";

function SVGCircle(props) {
  return (
    <div>
      <svg height="100" width="100" strokeDashoffset={props.strokeDashoffset}>
        <circle cx="50" cy="50" r="40" className={`greyCircle`} />
        <circle
          cx="50"
          cy="50"
          r="40"
          transform="rotate(-90 50 50)"
          className={`${props.style}`}
        />
      </svg>
    </div>
  );
}

export default SVGCircle;
