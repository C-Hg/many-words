import React from "react";
import { LanguageContext } from "../../contexts/language-context";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actions as exerciseActions } from "../../redux/reducers/exercise";

function mapStateToProps(state) {
  return { exercise: state.exercise };
}

const mapDispatchToProps = dispatch => {
  return {
    getWords: (lesson, theme) => {
      dispatch(exerciseActions.getWords(lesson, theme));
    }
  };
};

class StartTestButton extends React.Component {
  render() {
    let language = this.context;
    return (
      <Link
        to={`${this.props.match.url}/${this.props.lesson}/test`}
        className="startTest"
        onClick={() => this.props.getWords(this.props.lesson, this.props.theme)}
      >
        <i alt="Start exercise" className="material-icons md-36">
          play_circle_outline
        </i>
        <p className="startButtonTitle">{language.start_exercise}</p>
      </Link>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartTestButton);

StartTestButton.contextType = LanguageContext;
