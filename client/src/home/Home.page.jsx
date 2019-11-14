import React from "react";
import "../styles/Home.scss";
import "../styles/HomeForGuest.scss";
import "../styles/HomeLoggedIn.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import LogoutConfirmation from "../components/home/home_logged_in/LogoutConfirmation.component";
import HomeLoggedIn from "./HomeLoggedIn.component";

import DeleteConfirmation from "../components/home/home_logged_in/DeleteConfirmation.component";
import ScrollToTopOnMount from "../app/ScrollToTopOnMount.component";
import Navbar from "./Home.navbar";
import AppContainer from "../app/AppContainer.styled";
import LandingPage from "../components/landing/Landing.page";

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
  // TODO: implement waiting animation while retrieving auth status
  // TODO: split pages : landing page / login / home (logged or not) and adapt router
  // and move Appcontainers down in each page
  return (
    <AppContainer withNavbar>
      <Navbar />
      <ScrollToTopOnMount />
      {isAuthenticated && <HomeLoggedIn />}
      {!isAuthenticated && <LandingPage />}
    </AppContainer>
  );
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
