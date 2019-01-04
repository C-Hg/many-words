import React from "react";
import SingPlurSwitch from "./learning_components/SingPlurSwitch.component";
import MascFemSwitch from "./learning_components/MascFemSwitch.component";
import DefIndefSwitch from "./learning_components/DefIndefSwitch.component";
import selectWordsToLearnForms from "../controllers/select_words_to_learn/selectWordsToLearnForms.controller";

import "./styles/Learning.css";

class Learning extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSingPlur = this.toggleSingPlur.bind(this);
    this.toggleMascFem = this.toggleMascFem.bind(this);
    this.toggleDefIndef = this.toggleDefIndef.bind(this);
    this.updateWords = this.updateWords.bind(this);
    this.state = {
      singPlurSwitch: this.props.switches[0],
      mascFemSwitch: this.props.switches[1],
      defIndefSwitch: this.props.switches[2],
      formattedWords: this.props.formattedWords
    };
  }

  toggleSingPlur() {
    this.setState({
      singPlurSwitch:
        this.state.singPlurSwitch === "singular" ? "plural" : "singular"
    });
    this.updateWords();
  }

  toggleMascFem() {
    this.setState({
      mascFemSwitch:
        this.state.mascFemSwitch === "masculine" ? "feminine" : "masculine"
    });
    this.updateWords();
  }

  toggleDefIndef() {
    this.setState({
      defIndefSwitch:
        this.state.defIndefSwitch === "definite" ? "indefinite" : "definite"
    });
    this.updateWords();
  }

  updateWords() {
    this.setState(state => ({
      formattedWords: selectWordsToLearnForms(
        state.singPlurSwitch,
        state.mascFemSwitch,
        state.defIndefSwitch,
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
        {this.state.singPlurSwitch && (
          <SingPlurSwitch
            toggle={this.toggleSingPlur}
            value={this.state.singPlurSwitch}
          />
        )}
        {this.state.mascFemSwitch && (
          <MascFemSwitch
            toggle={this.toggleMascFem}
            value={this.state.mascFemSwitch}
          />
        )}
        {this.state.defIndefSwitch && (
          <DefIndefSwitch
            toggle={this.toggleDefIndef}
            value={this.state.defIndefSwitch}
          />
        )}
        <div className="wordsToLearn">{wordsToLearn}</div>
      </div>
    );
  }
}

export default Learning;
