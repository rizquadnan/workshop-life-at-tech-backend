import { Router } from "express";
import { generateJson } from "../utils/genJson";

const router = Router();

// used in:
// - trainer app, train
// - trainer app, customer
router.get("/", (req, res) => {
  res.status(200).send(generateJson({
    status: "success",
    message: "get customers in development"
  }))
})

export default router;