import React from "react";
import { LanguageContext } from "../../contexts/language-context";
import { connect } from "react-redux";
import { actions as learnActions } from "../../redux/reducers/learn";

function mapStateToProps(state) {
  return { learn: state.learn };
}

const mapDispatchToProps = dispatch => {
  return {
    toggleNumber: () => {
      dispatch(learnActions.toggleNumber());
    }
  };
};

function SingPlurSwitch(props) {
  return (
    <LanguageContext.Consumer>
      {({ singular, plural }) => (
        <button className="switch" onClick={props.toggleNumber}>
          {props.learn.number === "singular" ? singular : plural}
        </button>
      )}
    </LanguageContext.Consumer>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingPlurSwitch);
