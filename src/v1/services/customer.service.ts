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
