import React from "react";

const SubmitOrNextButton = function(props) {
  return (
    <div>
      <button
        onClick={props.checking ? props.nextWord : props.submitUserTranslation}
      >
        {props.checking ? "Next" : "Check"}
      </button>
    </div>
  );
};

export default SubmitOrNextButton;
