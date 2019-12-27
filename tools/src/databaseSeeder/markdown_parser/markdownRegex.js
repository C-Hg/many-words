/* descriptions of these regex
 the regex 'allLetters' allows to capture french accents like é, è or î 
 and composed words like 'après-midi'
 
 we also want to capture words in several parts like 'to work'
 the regex 'words' allow us to do so without limit, though it should not exceed 3 or 4
*/

// common
const allLettersAndNumbers = "[0-9a-zàéèùâêîôûäëïöüç'\\-]+";
const words = `${allLettersAndNumbers}(?:\\s${allLettersAndNumbers})*`;
const wordsOrNot = `(?:${words})?`;

const columnOpen = "\\s*\\|\\s*";
const columnClosed = "\\s*\\|\\s*)";
const oneColumn = wordsOrNot + columnClosed;
const twoColumns = wordsOrNot + columnOpen + oneColumn;
const threeColumns = wordsOrNot + columnOpen + twoColumns;

// EN
const singular = "(?<=singular\\s*\\|\\s*";
const plural = "(?<=plural\\s*\\|\\s*";
const enUnique = "(?<=unique\\sform\\s*\\|\\s*";

// FR
const frMascSing = "(?<=masc_sing\\s*\\|\\s*";
const frMascPlur = "(?<=masc_plur\\s*\\|\\s*";
const frFemSing = "(?<=fem_sing\\s*\\|\\s*";
const frFemPlur = "(?<=fem_plur\\s*\\|\\s*";
const frUnique = "(?<=unique_form\\s*\\|\\s*";

const regex = {
  // general data
  uniqueForm: new RegExp(`(?<=unique\\sform\\s*\\:\\s*)${words}`, "ig"),
  type: new RegExp(`(?<=type\\s\\:\\s*)${words}(?=\\s*\\n*\\-\\-\\-)`, "ig"),

  // EN data
  englishName: new RegExp(
    `(?<=##\\sEnglish\\sdata\\n*Name\\s*\\:\\s*)${words}`,
    "ig"
  ),

  // FR data
  frenchName: new RegExp(
    `(?<=##\\sFrench\\sdata\\n*Name\\s*\\:\\s*)${words}`,
    "ig"
  ),

  // creates the regex to match the word inside the column
  // e.g. frMascSingMain, frMascSingAlt1 ...
  createRegex(name, pattern) {
    let newName;
    for (let a = 0; a < 4; a += 1) {
      switch (a) {
        case 0:
          newName = `${name}Main`;
          this[newName] = new RegExp(`${pattern})${words}`, "ig");
          break;

        case 1:
          newName = `${name}Alt1`;
          this[newName] = new RegExp(pattern + oneColumn + words, "ig");
          break;

        case 2:
          newName = `${name}Alt2`;
          this[newName] = new RegExp(pattern + twoColumns + words, "ig");
          break;

        case 3:
          newName = `${name}Alt3`;
          this[newName] = new RegExp(pattern + threeColumns + words, "ig");
          break;

        default:
          break;
      }
    }
  },
};

// EN
regex.createRegex("enSing", singular);
regex.createRegex("enPlur", plural);
regex.createRegex("enUnique", enUnique);

// FR
regex.createRegex("frMascSing", frMascSing);
regex.createRegex("frMascPlur", frMascPlur);
regex.createRegex("frFemSing", frFemSing);
regex.createRegex("frFemPlur", frFemPlur);
regex.createRegex("frUnique", frUnique);

module.exports = regex;
