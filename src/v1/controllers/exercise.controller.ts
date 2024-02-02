import { NextFunction, Request, Response } from "express";
import { generateJson } from "../utils/genJson";
import {
  GetExerciseInput,
  PatchExerciseInput,
} from "../schemas/exercise.schema";
import {} from "../services/exercise.service";
import { UserType } from "../schemas/auth.schema";

// WORKSHOP-HINT: add post exercise controller here
