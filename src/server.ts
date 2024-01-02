import express from "express";
import morgan from "morgan";
import cors from "cors";

// import router from "./router";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("Welcome to Baret PT API");
});

export default app;