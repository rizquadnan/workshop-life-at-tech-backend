import { Prisma } from "@prisma/client";
import db from "../../db";

export const createCustomer = async (input: Prisma.CustomerCreateInput) => {
  return (await db.customer.create({
    data: input,
  }));
};
