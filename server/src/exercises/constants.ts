export enum CurriculumNames {
  frenchEnglish = "frenchEnglish",
}

export enum NextExerciseMode {
  quiz = "quiz",
}

const SUCCESS_RATES = {
  TIER_1: 0.3,
  TIER_2: 0.4,
  TIER_3: 0.6,
  TIER_4: 0.8,
};

const COMPLETION_THRESHOLDS = {
  LESS_THAN_FIVE: [
    {
      expectedRate: SUCCESS_RATES.TIER_1,
      threshold: 0.5,
    },
  ],
  LESS_THAN_TEN: [
    {
      expectedRate: SUCCESS_RATES.TIER_1,
      threshold: 0.6,
    },
    {
      expectedRate: SUCCESS_RATES.TIER_3,
      threshold: 0.2,
    },
  ],
  LESS_THAN_FIFTEEN: [
    {
      expectedRate: SUCCESS_RATES.TIER_2,
      threshold: 0.8,
    },
    {
      expectedRate: SUCCESS_RATES.TIER_3,
      threshold: 0.4,
    },
  ],
  LESS_THAN_TWENTY: [
    {
      expectedRate: SUCCESS_RATES.TIER_2,
      threshold: 0.8,
    },
    {
      expectedRate: SUCCESS_RATES.TIER_3,
      threshold: 0.5,
    },
  ],
  LESS_THAN_TWENTY_FIVE: [
    {
      expectedRate: SUCCESS_RATES.TIER_2,
      threshold: 0.9,
    },
    {
      expectedRate: SUCCESS_RATES.TIER_3,
      threshold: 0.6,
    },
  ],
  LESS_THAN_THIRTY: [
    {
      expectedRate: SUCCESS_RATES.TIER_2,
      threshold: 0.9,
    },
    {
      expectedRate: SUCCESS_RATES.TIER_3,
      threshold: 0.7,
    },
    {
      expectedRate: SUCCESS_RATES.TIER_4,
      threshold: 0.2,
    },
  ],
  LESS_THAN_FORTY: [
    {
      expectedRate: SUCCESS_RATES.TIER_2,
      threshold: 0.9,
    },
    {
      expectedRate: SUCCESS_RATES.TIER_3,
      threshold: 0.7,
    },
    {
      expectedRate: SUCCESS_RATES.TIER_4,
      threshold: 0.3,
    },
  ],
  MORE_THAN_FORTY: [
    {
      expectedRate: SUCCESS_RATES.TIER_2,
      threshold: 0.9,
    },
    {
      expectedRate: SUCCESS_RATES.TIER_3,
      threshold: 0.7,
    },
    {
      expectedRate: SUCCESS_RATES.TIER_4,
      threshold: 0.5,
    },
  ],
};

const LAST_LESSON_MINIMUM_COMPLETION = 0.1;
const PENULTIMATE_LESSON_MINIMUM_COMPLETION = 0.2;

export {
  COMPLETION_THRESHOLDS,
  LAST_LESSON_MINIMUM_COMPLETION,
  PENULTIMATE_LESSON_MINIMUM_COMPLETION,
  SUCCESS_RATES,
};
