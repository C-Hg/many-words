import React from "react";

import { LanguageContext } from "../../../contexts/language-context";

const DeleteConfirmation = (props) => {
  const { auth, confirmDeletion, abortDeletion, acknowledgeAction } = props;

  if (!auth.hasConfirmedDeletion) {
    return (
      <LanguageContext.Consumer>
        {({ home }) => (
          <div className="logoutInfo">
            <h3 className="logoutText">{home.confirmDeletion}</h3>
            <div className="deleteButtons">
              <button
                onClick={confirmDeletion}
                className="acknowledgeLogout confirm"
                type="button"
              >
                {home.confirm}
              </button>
              <button
                onClick={abortDeletion}
                className="acknowledgeLogout abort"
                type="button"
              >
                {home.back}
              </button>
            </div>
          </div>
        )}
      </LanguageContext.Consumer>
    );
  }
  if (auth.hasProcedureSucceeded) {
    return (
      <LanguageContext.Consumer>
        {({ home }) => (
          <div className="logoutInfo">
            <h3 className="logoutText">{home.deleteSuccess}</h3>
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
          <h3 className="logoutText">{home.deleteWaiting}</h3>
        </div>
      )}
    </LanguageContext.Consumer>
  );
};

export default DeleteConfirmation;
