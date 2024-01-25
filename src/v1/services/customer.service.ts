import db from "../../db";

export const getCustomers = async () => {
  return await db.customer.findMany();
}

export const findUniqueCustomerById = async (id: number) => {
  return await db.customer.findUnique({ where: { id } });
};