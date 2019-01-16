import React from "react";

export let user = {
  guest: {
    isAuthenticated: false
  },
  connected: {
    isAuthenticated: true,
    email: "",
    language: ""
  },
  logInUser(email) {
    this.connected.email = email;
  },
  logOutUser() {
    this.connected.email = "";
  }
};

export let UserContext = React.createContext(
  user // default value
);
