export type TNodeEnv = "production" | "testing" | "development"; 
export type TEnvConfig = {
  env: TNodeEnv
  port: number
  secrets: {
    jwt: string
    dbUrl: string
  }
}