import React from "react";

export let user = {
  guest: {
    language: "english"
  },
  loggedInUser: {
    name: "",
    language: ""
  }
};

export let UserContext = React.createContext(
  user.guest // default value
);
