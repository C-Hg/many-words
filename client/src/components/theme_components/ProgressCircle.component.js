import React from "react";
import SVGCircle from "./SVGCircle.component";

class ProgressCircle extends React.Component {
  constructor(props) {
    super(props);
    this.delayCircleApparition = this.delayCircleApparition.bind(this);
    this.state = {
      progressCircle: ""
    };
  }

  delayCircleApparition() {
    this.setState({
      progressCircle: "progressCircle"
    });
  }

  componentDidMount() {
    this.progressCircleTimeout = setTimeout(
      () => this.delayCircleApparition(),
      450
    );
  }

  componentWillUnmount() {
    clearTimeout(this.progressCircleTimeout);
  }

  render() {
    let progress = this.props.progress; //from 0 to 1 or falsy
    let strokeColor = "greyCircle";
    let strokeDashoffset = 251.5;

    if (progress && this.state.progressCircle) {
      strokeColor = `${this.props.progressColor}Stroke`;
      strokeDashoffset = 251.5 - 251.5 * progress;
    }

    return (
      <div className="circleContainer">
        <SVGCircle
          strokeDashoffset={`${strokeDashoffset}px`}
          style={`${this.state.progressCircle} ${strokeColor}`}
          sizeClass={this.props.sizeClass}
          length={this.props.length}
        />
      </div>
    );
  }
}

export default ProgressCircle;
