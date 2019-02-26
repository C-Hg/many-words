import React from "react";

export let user = {
  guest: {
    isAuthenticated: false
  },
  connected: {
    isAuthenticated: true,
    language: "",
    stats: "",
    areStatsValid: false
  },
  updateUserStats: function(userStats) {
    this.connected.stats = userStats;
    this.connected.areStatsValid = true;
  },
  outdateUserStats: function() {
    this.connected.areStatsValid = false;
    this.connected.stats = "";
  }
};

export let UserContext = React.createContext(
  user.guest // default value
);
