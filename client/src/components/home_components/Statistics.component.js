import React from "react";
import { LanguageContext } from "../../contexts/language-context";

class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userStats: undefined
    };
  }

  render() {
    let language = this.context;
    if (this.state.wordCount !== undefined) {
      return (
        <div className="userStats">
          <div className="wordStats">
            {language.home.word_stats_ok}
            {this.state.wordCount}
          </div>
        </div>
      );
    } else return null; // waiting screen!!
  }
}

export default Statistics;

Statistics.contextType = LanguageContext;
