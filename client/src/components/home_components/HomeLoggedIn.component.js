import React from "react";
import LogoutButton from "./home_logged_in_components/LogoutButton.component";
import getUserStats from "../../controllers/progress_tracking/getUserStats.function";
import GlobalProgress from "./home_logged_in_components/GlobalProgress.component";
import TimeToWork from "./home_logged_in_components/TimeToWork.component";
import ResumeLearningButton from "./home_logged_in_components/ResumeLearningButton.component";
import AboutButton from "./AboutButton.component";
import DeleteAccountButton from "./home_logged_in_components/DeleteAccountButton.component";

class HomeLoggedIn extends React.Component {
  constructor(props) {
    super(props);
    this.fetchUserStats = this.fetchUserStats.bind(this);
    this.state = {
      statsFetched: false,
      userStats: ""
    };
  }

  async fetchUserStats() {
    try {
      let userStats = await getUserStats();
      this.setState({
        userStats: userStats,
        statsFetched: true
      });
    } catch (e) {
      console.log("error while getting user Stats");
    }
  }

  componentDidMount() {
    this.fetchUserStats();
  }

  render() {
    if (this.state.statsFetched) {
      return (
        <div className="HomeLoggedIn">
          {this.state.userStats && (
            <GlobalProgress userStats={this.state.userStats} />
          )}
          {!this.state.userStats && <TimeToWork />}
          <ResumeLearningButton />
          <hr className="homeSeparator separatorLoggedIn" />
          <div className="footerButtons">
            <AboutButton />
            <LogoutButton logout={this.props.logout} />
            <DeleteAccountButton />
          </div>
        </div>
      );
    }
    return null;
  }
}

export default HomeLoggedIn;
