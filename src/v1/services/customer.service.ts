import db from "../../db";

export const findUniqueCustomerById = async (id: number) => {
  return await db.customer.findUnique({ where: { id } });
};