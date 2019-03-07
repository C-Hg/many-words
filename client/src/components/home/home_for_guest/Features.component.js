import React from "react";
import { LanguageContext } from "../../../contexts/language-context";

function Features(props) {
  return (
    <LanguageContext.Consumer>
      {({ home }) => (
        <div className="features">
          <div className="feature">
            <i alt="free" className="material-icons md-72 featureIcon">
              all_inclusive
            </i>
            <h2 className="features_title">{home.features_free}</h2>
          </div>
          <div className="feature">
            <i alt="spellcheck" className="material-icons md-72 featureIcon">
              spellcheck
            </i>
            <h2 className="features_title">{home.features_words}</h2>
          </div>
          <div className="feature">
            <i alt="stars" className="material-icons md-72 featureIcon">
              stars
            </i>
            <h2 className="features_title">{home.features_progress}</h2>
          </div>
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default Features;
