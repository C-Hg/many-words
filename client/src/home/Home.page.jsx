import React from "react";
import "../styles/Home.scss";
import "../styles/HomeForGuest.scss";
import "../styles/HomeLoggedIn.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import LogoutConfirmation from "../components/home/home_logged_in/LogoutConfirmation.component";
import HomeLoggedIn from "../components/home/HomeLoggedIn.component";
import HomeForGuestUser from "../components/home/HomeForGuestUser.component";
import DeleteConfirmation from "../components/home/home_logged_in/DeleteConfirmation.component";
import ScrollToTopOnMount from "../app/ScrollToTopOnMount.component";
import Navbar from "./Home.navbar";
import Container from "../app/Container.styled";

const mapStateToProps = state => ({ user: state.user, auth: state.auth });

const Home = props => {
  const {
    auth: { isDeletingAccount, isDisconnecting },
    user: { isAuthenticated },
  } = props;

  if (isDisconnecting) {
    return (
      <div className="app whiteBackground">
        <LogoutConfirmation />
      </div>
    );
  }
  if (isDeletingAccount) {
    return (
      <div className="app whiteBackground">
        <DeleteConfirmation />;
      </div>
    );
  }
  // TODO: implement waiting animation while retrieving auth status
  return (
    <Container withNavbar backgroundColor="white">
      <Navbar />
      <ScrollToTopOnMount />
      {isAuthenticated && <HomeLoggedIn />}
      {!isAuthenticated && <HomeForGuestUser />}
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
