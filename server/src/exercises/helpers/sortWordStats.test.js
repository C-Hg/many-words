import sortWordStats from "./sortWordStats.function";

const wordStats0 = [{ globalScore: 2 }];
const wordStats1 = [{ globalScore: 0 }, { globalScore: 2 }];
const wordStats2 = [{ globalScore: 5 }, { globalScore: 0 }, { globalScore: 2 }];
const wordStats3 = [
  { globalScore: 2 },
  { globalScore: 5 },
  { globalScore: -2 },
];

test("sortWordStats", () => {
  expect(sortWordStats(wordStats0)).toStrictEqual(wordStats0);
  expect(sortWordStats(wordStats1)).toStrictEqual(wordStats1);
  expect(sortWordStats(wordStats2)).toStrictEqual([
    { globalScore: 0 },
    { globalScore: 2 },
    { globalScore: 5 },
  ]);
  expect(sortWordStats(wordStats3)).toStrictEqual([
    { globalScore: -2 },
    { globalScore: 2 },
    { globalScore: 5 },
  ]);
});
