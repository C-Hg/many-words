import React from "react";

import { LanguageContext } from "../../../contexts/language-context";

const LogoutConfirmation = (props) => {
  const { auth, acknowledgeAction } = props;
  if (auth.hasProcedureSucceeded) {
    return (
      <LanguageContext.Consumer>
        {({ home }) => (
          <div className="logoutInfo">
            <h3 className="logoutText">{home.logoutSuccess}</h3>
            <button
              onClick={acknowledgeAction}
              className="acknowledgeLogout ok"
              type="button"
            >
              OK
            </button>
          </div>
        )}
      </LanguageContext.Consumer>
    );
  }
  return (
    <LanguageContext.Consumer>
      {({ home }) => (
        <div className="logoutInfo">
          <h3 className="logoutText">{home.logoutProgress}</h3>
        </div>
      )}
    </LanguageContext.Consumer>
  );
};

export default LogoutConfirmation;
