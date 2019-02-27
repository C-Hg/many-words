import React from "react";

export let user = {
  guest: {
    isAuthenticated: false
  },
  connected: {
    isAuthenticated: true,
    language: "",
    stats: "",
    areStatsValid: false,
    activity: "",
    weak_words_details: ""
  },
  updateUserStats: function(userStats) {
    this.connected.stats = userStats;
    this.connected.areStatsValid = true;
  },
  outdateUserStats: function() {
    this.connected.areStatsValid = false;
    this.connected.stats = "";
  },
  startWeakWords: function(context, reference) {
    this.connected.activity = "weak_words";
    this.connected.weak_words_details = {
      context: context,
      reference: reference
    };
  },
  resetActivity: function() {
    this.connected.activity = "";
    this.connected.weak_words_details = "";
  }
};

export let UserContext = React.createContext(
  user.guest // default value
);
