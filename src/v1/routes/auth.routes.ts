import { Router } from "express";
import { generateJson } from "../utils/genJson";

const router = Router();

router.post("/register", (req, res) => {
  res.status(200).json(
    generateJson({
      status: "success",
      message: "register in development",
    })
  );
});

router.post("/login", (req, res) => {
  res.status(200).json(
    generateJson({
      status: "success",
      message: "login in development",
    })
  );
});

router.get("/refresh", (req, res) => {
  res.status(200).json(
    generateJson({
      status: "success",
      message: "refresh in development",
    })
  );
});

router.get("/logout", (req, res) => {
  res.status(200).json(
    generateJson({
      status: "success",
      message: "logout in development",
    })
  );
});

router.post("/forgot_password", (req, res) => {
  res.status(200).json(
    generateJson({
      status: "success",
      message: "forgot_password in development",
    })
  );
});

router.patch("/reset_password/:reset", (req, res) => {
  res.status(200).json(
    generateJson({
      status: "success",
      message: "reset_password in development",
    })
  );
});

export default router;
