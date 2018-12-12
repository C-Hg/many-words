import React from "react";

const UserTranslation = function(props) {
  return (
    <div>
      <input
        value={props.userTranslation}
        onChange={props.userTranslationChange}
      />
    </div>
  );
};

export default UserTranslation;
