import React from "react";
import { Redirect } from "react-router-dom";

import LogoutButton from "./home_logged_in_components/LogoutButton.component";
import getUserStats from "../../controllers/progress_tracking/getUserStats.function";
import GlobalProgress from "./home_logged_in_components/GlobalProgress.component";
import TimeToWork from "./home_logged_in_components/TimeToWork.component";
import ResumeLearningButton from "./home_logged_in_components/ResumeLearningButton.component";
import AboutButton from "./AboutButton.component";
import DeleteAccountButton from "./home_logged_in_components/DeleteAccountButton.component";
import { UserContext, user } from "../../contexts/user-context";

class HomeLoggedIn extends React.Component {
  constructor(props) {
    super(props);
    this.fetchUserStats = this.fetchUserStats.bind(this);
    this.state = {
      statsFetched: false,
      stats: ""
    };
  }

  async fetchUserStats(loggedUser) {
    if (loggedUser.areStatsValid)
      this.setState({
        stats: loggedUser.stats,
        statsFetched: true
      });
    else {
      try {
        let userStats = await getUserStats();
        this.setState({
          stats: userStats,
          statsFetched: true
        });
        user.updateUserStats(userStats);
      } catch (e) {
        console.log("error while getting user Stats");
      }
    }
  }

  componentDidMount() {
    let loggedUser = this.context; // Attention! loggedUser is different from user imported directly from context
    this.fetchUserStats(loggedUser);
  }

  render() {
    let loggedUser = this.context;
    if (loggedUser.activity === "weak_words") {
      return <Redirect to="/weak_words" />;
    }

    if (this.state.statsFetched) {
      return (
        <div className="HomeLoggedIn">
          {this.state.stats && <GlobalProgress stats={this.state.stats} />}
          {!this.state.stats && <TimeToWork />}
          <ResumeLearningButton />
          <hr className="homeSeparator separatorLoggedIn" />
          <div className="footerButtons">
            <AboutButton contextualClass="homeFooterButton" />
            <LogoutButton logout={this.props.logout} />
            <DeleteAccountButton delete={this.props.delete} />
          </div>
        </div>
      );
    }
    return null;
  }
}

export default HomeLoggedIn;

HomeLoggedIn.contextType = UserContext;
