import React from "react";
import { LanguageContext } from "../../contexts/language-context";
import { connect } from "react-redux";
import { actions as learnActions } from "../../redux/reducers/learn";

function mapStateToProps(state) {
  return { learn: state.learn };
}

const mapDispatchToProps = dispatch => {
  return {
    toggleGender: () => {
      dispatch(learnActions.toggleGender());
    }
  };
};

const MascFemSwitch = function(props) {
  return (
    <LanguageContext.Consumer>
      {({ masculine, feminine }) => (
        <button className="switch" onClick={props.toggleGender}>
          {props.learn.gender === "masculine" ? masculine : feminine}
        </button>
      )}
    </LanguageContext.Consumer>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MascFemSwitch);
