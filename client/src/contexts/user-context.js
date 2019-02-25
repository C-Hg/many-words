import React from "react";

export let user = {
  guest: {
    isAuthenticated: false
  },
  connected: {
    isAuthenticated: true,
    language: ""
  }
};

export let UserContext = React.createContext(
  user // default value
);
