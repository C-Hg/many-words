import React from "react";

const Close = function(props) {
  return (
    <button onClick={props.redirect} className="closeButton">
      <i alt="Close" className="material-icons md-72 close">
        close
      </i>
    </button>
  );
};

export default Close;
