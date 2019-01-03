import React from "react";
import SingPlurSwitch from "./learning_components/SingPlurSwitch.component";
import MascFemSwitch from "./learning_components/MascFemSwitch.component";
import DefIndefSwitch from "./learning_components/DefIndefSwitch.component";
import selectWordsToLearnForms from "../controllers/select_words_to_learn/selectWordsToLearnForms.controller";

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
      words: this.props.words
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
      words: selectWordsToLearnForms(
        state.singPlurSwitch,
        state.mascFemSwitch,
        state.defIndefSwitch,
        this.props.wordsToLearn
      )
    }));
  }

  render() {
    const wordsToRender = this.state.words.map(val => {
      return (
        <div>
          <div>{val[0]}</div>
          <div>{val[1]}</div>
        </div>
      );
    });
    return (
      <div>
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
        {wordsToRender}
      </div>
    );
  }
}

export default Learning;
