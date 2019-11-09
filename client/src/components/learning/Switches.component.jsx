import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import NumberSwitch from "./NumberSwitch.component";
import GenderSwitch from "./GenderSwitch.component";
import DefiniteOrIndefiniteSwitch from "./DefiniteOrIndefiniteSwitch.component";

const mapStateToProps = state => ({ learn: state.learn });

const Switches = props => {
  const { learn } = props;
  const { hasNumberSwitch, hasGenderSwitch, hasDefiniteSwitch } = learn;
  return (
    <div className="switches">
      {hasNumberSwitch && <NumberSwitch />}
      {hasGenderSwitch && <GenderSwitch />}
      {hasDefiniteSwitch && <DefiniteOrIndefiniteSwitch />}
    </div>
  );
};

Switches.propTypes = {
  learn: PropTypes.shape({
    hasNumberSwitch: PropTypes.bool.isRequired,
    hasGenderSwitch: PropTypes.bool.isRequired,
    hasDefiniteSwitch: PropTypes.bool.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  null
)(Switches);
