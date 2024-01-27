import { Prisma } from "@prisma/client";
import { TypeOf, number, object, string, default as z } from "zod";

export const createExerciseSchema = object({
  body: object({
    contractId: number({ required_error: "Contract is required." }),
  }),
});

export type CreateExerciseInput = TypeOf<typeof createExerciseSchema>["body"];

export const getExerciseSchema = object({
  query: object({
    trainerId: string()
      .optional()
      .refine(
        (val) =>
          typeof val === "string" ? isNaN(Number(val)) === false : true,
        { message: "trainerId param must be a number." }
      ),
    customerId: string()
      .optional()
      .refine(
        (val) =>
          typeof val === "string" ? isNaN(Number(val)) === false : true,
        { message: "customerId param must be a number." }
      ),
    exerciseStatus: z.enum(["ACTIVE", "PENDING", "FINISHED"]).optional(),
  }),
});

export type GetExerciseInput = TypeOf<typeof getExerciseSchema>["query"];

export type GetExerciseForTrainerResponse = Array<{
  id: number;
  trainerId: number;
  customerId: number;
  customerName: string;
  exerciseStart: string;
}>;

export const patchExerciseSchema = object({
  params: object({
    exerciseId: string().refine(
      (val) => (typeof val === "string" ? isNaN(Number(val)) === false : true),
      { message: "exerciseId param must be a number." }
    ),
  }),
});

export type PatchExerciseInput = TypeOf<typeof patchExerciseSchema>["params"];
