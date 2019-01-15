import React from "react";

export let user = {
  guest: {
    language: "english",
    isAuthenticated: false
  },
  loggedInUser: {
    isAuthenticated: true,
    name: "",
    language: ""
  }
};

export let UserContext = React.createContext(
  user.guest // default value
);
