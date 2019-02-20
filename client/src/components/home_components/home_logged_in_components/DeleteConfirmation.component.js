import React from "react";
import { LanguageContext } from "../../../contexts/language-context";

function DeleteConfirmation(props) {
  if (!props.isDeletionConfirmed) {
    return (
      <LanguageContext.Consumer>
        {({ home }) => (
          <div className="logoutInfo">
            <h3 className="logoutText">{home.confirm_deletion}</h3>
            <button
              onClick={props.setUserResponse}
              key="confirm"
              className="acknowledgeLogout"
            >
              {home.confirm}
            </button>
            <button
              onClick={props.setUserResponse}
              key="back"
              className="acknowledgeLogout"
            >
              {home.back}
            </button>
          </div>
        )}
      </LanguageContext.Consumer>
    );
  } else if (props.isDeletionConfirmed) {
    if (props.isUserLoggedOut) {
      return (
        <LanguageContext.Consumer>
          {({ home }) => (
            <div className="logoutInfo">
              <h3 className="logoutText">{home.delete_success}</h3>
              <button onClick={props.continue} className="acknowledgeLogout">
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
              <h3 className="logoutText">{home.delete_waiting}</h3>
            </div>
          )}
        </LanguageContext.Consumer>
      );
    }
  }
}

export default DeleteConfirmation;
