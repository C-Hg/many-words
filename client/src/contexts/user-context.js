import React from "react";

export let user = {
  connected: {
    isAuthenticated: true,
    language: "",
    stats: "",
    areStatsValid: false,
    activity: "",
    weakWordsContext: ""
  },
  // updateUserStats: function(userStats) {
  //   this.connected.stats = userStats;
  //   this.connected.areStatsValid = true;
  // },
  startWeakWords: function(context, reference) {
    this.connected.activity = "weak_words";
    this.connected.weakWordsContext = {
      context: context,
      reference: reference
    };
  }
};

export let UserContext = React.createContext(
  user.guest // default value
);
