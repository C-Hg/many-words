import React from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/language-context";
import { UserContext } from "../contexts/user-context";
import "./styles/Curriculum.scss";

import ThemeTitle from "./curriculum_components/ThemeTitle.component";
import getThemesStats from "../controllers/progress_tracking/getThemesStats.function";

class Curriculum extends React.Component {
  constructor(props) {
    super(props);
    this.getStats = this.getStats.bind(this);
  }

  async getStats() {
    let stats = await getThemesStats();
    console.log(stats);
    //this.setState({});
  }

  componentDidMount() {
    let user = this.context;
    if (user.isAuthenticated) {
      this.getStats();
    }
  }

  render() {
    // the adjacent number is the total number of words per theme, for stats tracking
    const themes = [
      ["animals", 103],
      ["clothes", 47],
      ["colors", 10],
      ["food", 95],
      ["habitation", 82],
      ["human_body", 76],
      ["nature", 79],
      ["numbers", 32],
      ["social_life", 51],
      ["time", 79],
      ["vegetals", 35]
    ];

    const cards = themes.map(val => {
      return (
        <Link className="themeCard" key={val[0]} to={`../${val[0]}`}>
          <ThemeTitle theme={val[0]} />
          {/* send this.state stats, the components return null if no data is fetched
          <StudiedWords />
        <StarredWords />*/}
        </Link>
      );
    });

    return (
      <LanguageContext.Consumer>
        {({ curriculum }) => (
          <div className="curriculum">
            <h1 className="curriculumTitle">{curriculum.title}</h1>
            <div className="themeCards">{cards}</div>
          </div>
        )}
      </LanguageContext.Consumer>
    );
  }
}

Curriculum.contextType = UserContext;

export default Curriculum;
