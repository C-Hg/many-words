import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { LanguageContext } from "../../contexts/language-context";
import { actions as learnActions } from "../../redux/reducers/learn";

const mapStateToProps = state => {
  return { learn: state.learn };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleNumber: () => {
      dispatch(learnActions.toggleNumber());
    },
  };
};

const NumberSwitch = props => {
  const { learn, toggleNumber } = props;
  return (
    <LanguageContext.Consumer>
      {({ singular, plural }) => (
        <button className="switch" onClick={toggleNumber} type="button">
          {learn.number === "singular" ? singular : plural}
        </button>
      )}
    </LanguageContext.Consumer>
  );
};

NumberSwitch.propTypes = {
  toggleNumber: PropTypes.func.isRequired,
  learn: PropTypes.shape({
    number: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NumberSwitch);
