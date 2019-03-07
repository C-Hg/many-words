import React from "react";
import { LanguageContext } from "../../../contexts/language-context";

function TimeToWork() {
  return (
    <LanguageContext.Consumer>
      {({ home }) => <h2 className="menuTitle">{home.no_stats}</h2>}
    </LanguageContext.Consumer>
  );
}

export default TimeToWork;
