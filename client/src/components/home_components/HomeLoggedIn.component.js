import React from "react";
import Statistics from "./Statistics.component";
import LogoutButton from "./LogoutButton.component";
import getUserStats from "../../controllers/progress_tracking/getUserStats.function";
import GlobalProgress from "./GlobalProgress.component";
import TimeToWork from "./TimeToWork.component";

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
          <Statistics />
          <LogoutButton logout={this.props.logout} />
        </div>
      );
    }
    return null;
  }
}

export default HomeLoggedIn;
