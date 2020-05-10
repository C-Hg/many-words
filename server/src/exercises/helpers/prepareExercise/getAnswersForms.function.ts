import { Languages, Forms } from "../../../graphql/exercises.types";
import { LANGUAGES, FORMS } from "../../../stats/constants";

/**
 * Return all possible forms for the destination language
 */
const getAnswersForms = (
  sourceForm: Forms,
  type: string,
  sourceLanguage: Languages
): Forms[] => {
  let answersForms;

  /* ------------------     English is the source language      ------------------    */
  if (sourceLanguage === LANGUAGES.English) {
    if (type === "adjective") {
      answersForms = [
        FORMS.PluralFeminine,
        FORMS.PluralMasculine,
        FORMS.SingularFeminine,
        FORMS.SingularMasculine,
      ];
    } else {
      switch (sourceForm) {
        case FORMS.Singular:
          answersForms = [FORMS.SingularFeminine, FORMS.SingularMasculine];
          break;

        case FORMS.Plural:
          answersForms = [FORMS.PluralFeminine, FORMS.PluralMasculine];
          break;

        default:
          answersForms = [FORMS.UniqueForm];
          break;
      }
    }
    /* ------------------     French is the source language      ------------------    */
  } else if (type === "adjective") {
    answersForms = [FORMS.UniqueForm];
  } else {
    switch (sourceForm) {
      case FORMS.SingularFeminine:
      case FORMS.SingularMasculine:
        answersForms = [FORMS.Singular];
        break;

      case FORMS.PluralFeminine:
      case FORMS.PluralMasculine:
        answersForms = [FORMS.Plural];
        break;

      default:
        answersForms = [FORMS.UniqueForm];
        break;
    }
  }
  return answersForms as Forms[];
};

export default getAnswersForms;
