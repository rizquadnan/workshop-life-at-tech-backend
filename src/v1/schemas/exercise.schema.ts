import { TypeOf, number, object, string } from "zod";

export const createExerciseSchema = object({
  body: object({
    contractId: number({ required_error: "Contract is required." }),
  }),
});

export type CreateExerciseInput = TypeOf<typeof createExerciseSchema>["body"];
