import React from "react";
import { LanguageContext } from "../../contexts/language-context";
import getWordCount from "../../controllers/progress_tracking/getWordCount.function";

class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordCount: undefined
    };
  }

  async componentDidMount() {
    try {
      let wordCount = await getWordCount();
      if (wordCount === null) {
        wordCount = 0;
      }
      this.setState({
        wordCount: wordCount
      });
    } catch (e) {
      console.log("error while fetching word count");
    }
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
