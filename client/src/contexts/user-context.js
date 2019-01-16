import React from "react";

export let user = {
  isAuthenticated: false,
  email: "",
  language: "",
  logInUser(email) {
    this.email = email;
    this.isAuthenticated = true;
  }
};

export let UserContext = React.createContext(
  user // default value
);
