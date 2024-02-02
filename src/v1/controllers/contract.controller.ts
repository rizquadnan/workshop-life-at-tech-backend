import { NextFunction, Request, Response } from "express";
import {
  GetContractInput,
  PostContractInput,
} from "../schemas/contract.schema";
import { findUniqueCustomerById } from "../services/customer.service";
import { generateJson } from "../utils/genJson";
import {
  createContract,
  getContractsByTrainerCustomerId,
} from "../services/contract.service";
import { findUniqueTrainerById } from "../services/auth.trainer.service";
import dayjs from "dayjs";

export const generateContractTime = (exerciseDurationDays: number) => {
  const now = dayjs();

  return {
    startTime: now.toDate(),
    endTime: now.add(exerciseDurationDays, "day").toDate(),
  };
};

export const postContractHandler = async (
  req: Request<{}, {}, PostContractInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const trainerId = res.locals.user.id as number;

    const trainer = await findUniqueTrainerById(trainerId);
    if (!trainer) {
      return res
        .status(404)
        .json(generateJson({ status: "fail", message: "Trainer not found." }));
    }

    const customer = await findUniqueCustomerById(req.body.customerId);
    if (!customer) {
      return res
        .status(404)
        .json(generateJson({ status: "fail", message: "Customer not found." }));
    }

    const existingContract = await getContractsByTrainerCustomerId(
      trainer.id,
      customer.id
    );
    if (existingContract.some((c) => c.contractStatus === "ACTIVE")) {
      return res.status(400).json(
        generateJson({
          status: "fail",
          message:
            "Cannot create contract when still having active contract with customer.",
        })
      );
    }

    const { startTime, endTime } = generateContractTime(
      req.body.exerciseDurationDays
    );
    const result = await createContract({
      amount_of_exercise: req.body.numberOfExercise,
      customer: { connect: { id: customer.id } },
      endTime,
      startTime,
      trainer: { connect: { id: trainerId } },
    });

    return res
      .status(200)
      .json(generateJson({ status: "success", data: result }));
  } catch (err: any) {
    next(err);
  }
};

export const getContractsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const trainerId = req.query.trainerId
      ? Number(req.query.trainerId)
      : undefined;
    const customerId = req.query.customerId
      ? Number(req.query.customerId)
      : undefined;

    const contracts = await getContractsByTrainerCustomerId(
      trainerId,
      customerId
    );

    res.status(200).json(
      generateJson({
        status: "success",
        data: contracts,
      })
    );
  } catch (error) {
    next(error);
  }
};
