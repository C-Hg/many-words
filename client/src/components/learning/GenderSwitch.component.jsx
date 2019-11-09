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
    toggleGender: () => {
      dispatch(learnActions.toggleGender());
    },
  };
};

const GenderSwitch = props => {
  const { toggleGender, learn } = props;
  return (
    <LanguageContext.Consumer>
      {({ masculine, feminine }) => (
        <button className="switch" onClick={toggleGender} type="button">
          {learn.gender === "masculine" ? masculine : feminine}
        </button>
      )}
    </LanguageContext.Consumer>
  );
};

GenderSwitch.propTypes = {
  toggleGender: PropTypes.func.isRequired,
  learn: PropTypes.shape({
    gender: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenderSwitch);
