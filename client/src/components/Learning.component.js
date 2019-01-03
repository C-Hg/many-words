import React from "react";

class Learning extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.wordsToLearn[0].en[0].acceptedForms}
        <br />
        {this.props.wordsToLearn[0].fr[0].acceptedForms}
      </div>
    );
  }
}

export default Learning;
