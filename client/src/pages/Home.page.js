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

function mapStateToProps(state) {
  return { user: state.user, auth: state.auth };
}

function Home(props) {
  if (props.auth.isDisconnecting) {
    return <LogoutConfirmation />;
  } else if (props.auth.isDeletingAccount) {
    return <DeleteConfirmation />;
  } else {
    return (
      <div className="main-container whiteBackground">
        <div className="home whiteBackground">
          <ScrollToTopOnMount />
          {props.user.isAuthenticated && <HomeLoggedIn />}
          {!props.user.isAuthenticated && <HomeForGuestUser />}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(Home);
