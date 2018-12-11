import React from "react";

const UserTranslation = function(props) {
  return (
    <div>
      <input
        value={props.UserTranslation}
        onChange={props.handleUserTranslationChange}
      />
    </div>
  );
};

export default UserTranslation;
