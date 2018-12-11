import React from "react";
import Instructions from "./Exercise_components/Instructions.component";
import OriginWord from "./Exercise_components/OriginWord.component";
import UserTranslation from "./Exercise_components/UserTranslation.component";
import SubmitUserTranslation from "./Exercise_components/SubmitUserTranslation.component";
import Result from "./Exercise_components/Result.component";
import functions from "../Functions/Exercise_functions/Exercise.functions";

class Exercise extends React.Component {
  constructor(props) {
    super(props);
    this.userTranslationChange = this.userTranslationChange.bind(this);
    this.submitUserTranslation = this.submitUserTranslation.bind(this);
    this.incrementWordRank = this.incrementWordRank.bind(this);
    this.state = {
      exerciseWords: [
        { french: "bonjour", english: "hello" },
        { french: "rouge", english: "red" },
        { french: "bleu", english: "blue" }
      ],
      wordRank: 0,
      userTranslation: "",
      checking: false,
      correct: false
    };
  }

  userTranslationChange(event) {
    this.setState({
      userTranslationInput: event.target.value
    });
  }

  submitUserTranslation() {
    let result = functions.checkUserTranslation(
      this.state.userTranslation,
      this.state.exerciseWords[this.state.wordRank].french
    );
    this.setState({
      checking: true,
      result: result
    });
    this.incrementWordRank();
  }

  incrementWordRank() {
    this.setState(state => ({
      wordRank: state.wordRank + 1
    }));
  }

  render() {
    return (
      <div>
        <Instructions activity={this.props.activity} />
        <OriginWord
          originWord={this.state.exerciseWords[this.state.wordRank].english}
        />
        <UserTranslation
          userTranslationInput={this.state.userTranslation}
          userTranslationChange={this.userTranslationChange}
        />
        <SubmitUserTranslation
          submitUserTranslation={this.submitUserTranslation}
        />
        <Result correct={this.state.correct} word={this.state.wordRank} />
      </div>
    );
  }
}

export default Exercise;
