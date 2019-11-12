import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import LogoutButton from "../components/home/home_logged_in/LogoutButton.component";
import GlobalProgress from "../components/home/home_logged_in/GlobalProgress.component";
import TimeToWork from "../components/home/home_logged_in/TimeToWork.component";
import ResumeLearningButton from "../components/home/home_logged_in/ResumeLearningButton.component";
import AboutButton from "../components/home/AboutButton.component";
import DeleteAccountButton from "../components/home/home_logged_in/DeleteAccountButton.component";

function mapStateToProps(state) {
  return { user: state.user };
}

const HomeLoggedIn = props => {
  const { user } = props;
  const { stats } = user;

  return (
    <div className="HomeLoggedIn">
      {stats && <GlobalProgress stats={stats} />}
      {!stats && <TimeToWork />}
      <ResumeLearningButton />
      <hr className="homeSeparator separatorLoggedIn" />
      <div className="footerButtons">
        <AboutButton contextualClass="homeFooterButton" />
        <LogoutButton />
        <DeleteAccountButton />
      </div>
    </div>
  );
};

HomeLoggedIn.propTypes = {
  user: PropTypes.shape({
    stats: PropTypes.object.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  null
)(HomeLoggedIn);
