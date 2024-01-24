import db from "../../db";

export const getCustomers = async () => {
  return await db.customer.findMany();
}