import { NextFunction, Request, Response } from "express";
import { getCustomers } from "../services/customer.service";
import { generateJson } from "../utils/genJson";
import { omit } from "lodash";
import { Customer } from "@prisma/client";

const filterExcludedCustomersFields = (customers: Customer[]): Customer[] => {
  return customers.map(
    (c) =>
      omit(c, [
        "password",
        "passwordResetAt",
        "passwordResetToken",
        "rStatus",
      ]) as Customer
  );
};

// TODO: implement role based authorization
export const getCustomersHandler = async (
  req: Request<{}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const customers = await getCustomers();

    return res.status(200).json(
      generateJson({
        status: "success",
        data: filterExcludedCustomersFields(customers),
      })
    );
  } catch (error) {
    next(error);
  }
};
