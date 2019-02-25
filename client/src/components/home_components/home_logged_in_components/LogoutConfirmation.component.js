import React from "react";
import { LanguageContext } from "../../../contexts/language-context";

function LogoutConfirmation(props) {
  if (props.isUserLoggedOut) {
    return (
      <LanguageContext.Consumer>
        {({ home }) => (
          <div className="logoutInfo">
            <h3 className="logoutText">{home.logout_success}</h3>
            <button onClick={props.continue} className="acknowledgeLogout ok">
              OK
            </button>
          </div>
        )}
      </LanguageContext.Consumer>
    );
  } else {
    return (
      <LanguageContext.Consumer>
        {({ home }) => (
          <div className="logoutInfo">
            <h3 className="logoutText">{home.logout_progress}</h3>
          </div>
        )}
      </LanguageContext.Consumer>
    );
  }
}

export default LogoutConfirmation;
