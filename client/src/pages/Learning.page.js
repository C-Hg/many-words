import React from "react";
import { Link } from "react-router-dom";
import BackArrow from "../components/common/BackArrow.component";
import Switches from "../components/learning/Switches.component";
import LearningTitle from "../components/learning/LearningTitle.component";
import { connect } from "react-redux";
import { actions as learnActions } from "../redux/reducers/learn";

import "../styles/Learning.scss";
import Navbar from "../components/navbar/Navbar.component";

function mapStateToProps(state) {
  return { learn: state.learn };
}

const mapDispatchToProps = dispatch => {
  return {
    getWordsToLearn: lesson => {
      dispatch(learnActions.getWordsToLearn(lesson));
    }
  };
};

class Learning extends React.Component {
  async componentDidMount() {
    this.props.getWordsToLearn(this.props.match.params.lessonId);
  }

  render() {
    const lesson = this.props.match.params.lessonId;
    const theme = this.props.match.params.themeId;
    const learn = this.props.learn;

    let wordsToLearn;
    //cannot do it if data is not fetched from the database
    if (learn.formattedWords) {
      wordsToLearn = learn.formattedWords.map((val, i) => {
        return (
          <div key={`twoWords${i}`} className="twoWords">
            {val.en} : {val.fr}
          </div>
        );
      });
    }
    return (
      <div className="app app-with-navbar-full-screen">
        <Navbar />
        <div className="main-container whiteBackground">
          <div className="learning-container">
            <Link to={`/${theme}`} className="arrowLink">
              <BackArrow />
            </Link>
            <LearningTitle lesson={lesson} theme={theme} />
            <div className="wordsToLearn">{wordsToLearn}</div>
            <Switches />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Learning);
