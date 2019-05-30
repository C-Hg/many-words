import React from "react";
import { Redirect } from "react-router-dom";

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

class HomeLoggedIn extends React.Component {
  render() {
    let user = this.props.user;
    if (user.activity === "weak_words") {
      return <Redirect to="/weak_words" />;
    }

    if (user.stats.hasOwnProperty("globalProgress")) {
      return (
        <div className="HomeLoggedIn">
          {user.stats && <GlobalProgress stats={user.stats} />}
          {!user.stats && <TimeToWork />}
          <ResumeLearningButton />
          <hr className="homeSeparator separatorLoggedIn" />
          <div className="footerButtons">
            <AboutButton contextualClass="homeFooterButton" />
            <LogoutButton />
            <DeleteAccountButton />
          </div>
        </div>
      );
    }
    return null;
  }
}

export default connect(
  mapStateToProps,
  null
)(HomeLoggedIn);
