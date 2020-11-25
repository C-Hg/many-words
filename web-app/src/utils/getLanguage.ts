import { LANGUAGES } from "../config/constants";
import { Languages } from "../graphql/types";

/**
 * Returns the default language of the browser
 */
const getLanguage = (): Languages => {
  if (!/fr/i.test(window.navigator.language)) {
    return LANGUAGES.English;
  } else {
    return LANGUAGES.French;
  }
};

export default getLanguage;
