import app from "./server"
import * as dotenv from "dotenv"
import config from "./config"

dotenv.config()

process.on("uncaughtException", (err) => {
  console.log("[Node Global Error Handler] uncaughtException : ", err);
})

process.on("unhandledRejection", (err) => {
  console.log("[Node Global Error Handler] unhandledRejection: ", err);
});

app.listen(config.port, () => {
  console.log(`Server listening on port: ${config.port}`);
})