import { z } from "zod";
import type { GameDataState } from "./models";

export const GameDataSchema = z.strictObject({
  name: z.string(),
  round1: z.strictObject({
    questions: z.strictObject({
      question: z.string(),
      answers: z.string().array().length(4),
      correctIdx: z.int().min(0).max(3),
    }).array(),
  }),
}) satisfies z.ZodType<GameDataState>;
