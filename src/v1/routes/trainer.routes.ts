import { Router } from "express";
import { generateJson } from "../utils/genJson";

const router = Router();

// used in:
// - customer app, dashboard
router.get("/", (req, res) => {
  res.status(200).json(
    generateJson({
      status: "success",
      message: "get trainer in development",
    })
  );
});

export default router;
