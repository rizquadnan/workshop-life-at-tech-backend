import { PrismaClient } from "@prisma/client";
import config from "config"

const prisma = new PrismaClient({
  datasources: { db: { url: config.get<string>("databaseUrl") } },
});

export default prisma;
