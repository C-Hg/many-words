import React from "react";
import "./styles/Home.scss";
import "./styles/HomeForGuest.scss";
import "./styles/HomeLoggedIn.scss";

import { UserContext } from "../contexts/user-context";
import LogoutConfirmation from "./home_components/home_logged_in_components/LogoutConfirmation.component";
import HomeLoggedIn from "./home_components/HomeLoggedIn.component";
import HomeForGuestUser from "./home_components/HomeForGuestUser.component";
import DeleteConfirmation from "./home_components/home_logged_in_components/DeleteConfirmation.component";
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
    this.setState({
      isDeletionConfirmed: "confirm"
    });
    this.props.logoutAndDeleteUser();
  }

  render() {
    let user = this.context;
    if (this.state.attemptedLogout) {
      return (
        <LogoutConfirmation
          continue={this.continue}
          isUserLoggedOut={!user.isAuthenticated}
        />
      );
    } else if (this.state.attemptedDelete) {
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
        <div className="home whiteBackground">
          <ScrollToTopOnMount />
          {/*TO DO : separate logout and account informations from user progress */}
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
      );
    }
  }
}

Home.contextType = UserContext;

export default Home;
