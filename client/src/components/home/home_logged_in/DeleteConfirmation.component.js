import React from "react";
import { LanguageContext } from "../../../contexts/language-context";

function DeleteConfirmation(props) {
  if (!props.isDeletionConfirmed) {
    return (
      <LanguageContext.Consumer>
        {({ home }) => (
          <div className="logoutInfo">
            <h3 className="logoutText">{home.confirm_deletion}</h3>
            <div className="deleteButtons">
              <button
                onClick={props.logoutAndDelete}
                className="acknowledgeLogout confirm"
              >
                {home.confirm}
              </button>
              <button
                onClick={props.continue}
                className="acknowledgeLogout abort"
              >
                {home.back}
              </button>
            </div>
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
              <h3 className="logoutText">{home.delete_waiting}</h3>
            </div>
          )}
        </LanguageContext.Consumer>
      );
    }
  }
}

export default DeleteConfirmation;
