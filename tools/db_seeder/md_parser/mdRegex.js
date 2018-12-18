const regex = {
  //general data
  lesson: /(?<=Parent\slesson\s\:\n*)\w+/i,
  uniqueForm: /(?<=unique\sform\s\:\s*)\w+/i,
  type: /(?<=type\s\:\s*)\w+/i,

  // EN data
  enName: /(?<=##\sEnglish\sdata\s\n*Name\s*:\s*)\w+/i,

  enSingMain: /(?<=singular\s*\|\s*)\w+/i,
  enSingAlt1: /(?<=singular\s*\|\s*\w*\s*\|\s*)\w+/i,
  enSingAlt2: /(?<=singular\s*\|\s*\w*\s*\|\s*\w*\s*\|\s*)\w+/i,
  enSingAlt3: /(?<=singular\s*\|\s*\w*\s*\|\s*\w*\s*\|\s*\w*\s*\|\s*)\w+/i,

  enPlurMain: /(?<=plural\s*\|\s*)\w+/i,
  enPlurAlt1: /(?<=plural\s*\|\s*\w*\s*\|\s*)\w+/i,
  enPlurAlt2: /(?<=plural\s*\|\s*\w*\s*\|\s*\w*\s*\|\s*)\w+/i,
  enPlurAlt3: /(?<=plural\s*\|\s*\w*\s*\|\s*\w*\s*\|\s*\w*\s*\|\s*)\w+/i,

  enUniqueMain: /(?<=unique\sform\s*\|\s*)\w+/i,
  enUniqueAlt1: /(?<=unique\sform\s*\|\s*\w*\s*\|\s*)\w+/i,
  enUniqueAlt2: /(?<=unique\sform\s*\|\s*\w*\s*\|\s*\w*\s*\|\s*)\w+/i,
  enUniqueAlt3: /(?<=unique\sform\s*\|\s*\w*\s*\|\s*\w*\s*\|\s*\w*\s*\|\s*)\w+/i,

  isAnMain: /(?<=\\\*an\s*\|\s*)\w+/i,
  isAnAlt1: /(?<=\\\*an\s*\|\s*\w*\s*\|\s*)\w+/i,
  isAnAlt2: /(?<=\\\*an\s*\|\s*\w*\s*\|\s*\w*\s*\|\s*)\w+/i,
  isAnAlt3: /(?<=\\\*an\s*\|\s*\w*\s*\|\s*\w*\s*\|\s*\w*\s*\|\s*)\w+/i,

  //FR data
  frName: /(?<=##\sFrench\sdata\s\n*Name\s*:\s*)\w+/i,

  frMascSingMain: /(?<=masc_sing\s*\|\s*)\w+/i,
  frMascSingAlt1: /(?<=masc_sing\s*\|\s*\w*\s*\|\s*)\w+/i,
  frMascSingAlt2: /(?<=masc_sing\s*\|\s*\w*\s*\|\s*\w*\s*\|\s*)\w+/i,
  frMascSingAlt3: /(?<=masc_sing\s*\|\s*\w*\s*\|\s*\w*\s*\|\s*\w*\s*\|\s*)\w+/i,

  frMascPlurMain: /(?<=masc_plur\s*\|\s*)\w+/i,
  frMascPlurAlt1: /(?<=masc_plur\s*\|\s*\w*\s*\|\s*)\w+/i,
  frMascPlurAlt2: /(?<=masc_plur\s*\|\s*\w*\s*\|\s*\w*\s*\|\s*)\w+/i,
  frMascPlurAlt3: /(?<=masc_plur\s*\|\s*\w*\s*\|\s*\w*\s*\|\s*\w*\s*\|\s*)\w+/i,

  frFemSingMain: /(?<=fem_sing\s*\|\s*)\w+/i,
  frFemSingAlt1: /(?<=fem_sing\s*\|\s*\w*\s*\|\s*)\w+/i,
  frFemSingAlt2: /(?<=fem_sing\s*\|\s*\w*\s*\|\s*\w*\s*\|\s*)\w+/i,
  frFemSingAlt3: /(?<=fem_sing\s*\|\s*\w*\s*\|\s*\w*\s*\|\s*\w*\s*\|\s*)\w+/i,

  frFemPlurMain: /(?<=fem_plur\s*\|\s*)\w+/i,
  frFemPlurAlt1: /(?<=fem_plur\s*\|\s*\w*\s*\|\s*)\w+/i,
  frFemPlurAlt2: /(?<=fem_plur\s*\|\s*\w*\s*\|\s*\w*\s*\|\s*)\w+/i,
  frFemPlurAlt3: /(?<=fem_plur\s*\|\s*\w*\s*\|\s*\w*\s*\|\s*\w*\s*\|\s*)\w+/i,

  frUniqueMain: /(?<=unique_form\s*\|\s*)\w+/i,
  frUniqueAlt1: /(?<=unique_form\s*\|\s*\w*\s*\|\s*)\w+/i,
  frUniqueAlt2: /(?<=unique_form\s*\|\s*\w*\s*\|\s*\w*\s*\|\s*)\w+/i,
  frUniqueAlt3: /(?<=unique_form\s*\|\s*\w*\s*\|\s*\w*\s*\|\s*\w*\s*\|\s*)\w+/i,

  isLApostropheMain: /(?<=\\\*l'\s*\|\s*)\w+/i,
  isLApostropheAlt1: /(?<=\\\*l'\s*\|\s*\w*\s*\|\s*)\w+/i,
  isLApostropheAlt2: /(?<=\\\*l'\s*\|\s*\w*\s*\|\s*\w*\s*\|\s*)\w+/i,
  isLApostropheAlt3: /(?<=\\\*l'\s*\|\s*\w*\s*\|\s*\w*\s*\|\s*\w*\s*\|\s*)\w+/i
};

module.exports = regex;
