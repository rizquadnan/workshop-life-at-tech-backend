import merge from "lodash.merge"
import { TEnvConfig, TNodeEnv } from "./type";
import devConfig from "./development"
import prodConfig from "./production"
import testConfig from "./testing";

process.env.NODE_ENV = process.env.NODE_ENV || "development"

let envConfig: Partial<TEnvConfig>;

if (process.env.NODE_ENV === "production") {
  envConfig = prodConfig
} else if (process.env.NODE_ENV === "testing") {
  envConfig = testConfig
} else {
  envConfig = devConfig
}

const defaultConfig: TEnvConfig = {
  env: process.env.NODE_ENV as TNodeEnv,
  port: Number(process.env.PORT) as number,
  secrets: {
    jwt: process.env.JWT_SECRET as string,
    dbUrl: process.env.DB_URL as string
  }
}
export default merge(defaultConfig, envConfig)