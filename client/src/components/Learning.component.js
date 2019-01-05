import React from "react";

import selectWordsToLearnForms from "../controllers/select_words_to_learn/selectWordsToLearnForms.controller";
import BackArrow from "./common_components/BackArrow.component";
import Switches from "./learning_components/Switches.component";
import LessonTitle from "./common_components/LessonTitle.component";

import "./styles/Learning.css";

class Learning extends React.Component {
  constructor(props) {
    super(props);
    this.toggleNumber = this.toggleNumber.bind(this);
    this.toggleGender = this.toggleGender.bind(this);
    this.toggleDefinite = this.toggleDefinite.bind(this);
    this.updateWords = this.updateWords.bind(this);
    this.state = {
      number: this.props.switches[0],
      gender: this.props.switches[1],
      definite: this.props.switches[2],
      formattedWords: this.props.formattedWords
    };
  }

  toggleNumber() {
    this.setState({
      number: this.state.number === "singular" ? "plural" : "singular"
    });
    this.updateWords();
  }

  toggleGender() {
    this.setState({
      gender: this.state.gender === "masculine" ? "feminine" : "masculine"
    });
    this.updateWords();
  }

  toggleDefinite() {
    this.setState({
      definite: this.state.definite === "definite" ? "indefinite" : "definite"
    });
    this.updateWords();
  }

  updateWords() {
    this.setState(state => ({
      formattedWords: selectWordsToLearnForms(
        state.number,
        state.gender,
        state.definite,
        this.props.wordsToLearn
      )
    }));
  }

  render() {
    const wordsToLearn = this.state.formattedWords.map((val, i) => {
      return (
        <div key={`twoWords${i}`} className="twoWords">
          {val.en} : {val.fr}
          <br />
        </div>
      );
    });
    return (
      <div className="container">
        <BackArrow />
        <LessonTitle lesson={this.props.lesson} />
        <Switches
          number={this.state.number}
          toggleNumber={this.toggleNumber}
          gender={this.state.gender}
          toggleGender={this.toggleGender}
          definite={this.state.definite}
          toggleDefinite={this.toggleDefinite}
        />
        <div className="wordsToLearn">{wordsToLearn}</div>
      </div>
    );
  }
}

export default Learning;
