import React from "react";
import "./styles/Home.scss";

import { UserContext } from "../contexts/user-context";
import LogoutConfirmation from "./home_components/LogoutConfirmation.component";
import HomeLoggedIn from "./home_components/HomeLoggedIn.component";
import HomeForGuestUser from "./home_components/HomeForGuestUser.component";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.continue = this.continue.bind(this);
    this.state = {
      attemptedLogout: false
    };
  }

  logout() {
    this.props.logoutUser();
    this.setState({
      attemptedLogout: true
    });
  }

  continue() {
    this.setState({
      attemptedLogout: false
    });
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
    } else {
      return (
        <div className="home whiteBackground">
          {/*TO DO : separate logout and account informations from user progress */}
          {user.isAuthenticated && <HomeLoggedIn logout={this.logout} />}
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
