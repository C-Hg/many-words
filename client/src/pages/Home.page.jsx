import React from "react";
import "../styles/Home.scss";
import "../styles/HomeForGuest.scss";
import "../styles/HomeLoggedIn.scss";

import { connect } from "react-redux";

import LogoutConfirmation from "../components/home/home_logged_in/LogoutConfirmation.component";
import HomeLoggedIn from "../components/home/HomeLoggedIn.component";
import HomeForGuestUser from "../components/home/HomeForGuestUser.component";
import DeleteConfirmation from "../components/home/home_logged_in/DeleteConfirmation.component";
import ScrollToTopOnMount from "../router/ScrollToTopOnMount.component";
import Navbar from "../components/navbar/Navbar.component";

function mapStateToProps(state) {
  return { user: state.user, auth: state.auth };
}

const Home = props => {
  const { auth, user } = props;
  const { isDeletingAccount, isDisconnecting } = auth;
  const { isAuthenticated } = user;

  if (isDisconnecting) {
    return (
      <div className="app whiteBackground">
        <LogoutConfirmation />
      </div>
    );
  } else if (isDeletingAccount) {
    return (
      <div className="app whiteBackground">
        <DeleteConfirmation />;
      </div>
    );
  } else {
    return (
      <div className="app app-with-navbar-full-screen">
        <Navbar />
        <div className="main-container whiteBackground">
          <div className="home whiteBackground">
            <ScrollToTopOnMount />
            {isAuthenticated && <HomeLoggedIn />}
            {!isAuthenticated && <HomeForGuestUser />}
          </div>
        </div>
      </div>
    );
  }
};

export default connect(
  mapStateToProps,
  null
)(Home);
