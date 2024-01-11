import { Router } from "express";
import { generateJson } from "../utils/genJson";

const router = Router();

// used in:
// - trainer app, profile
// - customer app, profile
router.get("/me", (req, res) => {
  res.status(200).json(
    generateJson({
      status: "success",
      message: "me in development",
    })
  );
});

// used in:
// - trainer app, profile
// - customer app, profile
router.patch("/me", (req, res) => {
  res.status(200).json(
    generateJson({
      status: "success",
      message: "me in development",
    })
  );
});

export default router;
