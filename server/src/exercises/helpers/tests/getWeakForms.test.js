// /* eslint-disable func-names */
// import chai from "chai";
// import getWeakForms from "../getWeakForms.function";

// const { assert } = chai;

// suite("getWeakForms", function() {
//   test("should select the weakest form for each word", function() {
//     const wordScores = [
//       {
//         correctAnswers: 4,
//         wrongAnswers: 2,
//         globalScore: 3,
//         enName: "black",
//         statsByForm: [
//           { language: "en", form: "uniqueForm", score: 1 },
//           { language: "fr", form: "masc_sing", score: 0 },
//           { language: "fr", form: "masc_plur", score: -0.5 },
//           { language: "fr", form: "fem_sing", score: 1 },
//           { language: "fr", form: "fem_plur", score: 1 }
//         ]
//       },
//       {
//         userId: "5d594f138d651a002b6fd29c",
//         enName: "red",
//         statsByForm: [
//           { language: "en", form: "uniqueForm", score: 2 },
//           { language: "fr", form: "masc_sing", score: 2 },
//           { language: "fr", form: "masc_plur", score: 2 },
//           { language: "fr", form: "fem_sing", score: 1 },
//           { language: "fr", form: "fem_plur", score: 2 }
//         ],
//         lesson: "main_colors",
//         theme: "colors"
//       }
//     ];
//     const weakForms = getWeakForms(wordScores);
//     assert.lengthOf(weakForms, 2);
//     assert.deepEqual(weakForms[0], [
//       {
//         language: "fr",
//         form: "masc_plur",
//         score: -0.5
//       }
//     ]);
//     assert.deepEqual(weakForms[1], [
//       {
//         language: "fr",
//         form: "fem_sing",
//         score: 1
//       }
//     ]);
//   });

//   test("should select several equally weak forms for each word", function() {
//     const wordScores = [
//       {
//         correctAnswers: 4,
//         wrongAnswers: 2,
//         globalScore: 3,
//         enName: "black",
//         statsByForm: [
//           { language: "en", form: "uniqueForm", score: 1 },
//           { language: "fr", form: "masc_sing", score: 2 },
//           { language: "fr", form: "masc_plur", score: 2 },
//           { language: "fr", form: "fem_sing", score: 1 },
//           { language: "fr", form: "fem_plur", score: 1 }
//         ]
//       },
//       {
//         userId: "5d594f138d651a002b6fd29c",
//         enName: "red",
//         statsByForm: [
//           { language: "en", form: "uniqueForm", score: 2 },
//           { language: "fr", form: "masc_sing", score: 0 },
//           { language: "fr", form: "masc_plur", score: 0 },
//           { language: "fr", form: "fem_sing", score: 1 },
//           { language: "fr", form: "fem_plur", score: 2 }
//         ],
//         lesson: "main_colors",
//         theme: "colors"
//       }
//     ];
//     const weakForms = getWeakForms(wordScores);
//     assert.lengthOf(weakForms, 2);
//     assert.deepEqual(weakForms[0], [
//       { language: "en", form: "uniqueForm", score: 1 },
//       { language: "fr", form: "fem_sing", score: 1 },
//       { language: "fr", form: "fem_plur", score: 1 }
//     ]);
//     assert.deepEqual(weakForms[1], [
//       { language: "fr", form: "masc_sing", score: 0 },
//       { language: "fr", form: "masc_plur", score: 0 }
//     ]);
//   });

//   test("should return null if wordScores are null", function() {
//     const wordScores = [
//       null,
//       {
//         statsByForm: [
//           { language: "en", form: "uniqueForm", score: 1 },
//           { language: "fr", form: "masc_sing", score: 2 },
//           { language: "fr", form: "masc_plur", score: 2 },
//           { language: "fr", form: "fem_sing", score: 1 },
//           { language: "fr", form: "fem_plur", score: 1 }
//         ]
//       },
//       null
//     ];
//     const weakForms = getWeakForms(wordScores);
//     assert.lengthOf(weakForms, 3);
//     assert.equal(weakForms[0], null);
//     assert.deepEqual(weakForms[1], [
//       { language: "en", form: "uniqueForm", score: 1 },
//       { language: "fr", form: "fem_sing", score: 1 },
//       { language: "fr", form: "fem_plur", score: 1 }
//     ]);
//     assert.equal(weakForms[2], null);
//   });
// });
