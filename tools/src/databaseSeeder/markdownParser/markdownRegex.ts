/* descriptions of these regex
 the regex 'allLetters' allows to capture french accents like é, è or î 
 and composed words like 'après-midi'

 we also want to capture words in several parts like 'to work'
 the regex 'words' allow us to do so without limit, though it should not exceed 3 or 4
*/

// common
const allLettersAndNumbers = "[0-9a-zàéèùâêîôûäëïöüç'\\-]+";
const words = `(${allLettersAndNumbers}(?:\\s${allLettersAndNumbers})*)`;
const words2 = `(${allLettersAndNumbers}(?:\\s${allLettersAndNumbers})*)`;
const singleword = `[a-z]*`;
const columnSeparator = "\\s*\\|\\s*";
const matchFourWords = (words + columnSeparator).repeat(4);

// English
const englishFormsRegex = {
  singular: RegExp(`(?<=singular\\s*\\|\\s*${words})`, "i"),
  plural: RegExp(`(?<=plural\\s*\\|\\s*${words})`, "i"),
  uniqueForm: RegExp(`(?<=unique\\sform\\s*\\|\\s*${words})`, "i"),
};

// French
const frenchFormsRegex = {
  singularMasculine: RegExp(`(?<=masc_sing\\s*\\|\\s*${words})`, "i"),
  singularFeminine: RegExp(`(?<=fem_sing\\s*\\|\\s*${words})`, "i"),
  pluralMasculine: RegExp(`(?<=masc_plur\\s*\\|\\s*${words})`, "i"),
  pluralFeminine: RegExp(`(?<=fem_plur\\s*\\|\\s*${words})`, "i"),
  uniqueForm: RegExp(`(?<=unique_form\\s*\\|\\s*${words})`, "i"),
};

const uniqueForm = RegExp(`(?<=unique\\sform\\s*\\:\\s*)true(?=\\ntype)`, "ig");
const type = RegExp(`(?<=type\\s\\:\\s*)${singleword}(?=\\s*\\n*##)`, "ig");
const englishName = RegExp(
  `(?<=##\\sEnglish\\sdata\\n*Name\\s*\\:\\s*)${words2}`,
  "ig"
);
const frenchName = RegExp(
  `(?<=##\\sFrench\\sdata\\n*Name\\s*\\:\\s*)${words2}`,
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
