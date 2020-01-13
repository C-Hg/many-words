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
const firstColumn = `)${words}`;
const secondColumn = `${words + columnSeparator})${words}`;
const thirdColumn = `${(words + columnSeparator).repeat(2)})${words}`;
const fourthColumn = `${(words + columnSeparator).repeat(3)})${words}`;
const singleword = `[a-z]*`;

// English
const englishFormsRegex = {
  singular: "(?<=singular\\s*\\|\\s*",
  plural: "(?<=plural\\s*\\|\\s*",
  uniqueForm: "(?<=unique\\sform\\s*\\|\\s*",
};

// French
const frenchFormsRegex = {
  singularMasculine: "(?<=masc_sing\\s*\\|\\s*",
  singularFeminine: "(?<=fem_sing\\s*\\|\\s*",
  pluralMasculine: "(?<=masc_plur\\s*\\|\\s*",
  pluralFeminine: "(?<=fem_plur\\s*\\|\\s*",
  uniqueForm: "(?<=unique_form\\s*\\|\\s*",
};

const uniqueForm = RegExp(`(?<=unique\\sform\\s*\\:\\s*)true(?=\\ntype)`, "i");
const type = RegExp(`(?<=type\\s\\:\\s*)${singleword}(?=\\s*\\n*##)`, "i");
const englishName = RegExp(
  `(?<=##\\sEnglish\\sdata\\n*Name\\s*\\:\\s*)${words}`,
  "i"
);
const frenchName = RegExp(
  `(?<=##\\sFrench\\sdata\\n*Name\\s*\\:\\s*)${words}`,
  "i"
);

const markdownRegex = {
  englishFormsRegex,
  frenchFormsRegex,
  firstColumn,
  secondColumn,
  thirdColumn,
  fourthColumn,
  uniqueForm,
  type,
  englishName,
  frenchName,
};

export default markdownRegex;
