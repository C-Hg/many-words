import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { LanguageContext } from "../../contexts/language-context";
import { actions as learnActions } from "../../redux/reducers/learn";

function mapStateToProps(state) {
  return { learn: state.learn };
}

const mapDispatchToProps = dispatch => {
  return {
    toggleIsDefinite: () => {
      dispatch(learnActions.toggleIsDefinite());
    },
  };
};

const DefiniteOrIndefiniteSwitch = props => {
  const { toggleIsDefinite, learn } = props;
  return (
    <LanguageContext.Consumer>
      {({ definite, indefinite }) => (
        <button className="switch" onClick={toggleIsDefinite} type="button">
          {learn.isDefinite ? definite : indefinite}
        </button>
      )}
    </LanguageContext.Consumer>
  );
};

DefiniteOrIndefiniteSwitch.propTypes = {
  toggleIsDefinite: PropTypes.func.isRequired,
  learn: PropTypes.shape({
    isDefinite: PropTypes.bool.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefiniteOrIndefiniteSwitch);
