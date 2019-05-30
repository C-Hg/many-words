import React from "react";
import { LanguageContext } from "../../contexts/language-context";
import { connect } from "react-redux";
import { actions as learnActions } from "../../redux/reducers/learn";

function mapStateToProps(state) {
  return { learn: state.learn };
}

const mapDispatchToProps = dispatch => {
  return {
    toggleDefinite: () => {
      dispatch(learnActions.toggleDefinite());
    }
  };
};

const DefIndefSwitch = function(props) {
  return (
    <LanguageContext.Consumer>
      {({ definite, indefinite }) => (
        <button className="switch" onClick={props.toggleDefinite}>
          {props.learn.definite === "definite" ? definite : indefinite}
        </button>
      )}
    </LanguageContext.Consumer>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefIndefSwitch);
