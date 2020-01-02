/* descriptions of these regex
 the regex 'allLetters' allows to capture french accents like é, è or î 
 and composed words like 'après-midi'
 
 we also want to capture words in several parts like 'to work'
 the regex 'words' allow us to do so without limit, though it should not exceed 3 or 4
*/

// common
const allLettersAndNumbers = "[0-9a-zàéèùâêîôûäëïöüç'\\-]+";
const words = `(${allLettersAndNumbers}(?:\\s${allLettersAndNumbers})*)`;
const columnSeparator = "\\s*\\|\\s*";
const oneColumn = words + columnSeparator;
const matchFourWords = oneColumn.repeat(3) + words;

// English
const englishSingular = "(?<=singular\\s*\\|\\s*";
const englishPlural = "(?<=plural\\s*\\|\\s*";
const englishUniqueForm = "(?<=unique\\sform\\s*\\|\\s*";

// French
const frenchSingularMasculine = "(?<=masc_sing\\s*\\|\\s*";
const frenchSingularFeminine = "(?<=fem_sing\\s*\\|\\s*";
const frenchPluralMasculine = "(?<=masc_plur\\s*\\|\\s*";
const frenchPluralFeminine = "(?<=fem_plur\\s*\\|\\s*";
const frenchUniqueform = "(?<=unique_form\\s*\\|\\s*";

const uniqueForm = RegExp(`(?<=unique\\sform\\s*\\:\\s*)${words}`, "ig");
const type = RegExp(`(?<=type\\s\\:\\s*)${words}(?=\\s*\\n*\\-\\-\\-)`, "ig");
const englishName = RegExp(
  `(?<=##\\sEnglish\\sdata\\n*Name\\s*\\:\\s*)${words}`,
  "ig"
);
const frenchName = RegExp(
  `(?<=##\\sFrench\\sdata\\n*Name\\s*\\:\\s*)${words}`,
  "ig"
);

const markdownRegex = {
  englishSingular,
  englishPlural,
  englishUniqueForm,
  frenchSingularMasculine,
  frenchSingularFeminine,
  frenchPluralMasculine,
  frenchPluralFeminine,
  frenchUniqueform,
  matchFourWords,
  uniqueForm,
  type,
  englishName,
  frenchName,
};

export default markdownRegex;
