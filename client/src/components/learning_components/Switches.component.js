import React from "react";
import SingPlurSwitch from "./SingPlurSwitch.component";
import MascFemSwitch from "./MascFemSwitch.component";
import DefIndefSwitch from "./DefIndefSwitch.component";

const Switches = function(props) {
  return (
    <div className="switches">
      {props.number && (
        <SingPlurSwitch toggle={props.toggleNumber} value={props.number} />
      )}
      {props.gender && (
        <MascFemSwitch toggle={props.toggleGender} value={props.gender} />
      )}
      {props.definite && (
        <DefIndefSwitch toggle={props.toggleDefinite} value={props.definite} />
      )}
    </div>
  );
};

export default Switches;
