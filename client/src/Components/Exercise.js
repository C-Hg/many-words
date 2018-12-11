import React, { Component } from "react";
import Instructions from "./Exercise_components/Instructions.component";
import OriginWord from "./Exercise_components/OriginWord.component";
import UserTranslation from "./Exercise_components/UserTranslation.component";

const Exercise = function(props) {
  return (
    <div>
      <Instructions />
      <OriginWord originWord={props.exerciseWords[props.wordRank].english} />
      <UserTranslation
        userTranslationInput={props.userTranslationInput}
        handleUserTranslationChange={props.handleUserTranslationChange}
      />
    </div>
  );
};

export default Exercise;
