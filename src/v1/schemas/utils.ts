import { string } from "zod";

export const isIndonesianPhoneNumber = (input: string) => {
  const regex = /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/;

  return regex.test(input);
};

export const passwordValidations = string({
  required_error: "Password is required",
})
  .min(8, "Password must be more than 8 characters")
  .max(32, "Password must be less than 32 characters");

export const emailValidations = string({
  required_error: "Email address is required",
}).email("Invalid email address");
