import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./App.scss";
import "./styles/common/material_icons.css";
import "./styles/common/titles.scss";
import "./styles/common/layouts.scss";
import "./styles/common/buttons.scss";
import "./styles/common/variables.scss";

import { actions as userActions } from "./redux/reducers/user";
import { connect } from "react-redux";

import { LanguageContext } from "./contexts/language-context";
import MainRouter from "./router/MainRouter";

function mapStateToProps(state) {
  return { user: state.user };
}

const mapDispatchToProps = dispatch => {
  return {
    defineLanguage: () => {
      dispatch(userActions.defineLanguage());
    },
    checkSession: () => {
      dispatch(userActions.checkSession());
    }
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    // this.startWeakWords = this.startWeakWords.bind(this);
    this.state = {
      isSessionChecked: false
    };
  }

  // startWeakWords(event) {
  //   let context = event.target.getAttribute("context");
  //   let reference = event.target.getAttribute("reference");
  //   user.startWeakWords(context, reference);
  //   this.forceUpdate(); // forces rerendering and redirecting from curriculum to exercise after user context is updated!
  // }

  // automatic language and session detection on first page rendering
  async componentDidMount() {
    if (!this.state.isSessionChecked) {
      this.props.checkSession();
      this.props.defineLanguage();
      this.setState({
        isSessionChecked: true
      });
    }
  }

  render() {
    // TO DO : waiting screen or animation ?
    // allows the user context to load before rendering children components, critical when loading other page than home first
    if (!this.state.isSessionChecked) {
      return null;
    } else
      return (
        <LanguageContext.Provider value={this.props.user.language}>
          <MainRouter />
        </LanguageContext.Provider>
      );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
