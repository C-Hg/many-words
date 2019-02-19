import React from "react";

function SVGCircle(props) {
  let length = props.length;
  return (
    <div>
      <svg
        height={length}
        width={length}
        strokeDashoffset={props.strokeDashoffset}
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          className={`greyCircle ${props.sizeClass}`}
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          transform="rotate(-90 50 50)"
          className={`${props.style} ${props.sizeClass}`}
        />
      </svg>
    </div>
  );
}

export default SVGCircle;
