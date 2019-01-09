import React from "react";
import { Link } from "react-router-dom";
import getWordsToLearn from "../controllers/learning_fetcher/getWordsToLearn.controller";
import getSwitchesStates from "../controllers/learning_fetcher/getSwitchesStates.function";
import selectWordsToLearnForms from "../controllers/select_words_to_learn/selectWordsToLearnForms.controller";
import BackArrow from "./common_components/BackArrow.component";
import Switches from "./learning_components/Switches.component";
import LearningTitle from "./learning_components/LearningTitle.component";

import "./styles/Learning.scss";

class Learning extends React.Component {
  constructor(props) {
    super(props);
    this.toggleNumber = this.toggleNumber.bind(this);
    this.toggleGender = this.toggleGender.bind(this);
    this.toggleDefinite = this.toggleDefinite.bind(this);
    this.updateWords = this.updateWords.bind(this);
    this.state = {
      number: "",
      gender: "",
      definite: "",
      formattedWords: ["hello", "ty"],
      exerciseWords: ""
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
        this.state.wordsToLearn
      )
    }));
  }

  async componentDidMount() {
    let wordsToLearn = await getWordsToLearn(this.props.lesson);
    let switches = getSwitchesStates(wordsToLearn);
    this.setState({
      wordsToLearn: wordsToLearn,
      formattedWords: selectWordsToLearnForms(
        switches[0],
        switches[1],
        switches[2],
        wordsToLearn
      ),
      number: switches[0],
      gender: switches[1],
      definite: switches[2]
    });
  }

  render() {
    let wordsToLearn;
    //cannot do it if data is not fetched from the database
    if (this.state.formattedWords) {
      wordsToLearn = this.state.formattedWords.map((val, i) => {
        return (
          <div key={`twoWords${i}`} className="twoWords">
            {val.en} : {val.fr}
          </div>
        );
      });
    }
    return (
      <div className="learning-container">
        <Link to={`/${this.props.theme}/${this.props.subtheme}`}>
          <BackArrow />
        </Link>
        <LearningTitle lesson={this.props.lesson} />
        <div className="wordsToLearn">{wordsToLearn}</div>
        <Switches
          number={this.state.number}
          toggleNumber={this.toggleNumber}
          gender={this.state.gender}
          toggleGender={this.toggleGender}
          definite={this.state.definite}
          toggleDefinite={this.toggleDefinite}
        />
      </div>
    );
  }
}

export default Learning;
