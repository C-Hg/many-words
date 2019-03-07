import React from "react";
import { LanguageContext } from "../../contexts/language-context";
import { UserContext } from "../../contexts/user-context";

class ExitLinks extends React.Component {
  render() {
    let user = this.context;
    return (
      <LanguageContext.Consumer>
        {({ navigation }) => (
          <div className="links">
            <button className="exitLink" onClick={this.props.restart}>
              {user.activity === "weak_words"
                ? navigation.to_continue
                : navigation.try_again}
            </button>
            <button className="exitLink" onClick={this.props.redirect}>
              {navigation.quit}
            </button>
          </div>
        )}
      </LanguageContext.Consumer>
    );
  }
}

export default ExitLinks;

ExitLinks.contextType = UserContext;
