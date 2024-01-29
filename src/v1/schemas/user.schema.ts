import { TypeOf, object, string } from "zod";
import { emailValidations, isIndonesianPhoneNumber } from "./utils";

export const patchMeSchema = object({
  body: object({
    name: string().optional(),
    email: emailValidations.optional(),
    whatsapp: string({ required_error: "Whatsapp is required" })
      .optional()
      .refine((val) => {
        if (!val) {
          return true;
        }

        return isIndonesianPhoneNumber(val);
      }),
  }),
});

export type PatchMeInput = TypeOf<typeof patchMeSchema>["body"];
