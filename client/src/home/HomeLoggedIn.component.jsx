import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import LogoutButton from "../components/home/home_logged_in/LogoutButton.component";
import GlobalProgress from "./progress/GlobalProgress.component";
import TimeToWork from "../components/home/home_logged_in/TimeToWork.component";
import ResumeLearningButton from "../components/home/home_logged_in/ResumeLearningButton.component";
import DeleteAccountButton from "../components/home/home_logged_in/DeleteAccountButton.component";
import AppContainer from "../app/AppContainer.styled";

function mapStateToProps(state) {
  return { user: state.user };
}

const HomeLoggedIn = props => {
  const { user } = props;
  const { stats } = user;

  return (
    <AppContainer>
      {stats && <GlobalProgress stats={stats} />}
      {!stats && <TimeToWork />}
      <ResumeLearningButton />
      <hr className="homeSeparator separatorLoggedIn" />
      <div className="footerButtons">
        {/* TODO: replace me with MainButton */}
        {/* <AboutButton contextualClass="homeFooterButton" /> */}
        <LogoutButton />
        <DeleteAccountButton />
      </div>
    </AppContainer>
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
