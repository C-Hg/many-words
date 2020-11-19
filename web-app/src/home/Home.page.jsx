import React from "react";

import HomeLoggedIn from "./HomeLoggedIn.component";

import AppContainer from "../app/AppContainer.styled";
import DeleteConfirmation from "../components/home/home_logged_in/DeleteConfirmation.component";
import LogoutConfirmation from "../components/home/home_logged_in/LogoutConfirmation.component";
import LandingPage from "../landing/Landing.page";

const Home = (props) => {
  const {
    auth: { isDeletingAccount, isDisconnecting },
    user: { isAuthenticated },
  } = props;

  if (isDisconnecting) {
    return (
      <AppContainer>
        <LogoutConfirmation />
      </AppContainer>
    );
  }
  if (isDeletingAccount) {
    return (
      <AppContainer>
        <DeleteConfirmation />;
      </AppContainer>
    );
  }
  // TODO: implement waiting animation while retrieving auth status
  // TODO: split pages : landing page / login / home (logged or not) and adapt router
  return isAuthenticated ? <HomeLoggedIn /> : <LandingPage />;
};

export default Home;
