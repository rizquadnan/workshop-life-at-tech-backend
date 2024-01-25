import { TypeOf, number, object } from "zod";

export const postContractSchema = object({
  body: object({
    exerciseDurationDays: number({ required_error: "Exercise duration is required."}),
    customerId: number({ required_error: "Customer is required."}),
    numberOfExercise: number({ required_error: "Number of exercise is required."}),
  }),
});

export type PostContractInput = TypeOf<typeof postContractSchema>["body"];
