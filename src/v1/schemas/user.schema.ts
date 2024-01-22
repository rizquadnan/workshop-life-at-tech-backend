import { object, string, TypeOf, z } from "zod";

const isIndonesianPhoneNumber = (input: string) => {
  const regex = /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/;

  return regex.test(input);
};

export const responseExcludedFields = ["password"];

export const registerUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    email: string({
      required_error: "Email address is required",
    }).email("Invalid email address"),
    password: string({
      required_error: "Password is required",
    })
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    passwordConfirm: string({
      required_error: "Please confirm your password",
    }),
    whatsapp: string({ required_error: "Whatsapp is required" }).refine(
      isIndonesianPhoneNumber
    ),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  }),
});

export type RegisterUserInput = TypeOf<typeof registerUserSchema>["body"];

export type RegisterUserRouteParam = { userType: "trainer" | "customer" };
