import * as dotenv from "dotenv"
dotenv.config();
import config from "config";

import validateEnv from "./v1/utils/validateEnv";
import app from "./server"
import prisma from "./db";

validateEnv();

// NODE LEVEL ERROR HANDLER
process.on("uncaughtException", (err) => {
  console.log("[Node Global Error Handler] uncaughtException : ", err);
})
process.on("unhandledRejection", (err) => {
  console.log("[Node Global Error Handler] unhandledRejection: ", err);
});

const port = config.get<number>("port");

async function bootstrap() {
  app.listen(port, () => {
    console.log(`Server on port: ${port}`);
  });
}

bootstrap()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });