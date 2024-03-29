import { Prisma } from "@prisma/client";
import db from "../../db";

export const createCustomer = async (input: Prisma.CustomerCreateInput) => {
  return (await db.customer.create({
    data: input,
  }));
};

export const findUniqueCustomerByEmail = async (email: string) => {
  return await db.customer.findUnique({ where: { email } });
};

export const findUniqueCustomerById = async (id: number) => {
  return await db.customer.findUnique({ where: { id } });
};

export const findCustomerForPasswordReset = async (
  passwordResetToken: string
) => {
  return await db.customer.findFirst({
    where: { passwordResetToken, passwordResetAt: { gt: new Date() } },
  });
};

export const updateCustomer = async (
  where: Prisma.CustomerWhereUniqueInput,
  data: Prisma.CustomerUpdateInput,
  select?: Prisma.CustomerSelect
) => {
  return (await db.customer.update({ where, data, select }));
};