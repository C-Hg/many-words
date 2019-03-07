import React from "react";
import "../styles/Home.scss";
import "../styles/HomeForGuest.scss";
import "../styles/HomeLoggedIn.scss";

import { UserContext, user } from "../contexts/user-context";
import LogoutConfirmation from "../components/home/home_logged_in/LogoutConfirmation.component";
import HomeLoggedIn from "../components/home/HomeLoggedIn.component";
import HomeForGuestUser from "../components/home/HomeForGuestUser.component";
import DeleteConfirmation from "../components/home/home_logged_in/DeleteConfirmation.component";
import ScrollToTopOnMount from "../router/ScrollToTopOnMount.component";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.attemptLogout = this.attemptLogout.bind(this);
    this.attemptDelete = this.attemptDelete.bind(this);
    this.continue = this.continue.bind(this);
    this.setUserResponse = this.setUserResponse.bind(this);
    this.logoutAndDelete = this.logoutAndDelete.bind(this);
    this.state = {
      attemptedLogout: false,
      attemptedDelete: false,
      isDeletionConfirmed: false
    };
  }

  attemptLogout() {
    this.props.logoutUser();
    user.outdateUserStats();
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
    user.outdateUserStats();
    this.setState({
      isDeletionConfirmed: "confirm"
    });
  }

  render() {
    let currentUser = this.context;
    if (this.state.attemptedLogout) {
      return (
        <LogoutConfirmation
          continue={this.continue}
          isUserLoggedOut={!currentUser.isAuthenticated}
        />
      );
    } else if (this.state.attemptedDelete) {
      return (
        <DeleteConfirmation
          continue={this.continue}
          isDeletionConfirmed={this.state.isDeletionConfirmed}
          isUserLoggedOut={!currentUser.isAuthenticated}
          logoutAndDelete={this.logoutAndDelete}
        />
      );
    } else {
      return (
        <div className="main-container whiteBackground">
          <div className="home whiteBackground">
            <ScrollToTopOnMount />
            {/*TO DO : separate logout and account informations from currentUser progress */}
            {currentUser.isAuthenticated && (
              <HomeLoggedIn
                logout={this.attemptLogout}
                delete={this.attemptDelete}
              />
            )}
            {!currentUser.isAuthenticated && (
              <HomeForGuestUser loginUser={this.props.loginUser} />
            )}
          </div>
        </div>
      );
    }
  }
}

Home.contextType = UserContext;

export default Home;
