import { TEnvConfig } from "./type"

const config: Partial<TEnvConfig> = {
  port: 3001,
  secrets: {
    dbUrl: process.env.DB_URL as string,
    jwt: "cookies",
  },
};
export default config; 