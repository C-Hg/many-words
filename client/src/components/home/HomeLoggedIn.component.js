import React from "react";
import { Redirect } from "react-router-dom";

import { actions as userActions } from "../../redux/reducers/user";
import { connect } from "react-redux";

import LogoutButton from "./home_logged_in/LogoutButton.component";
import GlobalProgress from "./home_logged_in/GlobalProgress.component";
import TimeToWork from "./home_logged_in/TimeToWork.component";
import ResumeLearningButton from "./home_logged_in/ResumeLearningButton.component";
import AboutButton from "./AboutButton.component";
import DeleteAccountButton from "./home_logged_in/DeleteAccountButton.component";

function mapStateToProps(state) {
  return { user: state.user };
}

const mapDispatchToProps = dispatch => {
  return {
    outdateUserStats: () => {
      dispatch(userActions.outdateUserStats());
    },
    updateUserStats: () => {
      dispatch(userActions.getUserStats());
    }
  };
};

class HomeLoggedIn extends React.Component {
  constructor(props) {
    super(props);
    this.updateUserStats = this.updateUserStats.bind(this);
    this.state = {
      statsFetched: false
    };
  }

  async updateUserStats() {
    await this.props.updateUserStats();
    this.setState({
      statsFetched: true
    });
  }

  //TO BE DELETED and replaced by stats fetching on loging and after exercise only
  componentDidMount() {
    if (!this.state.statsFetched) {
      this.updateUserStats();
    }
  }

  render() {
    let user = this.props.user;
    if (user.activity === "weak_words") {
      return <Redirect to="/weak_words" />;
    }

    if (this.state.statsFetched) {
      return (
        <div className="HomeLoggedIn">
          {user.stats && <GlobalProgress stats={user.stats} />}
          {!user.stats && <TimeToWork />}
          <ResumeLearningButton />
          <hr className="homeSeparator separatorLoggedIn" />
          <div className="footerButtons">
            <AboutButton contextualClass="homeFooterButton" />
            <LogoutButton />
            <DeleteAccountButton delete={this.props.delete} />
          </div>
        </div>
      );
    }
    return null;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeLoggedIn);
