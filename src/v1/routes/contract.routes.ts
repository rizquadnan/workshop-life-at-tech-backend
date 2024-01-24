import { Router } from "express";
import { generateJson } from "../utils/genJson";

const router = Router();

// used in:
// - trainer app, dashboard
// - customer app, dashboard 
router.get("/", (req, res) => {
  res.status(200).json(generateJson({
    status: "success",
    message: "get contracts still in development"
  }))
})

router.post("/", (req, res) => {
  res.status(200).json(
    generateJson({
      status: "success",
      message: "post contracts still in development",
    })
  );
})

export default router;