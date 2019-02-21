import React from "react";
import "./styles/Home.scss";
import "./styles/HomeForGuest.scss";
import "./styles/HomeLoggedIn.scss";

import { UserContext } from "../contexts/user-context";
import LogoutConfirmation from "./home_components/home_logged_in_components/LogoutConfirmation.component";
import HomeLoggedIn from "./home_components/HomeLoggedIn.component";
import HomeForGuestUser from "./home_components/HomeForGuestUser.component";
import DeleteConfirmation from "./home_components/home_logged_in_components/DeleteConfirmation.component";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.delete = this.delete.bind(this);
    this.continue = this.continue.bind(this);
    this.setUserResponse = this.setUserResponse.bind(this);
    this.state = {
      attemptedLogout: false,
      attemptedDelete: false,
      isDeletionConfirmed: false
    };
  }

  logout() {
    this.props.logoutUser();
    this.setState({
      attemptedLogout: true
    });
  }

  delete() {
    this.setState({
      attemptedDelete: true
    });
  }

  setUserResponse(event) {
    this.setState({
      isDeletionConfirmed: event.target.value
    });
  }

  continue() {
    this.setState({
      attemptedLogout: false,
      attemptedDelete: false,
      isDeletionConfirmed: false
    });
  }

  componentDidMount() {
    if (this.state.isDeletionConfirmed === "confirm") {
      this.props.logoutAndDeleteUser();
    }
    if (this.state.isDeletionConfirmed === "back") {
      this.continue();
    }
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
          setUserResponse={this.setUserResponse}
        />
      );
    } else {
      return (
        <div className="home whiteBackground">
          {/*TO DO : separate logout and account informations from user progress */}
          {user.isAuthenticated && (
            <HomeLoggedIn logout={this.logout} delete={this.delete} />
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
