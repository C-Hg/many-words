import React from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { exercise: state.exercise };
}

function WordsToRemember(props) {
  const words = props.exercise.failedWords.map(val => {
    return (
      <div key={`${val[0]}`}>
        {val[0]} : {val[1]}
      </div>
    );
  });
  return <div className="missedWords">{words}</div>;
}

export default connect(
  mapStateToProps,
  null
)(WordsToRemember);
