import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import LogoutConfirmation from "../components/home/home_logged_in/LogoutConfirmation.component";
import HomeLoggedIn from "./HomeLoggedIn.component";

import DeleteConfirmation from "../components/home/home_logged_in/DeleteConfirmation.component";
import AppContainer from "../app/AppContainer.styled";
import LandingPage from "../landing/Landing.page";

const mapStateToProps = state => ({ user: state.user, auth: state.auth });

const Home = props => {
  const {
    auth: { isDeletingAccount, isDisconnecting },
    user: { isAuthenticated },
  } = props;

  if (isDisconnecting) {
    return (
      <AppContainer>
        <LogoutConfirmation />
      </AppContainer>
    );
  }
  if (isDeletingAccount) {
    return (
      <AppContainer>
        <DeleteConfirmation />;
      </AppContainer>
    );
  }
  return isAuthenticated ? <HomeLoggedIn /> : <LandingPage />;
};

Home.propTypes = {
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
  auth: PropTypes.shape({
    isDeletingAccount: PropTypes.bool.isRequired,
    isDisconnecting: PropTypes.bool.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  null
)(Home);
