import { Prisma } from "@prisma/client";
import db from "../../db";

export const createContract = async (contract: Prisma.ContractCreateInput) => {
  return await db.contract.create({ data: contract });
};

// WORKSHOP-HINT: add get contract by id service here

export const getContractsByTrainerCustomerId = async (
  trainerId?: number,
  customerId?: number
) => {
  return await db.contract.findMany({ where: { trainerId, customerId } });
};

export const getActiveContracts = async (customerId?: number) => {
  return await db.contract.findMany({
    where: { customerId, contractStatus: "ACTIVE" },
  });
};
