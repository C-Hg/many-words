import React from "react";

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.delayBarApparition = this.delayBarApparition.bind(this);
    this.state = {
      progressBar: ""
    };
  }

  delayBarApparition() {
    this.setState({
      progressBar: "progressBar"
    });
  }

  componentDidMount() {
    this.progressBarTimeout = setTimeout(() => this.delayBarApparition(), 450);
  }

  componentWillUnmount() {
    clearTimeout(this.progressBarTimeout);
  }

  render() {
    let progress = this.props.progress; //from 0 to 1 or falsy
    let strokeDashoffset = 300;

    if (progress && this.state.progressBar) {
      strokeDashoffset = 300 - 300 * progress;
    }

    return (
      <div className="barsContainer">
        <svg
          width="350"
          height="40"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          strokeDashoffset={strokeDashoffset}
        >
          <line
            x1="15"
            x2="315"
            y1="15"
            y2="15"
            className="progressBar emptyBar"
          />
          <line
            x1="15"
            x2="315"
            y1="15"
            y2="15"
            className="progressBar filledBar"
          />
        </svg>
      </div>
    );
  }
}

export default ProgressBar;
