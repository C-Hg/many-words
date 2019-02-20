import React from "react";
import { LanguageContext } from "../../../contexts/language-context";

function DeleteAccountButton() {
  return (
    <LanguageContext.Consumer>
      {({ home }) => (
        <button className="deleteAccountButton homeFooterButton">
          {home.delete_account}
        </button>
      )}
    </LanguageContext.Consumer>
  );
}

export default DeleteAccountButton;
