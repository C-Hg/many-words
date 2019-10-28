import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import NumberSwitch from "./NumberSwitch.component";
import GenderSwitch from "./GenderSwitch.component";
import DefiniteOrIndefiniteSwitch from "./DefiniteOrIndefiniteSwitch.component";

function mapStateToProps(state) {
  return { learn: state.learn };
}

const Switches = props => {
  const { learn } = props;
  const { number, gender, isDefinite } = learn;
  return (
    <div className="switches">
      {number && <NumberSwitch />}
      {gender && <GenderSwitch />}
      {isDefinite && <DefiniteOrIndefiniteSwitch />}
    </div>
  );
};

Switches.propTypes = {
  learn: {
    number: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    isDefinite: PropTypes.bool.isRequired,
  }.isRequired,
};

export default connect(
  mapStateToProps,
  null
)(Switches);
