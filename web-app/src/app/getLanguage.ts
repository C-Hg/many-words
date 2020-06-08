import { LANGUAGES } from "../config/constants";

/**
 * Returns the default language of the browser
 */
const getLanguage = (): string => {
  if (!/fr/i.test(window.navigator.language)) {
    return LANGUAGES.English;
  } else {
    return LANGUAGES.French;
  }
};

export default getLanguage;
