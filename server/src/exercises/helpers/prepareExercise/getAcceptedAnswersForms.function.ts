import { Languages, Forms } from "../../../graphql/types";
import { LANGUAGES, FORMS } from "../../../stats/constants";

/**
 * Return all possible forms for the destination language
 */
const getAcceptedAnswersForms = (
  sourceForm: Forms,
  type: string,
  sourceLanguage: Languages
): Forms[] => {
  let acceptedAnswersForms;

  /* ------------------     English is the source language      ------------------    */
  if (sourceLanguage === LANGUAGES.English) {
    if (type === "adjective") {
      acceptedAnswersForms = [
        FORMS.PluralFeminine,
        FORMS.PluralMasculine,
        FORMS.SingularFeminine,
        FORMS.SingularMasculine,
      ];
    } else {
      switch (sourceForm) {
        case FORMS.Singular:
          acceptedAnswersForms = [
            FORMS.SingularFeminine,
            FORMS.SingularMasculine,
          ];
          break;

        case FORMS.Plural:
          acceptedAnswersForms = [FORMS.PluralFeminine, FORMS.PluralMasculine];
          break;

        default:
          acceptedAnswersForms = [FORMS.UniqueForm];
          break;
      }
    }
    /* ------------------     French is the source language      ------------------    */
  } else if (type === "adjective") {
    acceptedAnswersForms = [FORMS.UniqueForm];
  } else {
    switch (sourceForm) {
      case FORMS.SingularFeminine:
      case FORMS.SingularMasculine:
        acceptedAnswersForms = [FORMS.Singular];
        break;

      case FORMS.PluralFeminine:
      case FORMS.PluralMasculine:
        acceptedAnswersForms = [FORMS.Plural];
        break;

      default:
        acceptedAnswersForms = [FORMS.UniqueForm];
        break;
    }
  }
  return acceptedAnswersForms as Forms[];
};

export default getAcceptedAnswersForms;
