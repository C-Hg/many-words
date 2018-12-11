import React, { Component } from "react";

const UserTranslation = function(props) {
  return (
    <div>
      <input
        value={props.UserTranslationInput}
        onChange={props.handleUserTranslationChange}
      />
    </div>
  );
};

export default UserTranslation;
