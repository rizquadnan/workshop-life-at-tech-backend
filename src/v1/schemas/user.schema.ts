import { object, string, TypeOf, z } from "zod";

const isIndonesianPhoneNumber = (input: string) => {
  const regex = /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/;

  return regex.test(input);
};

const passwordValidations = string({
  required_error: "Password is required",
})
  .min(8, "Password must be more than 8 characters")
  .max(32, "Password must be less than 32 characters");

const emailValidations = string({
  required_error: "Email address is required",
}).email("Invalid email address");

export const registerUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    email: emailValidations,
    password: passwordValidations,
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

export type UserType = "trainer" | "customer";

export type AuthRouteParam = { userType: UserType };

export const authResponseExcludedFields = ["password"];

export const loginUserSchema = object({
  body: object({
    email: emailValidations,
    password: passwordValidations,
  }),
});

export type LoginUserInput = TypeOf<typeof loginUserSchema>["body"];
