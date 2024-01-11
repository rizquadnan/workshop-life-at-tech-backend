import { Router } from "express";
import { generateJson } from "../utils/genJson";

const router = Router();

// used in:
// - trainer app, train
router.post("/", (req, res) => {
  res.status(200).json(generateJson({
    status: "success",
    message: "post exercise in development"
  }))
})

// used in:
// - trainer app, train
// - customer app, dashboard
// - customer app, train
router.get("/", (req, res) => {
  res.status(200).json(
    generateJson({
      status: "success",
      message: "get exercise in development",
    })
  );
});

// used in:
// - trainer app, train
// - customer app, train
router.patch("/", (req, res) => {
  res.status(200).json(
    generateJson({
      status: "success",
      message: "patch exercise in development",
    })
  );
});

export default router;