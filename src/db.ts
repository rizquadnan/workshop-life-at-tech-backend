import { PrismaClient } from "@prisma/client";
import config from "config";

const dbKey =
  config.get<string>("nodeEnv") === "testing"
    ? "testingDatabaseUrl"
    : "databaseUrl";

const prisma = new PrismaClient({
  datasources: { db: { url: config.get<string>(dbKey) } },
});

export default prisma;
