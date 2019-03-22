import React from "react";
import SingPlurSwitch from "./SingPlurSwitch.component";
import MascFemSwitch from "./MascFemSwitch.component";
import DefIndefSwitch from "./DefIndefSwitch.component";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { learn: state.learn };
}

function Switches(props) {
  return (
    <div className="switches">
      {props.learn.number && <SingPlurSwitch />}
      {props.learn.gender && <MascFemSwitch />}
      {props.learn.definite && <DefIndefSwitch />}
    </div>
  );
}

export default connect(
  mapStateToProps,
  null
)(Switches);
