import React from "react";
import { LanguageContext } from "../../../contexts/language-context";

function DeleteAccountButton(props) {
  return (
    <LanguageContext.Consumer>
      {({ home }) => (
        <button
          className="deleteAccountButton homeFooterButton"
          onClick={props.delete}
        >
          {home.delete_account}
        </button>
      )}
    </LanguageContext.Consumer>
  );
}

export default DeleteAccountButton;
