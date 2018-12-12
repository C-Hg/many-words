import React from "react";

class Curriculum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <button onClick={this.props.startExercise}>Start</button>
      </div>
    );
  }
}

export default Curriculum;
