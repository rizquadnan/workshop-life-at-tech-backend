import { Router } from "express";
import { generateJson } from "../utils/genJson";
import { getMeHandler } from "../controllers/user.controller";
import { deserializeUser } from "../middlewares/deserializeUser";
import { requireUser } from "../middlewares/requireUser";

const router = Router();

router.use(deserializeUser, requireUser);

// used in:
// - trainer app, profile
// - customer app, profile
router.get("/me", getMeHandler);

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
