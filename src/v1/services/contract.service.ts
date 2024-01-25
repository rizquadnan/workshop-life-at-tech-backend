import { Prisma } from "@prisma/client";
import db from "../../db";

export const createContract = async (contract: Prisma.ContractCreateInput) => {
  return await db.contract.create({ data: contract });
};
