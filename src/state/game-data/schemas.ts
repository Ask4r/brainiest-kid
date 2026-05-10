import { z } from "zod";
import type { GameDataState } from "./models";

export const GameDataSchema = z.strictObject({
  name: z.string(),

  round1: z.strictObject({
    questions: z.strictObject({
      question: z.string(),
      answers: z.string().array().length(4),
      correctIdx: z.int().min(0).max(3),
    }).array().length(12),
    // extraQuestions: z.strictObject({
    //   question: z.string(),
    //   answers: z.string().array().length(4),
    //   correctIdx: z.int().min(0).max(3),
    // }).array().length(6),
    tiebreak: z.strictObject({
      words: z.string().array().length(4),
      pairWords: z.string().array().length(4),
      pairWordsCorrectOrder: z.int().min(0).max(3).array().length(4),
    }),
  }),

  round2: z.strictObject({
    decoder: z.strictObject({
      hint: z.string(),
      digits: z.int().min(0).max(9).array(),
      word: z.string(),
    }),
    categories: z.strictObject({
      category: z.string(),
      questions: z.strictObject({ question: z.string(), answer: z.string() }).array(),
    }).array().length(12),
    tiebreak: z.strictObject({
      words: z.string().array().length(4),
      pairWords: z.string().array().length(4),
      pairWordsCorrectOrder: z.int().min(0).max(3).array().length(4),
    }),
  }),
}) satisfies z.ZodType<GameDataState>;
