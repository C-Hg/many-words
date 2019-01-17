import React from "react";
import "./styles/Home.scss";
import LoginWithGoogle from "./home_components/LoginWithGoogle.component";
import LoginWithFacebook from "./home_components/LoginWithFacebook.component";
import { UserContext } from "../contexts/user-context";
import LogoutButton from "./home_components/LogoutButton.component";
import Welcome from "./home_components/Welcome.component";
import LogoutConfirmation from "./home_components/LogoutConfirmation.component";

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
        <div className="home">
          {/*TO DO : separate logout and accout informations from user progress */}
          {user.isAuthenticated && <LogoutButton logout={this.logout} />}
          {!user.isAuthenticated && <Welcome />}
          {!user.isAuthenticated && (
            <LoginWithGoogle loginUser={this.props.loginUser} />
          )}
          {!user.isAuthenticated && (
            <LoginWithFacebook loginUser={this.props.loginUser} />
          )}
        </div>
      );
    }
  }
}

export default Home;

Home.contextType = UserContext;
