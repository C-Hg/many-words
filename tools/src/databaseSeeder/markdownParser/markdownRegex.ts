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
const matchFourWords = oneColumn.repeat(4);

// English
const englishFormsRegex = {
  singular: RegExp(`(?<=singular\\s*\\|\\s*${matchFourWords})`, "i"),
  plural: RegExp(`(?<=plural\\s*\\|\\s*${matchFourWords})`, "i"),
  uniqueForm: RegExp(`(?<=unique\\sform\\s*\\|\\s*${matchFourWords})`, "i"),
};

// French
const frenchFormsRegex = {
  singularMasculine: RegExp(`(?<=masc_sing\\s*\\|\\s*${matchFourWords})`, "i"),
  singularFeminine: RegExp(`(?<=fem_sing\\s*\\|\\s*${matchFourWords})`, "i"),
  pluralMasculine: RegExp(`(?<=masc_plur\\s*\\|\\s*${matchFourWords})`, "i"),
  pluralFeminine: RegExp(`(?<=fem_plur\\s*\\|\\s*${matchFourWords})`, "i"),
  uniqueForm: RegExp(`(?<=unique_form\\s*\\|\\s*${matchFourWords})`, "i"),
};

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
  englishFormsRegex,
  frenchFormsRegex,
  matchFourWords,
  uniqueForm,
  type,
  englishName,
  frenchName,
};

export default markdownRegex;
