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
  return { user: state.user };
}

const mapDispatchToProps = dispatch => {
  return {};
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.attemptLogout = this.attemptLogout.bind(this);
    this.state = {};
  }

  attemptLogout() {
    this.props.logoutUser();
    this.setState({
      attemptedLogout: true
    });
  }

  attemptDelete() {
    this.setState({
      attemptedDelete: true
    });
  }

  setUserResponse(event) {
    let value = event.target.value;
    this.setState({
      isDeletionConfirmed: value
    });
  }

  continue() {
    this.setState({
      attemptedLogout: false,
      attemptedDelete: false,
      isDeletionConfirmed: false
    });
  }

  logoutAndDelete() {
    this.props.logoutAndDeleteUser();
    this.props.outdateUserStats();
    this.setState({
      isDeletionConfirmed: "confirm"
    });
  }

  render() {
    const user = this.props.user;
    if (user.login.isDisconnecting) {
      return (
        <LogoutConfirmation
          continue={this.continue}
          isUserLoggedOut={!user.isAuthenticated}
        />
      );
    } else if (user.login.isDeletingAccount) {
      return (
        <DeleteConfirmation
          continue={this.continue}
          isDeletionConfirmed={this.state.isDeletionConfirmed}
          isUserLoggedOut={!user.isAuthenticated}
          logoutAndDelete={this.logoutAndDelete}
        />
      );
    } else {
      return (
        <div className="main-container whiteBackground">
          <div className="home whiteBackground">
            <ScrollToTopOnMount />
            {/*TO DO : separate logout and account informations from currentUser progress */}
            {user.isAuthenticated && (
              <HomeLoggedIn
                logout={this.attemptLogout}
                delete={this.attemptDelete}
              />
            )}
            {!user.isAuthenticated && (
              <HomeForGuestUser loginUser={this.props.loginUser} />
            )}
          </div>
        </div>
      );
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
