// return the language context identifier that is the lesson name in exercises
// and the difficulty index for all lessons of a theme

exports.getLessons = function(theme) {
  let lessons = [];
  switch (theme) {
    case "animals":
      lessons = [
        ["animals_basics", 1],
        ["birds", 3],
        ["farm_animals", 2],
        ["insects", 3],
        ["mammals_1", 2],
        ["sea_animals", 3]
      ];
      break;

    case "clothes":
      lessons = [
        ["accessories", 3],
        ["clothes_basics", 1],
        ["more_clothes", 2]
      ];
      break;

    case "colors":
      lessons = [["main_colors", 1]];
      break;

    case "food":
      lessons = [
        ["drinks", 2],
        ["food_basics", 1],
        ["foods", 1],
        ["fruits", 2],
        ["more_fruits_and_vegetables", 3],
        ["vegetables", 2]
      ];
      break;

    case "habitation":
      lessons = [
        ["construction_materials", 2],
        ["constuction_tools", 2],
        ["furniture", 2],
        ["house", 1],
        ["housing", 3],
        ["rooms", 1]
      ];
      break;

    case "human_body":
      lessons = [
        ["head", 2],
        ["human_body_basics", 1],
        ["limbs", 2],
        ["organs", 3],
        ["senses", 3]
      ];
      break;

    case "nature":
      lessons = [["nature_basics", 1], ["universe", 2]];
      break;

    case "numbers":
      lessons = [
        ["first_numbers", 1],
        ["more_numbers", 2],
        ["large_numbers", 2]
      ];
      break;

    case "social_life":
      lessons = [
        ["close_family", 1],
        ["human_beings", 1],
        ["identity", 2],
        ["introduction", 1]
      ];
      break;

    case "time":
      lessons = [
        ["days", 1],
        ["months", 1],
        ["time_basics", 1],
        ["time_description_1", 2],
        ["time_description_2", 2],
        ["time_divisions", 2]
      ];
      break;

    case "vegetals":
      lessons = [["plants", 2], ["trees", 2], ["vegetals_basics", 1]];
      break;

    default:
      break;
  }
  return lessons;
};
