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
import Container from "../app/Container.styled";
import LandingPage from "../components/Landing/Landing.page";

const mapStateToProps = state => ({ user: state.user, auth: state.auth });

const Home = props => {
  const {
    auth: { isDeletingAccount, isDisconnecting },
    user: { isAuthenticated },
  } = props;

  if (isDisconnecting) {
    return (
      <Container>
        <LogoutConfirmation />
      </Container>
    );
  }
  if (isDeletingAccount) {
    return (
      <Container>
        <DeleteConfirmation />;
      </Container>
    );
  }
  // TODO: implement waiting animation while retrieving auth status
  // TODO: split pages : landing page / login / home (logged or not) and adapt router
  // and move containers down in each page
  return (
    <Container withNavbar>
      <Navbar />
      <ScrollToTopOnMount />
      {isAuthenticated && <HomeLoggedIn />}
      {!isAuthenticated && <LandingPage />}
    </Container>
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
